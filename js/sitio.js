/* Ventanas y Aluminios — Comportamiento compartido de las páginas */
(function () {
  'use strict';
  if (window.VYA === undefined) throw new Error('Se requiere js/datos.js');
  var VYA = window.VYA;

  function listo(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /* ---------- Cabecera con desplazamiento ---------- */
  function comportamientosCabecera() {
    var cabecera = document.querySelector('.cabecera');
    function aplicar() {
      if (window.scrollY > 8) {
        cabecera.classList.add('cabecera--scrolled');
      } else {
        cabecera.classList.remove('cabecera--scrolled');
      }
    }
    aplicar();
    window.addEventListener('scroll', aplicar, { passive: true });

    var boton = document.querySelector('.boton-menu');
    var menu = document.querySelector('.menu-movil');
    if (boton && menu) {
      boton.addEventListener('click', function () {
        var abierto = menu.classList.toggle('menu-movil--abierto');
        boton.classList.toggle('boton-menu--abierto', abierto);
        document.body.style.overflow = abierto ? 'hidden' : '';
      });
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          menu.classList.remove('menu-movil--abierto');
          boton.classList.remove('boton-menu--abierto');
          document.body.style.overflow = '';
        });
      });
    }
  }

  /* ---------- Revelar al hacer scroll ---------- */
  function revelar() {
    var elementos = document.querySelectorAll('.reveal');
    if (!elementos.length) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      elementos.forEach(function (el) { el.classList.add('reveal--visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('reveal--visible');
          obs.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    elementos.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- Imágenes individuales (data-img) ---------- */
  function pintarImagenes(datos) {
    document.querySelectorAll('[data-img]').forEach(function (el) {
      VYA.establecerImg(el, VYA.valor(datos, el.getAttribute('data-img')));
    });
  }

  /* ---------- Galerías: cuadrícula + ampliar (lightbox) ---------- */
  var galeriasTotales = [];

  function construirGaleria(contenedor, rutas, etiqueta) {
    if (!rutas || !rutas.length) rutas = ['img/hero.svg'];
    if (!Array.isArray(rutas)) rutas = [rutas];

    contenedor.innerHTML = '';
    var rejilla = document.createElement('div');
    rejilla.className = 'galeria-rejilla';

    rutas.forEach(function (ruta, i) {
      var boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'galeria-item';
      boton.setAttribute('aria-label', 'Ampliar imagen ' + (i + 1) + ' de ' + etiqueta);

      var img = document.createElement('img');
      img.className = 'galeria-item__img';
      img.alt = etiqueta + ' · Foto ' + (i + 1);
      img.loading = 'lazy';
      img.addEventListener('error', function controlador() {
        img.removeEventListener('error', controlador);
        img.src = 'img/hero.svg';
      });
      img.src = ruta;
      boton.appendChild(img);

      var indiceGlobal = galeriasTotales.length;
      galeriasTotales.push({ ruta: ruta, etiqueta: etiqueta, indiceEnGaleria: i, total: rutas.length });

      boton.addEventListener('click', function () {
        abrirLightbox(indiceGlobal);
      });

      rejilla.appendChild(boton);
    });

    contenedor.appendChild(rejilla);
  }

  function pintarGalerias(datos) {
    galeriasTotales = [];
    document.querySelectorAll('[data-galeria]').forEach(function (el) {
      var clave = el.getAttribute('data-galeria');
      construirGaleria(el, VYA.valor(datos, clave), clave.split('.').pop().replace(/_/g, ' '));
    });
    construirLightbox();
  }

  /* ---------- Lightbox (ampliar imagen) ---------- */
  var lightbox = null;
  var lucez = null;

  function construirLightbox() {
    if (!galeriasTotales.length) return;
    if (document.querySelector('.lightbox')) return;

    var caja = document.createElement('div');
    caja.className = 'lightbox';
    caja.setAttribute('role', 'dialog');
    caja.setAttribute('aria-modal', 'true');
    caja.setAttribute('aria-label', 'Imagen ampliada');
    caja.hidden = true;

    caja.innerHTML =
      '<div class="lightbox__fondo"></div>' +
      '<button class="lightbox__flecha lightbox__flecha--prev" type="button" aria-label="Imagen anterior">&#8592;</button>' +
      '<figure class="lightbox__marco">' +
      '  <img class="lightbox__img" alt="">' +
      '  <figcaption class="lightbox__pie">' +
      '    <span class="lightbox__contador"></span>' +
      '    <span class="lightbox__etiqueta"></span>' +
      '  </figcaption>' +
      '</figure>' +
      '<button class="lightbox__flecha lightbox__flecha--next" type="button" aria-label="Imagen siguiente">&#8594;</button>' +
      '<button class="lightbox__cerrar" type="button" aria-label="Cerrar">&#10005;</button>';

    document.body.appendChild(caja);
    lightbox = caja;
    lucez = {
      img: caja.querySelector('.lightbox__img'),
      contador: caja.querySelector('.lightbox__contador'),
      etiqueta: caja.querySelector('.lightbox__etiqueta'),
      prev: caja.querySelector('.lightbox__flecha--prev'),
      next: caja.querySelector('.lightbox__flecha--next'),
      cerrar: caja.querySelector('.lightbox__cerrar'),
      fondo: caja.querySelector('.lightbox__fondo')
    };

    var indice = 0;
    var origen = null;
    var grupo = [];

    function grupoActual() {
      return galeriasTotales[indice] ? galeriasTotales[indice].etiqueta : null;
    }

    function primerYUltimo() {
      var et = grupoActual();
      var primero = -1;
      var ultimo = -1;
      galeriasTotales.forEach(function (g, k) {
        if (g.etiqueta === et) {
          if (primero === -1) primero = k;
          ultimo = k;
        }
      });
      return { primero: primero, ultimo: ultimo };
    }

    function mostrar(n) {
      if (!galeriasTotales.length) return;
      var total = galeriasTotales.length;
      indice = (n + total) % total;
      var g = galeriasTotales[indice];
      lucez.img.src = g.ruta;
      lucez.contador.textContent = (g.indiceEnGaleria + 1) + ' / ' + g.total;
      lucez.etiqueta.textContent = g.etiqueta;
      var rango = primerYUltimo();
      lucez.prev.disabled = rango.primero === -1 || indice === rango.primero;
      lucez.next.disabled = rango.ultimo === -1 || indice === rango.ultimo;
    }

    function abrir(n) {
      if (!galeriasTotales.length) return;
      origen = document.activeElement;
      mostrar(n);
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lucez.cerrar.focus();
    }

    function cerrar() {
      if (lightbox.hidden) return;
      lightbox.hidden = true;
      document.body.style.overflow = '';
      if (origen && origen.focus) origen.focus();
    }

    lucez.prev.addEventListener('click', function () { mostrar(indice - 1); });
    lucez.next.addEventListener('click', function () { mostrar(indice + 1); });
    lucez.cerrar.addEventListener('click', cerrar);
    lucez.fondo.addEventListener('click', cerrar);

    document.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); cerrar(); }
      if (e.key === 'ArrowLeft' && !lucez.prev.disabled) { e.preventDefault(); mostrar(indice - 1); }
      if (e.key === 'ArrowRight' && !lucez.next.disabled) { e.preventDefault(); mostrar(indice + 1); }
    });

    window.abrirLightbox = abrir;
  }

  /* ---------- Contacto: fondo opcional ---------- */
  function pintarFondoContacto(datos) {
    document.querySelectorAll('[data-si-fondo]').forEach(function (el) {
      el.style.display = VYA.fondoContacto(datos) ? '' : 'none';
    });
  }

  /* ---------- Enlace activo ---------- */
  function enlaceActivo() {
    var ruta = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__enlace, .menu-movil__enlace').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && href === ruta) a.classList.add('nav__enlace--activo');
    });
  }

  listo(function () {
    comportamientosCabecera();
    revelar();
    enlaceActivo();
    VYA.cargarContenido().then(function (datos) {
      pintarImagenes(datos);
      pintarGalerias(datos);
      pintarFondoContacto(datos);
    }).catch(function (err) {
      console.error(err);
      document.querySelectorAll('[data-img]').forEach(function (el) {
        VYA.establecerImg(el, 'img/hero.svg');
      });
    });
  });
})();