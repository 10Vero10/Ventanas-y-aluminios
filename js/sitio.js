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

  /* ---------- Galerías / carrusel ---------- */
  function construirCarrusel(contenedor, rutas) {
    if (!rutas || !rutas.length) rutas = ['img/hero.svg'];
    if (!Array.isArray(rutas)) rutas = [rutas];

    contenedor.innerHTML = [
      '<div class="carrusel">',
      '  <div class="carrusel__marco">',
      '    <div class="carrusel__pista"></div>',
      rutas.length > 1 ? '    <button class="carrusel__flecha carrusel__flecha--prev" aria-label="Imagen anterior">&#8592;</button>' : '',
      rutas.length > 1 ? '    <button class="carrusel__flecha carrusel__flecha--next" aria-label="Imagen siguiente">&#8594;</button>' : '',
      '  </div>',
      '  <div class="carrusel__pie">',
      '    <div class="carrusel__puntos"></div>',
      '    <span class="carrusel__contador"></span>',
      '  </div>',
      '</div>'
    ].join('');

    var marco = contenedor.querySelector('.carrusel__marco');
    var pista = contenedor.querySelector('.carrusel__pista');

    rutas.forEach(function (ruta, i) {
      var diapo = document.createElement('div');
      diapo.className = 'carrusel__diapositiva';
      var img = document.createElement('img');
      img.className = 'carrusel__img';
      img.alt = 'Imagen ' + (i + 1);
      img.loading = i === 0 ? 'eager' : 'lazy';
      img.addEventListener('error', function controlador() {
        img.removeEventListener('error', controlador);
        img.src = 'img/hero.svg';
      });
      img.src = ruta;
      diapo.appendChild(img);
      pista.appendChild(diapo);
    });

    var indice = 0;
    function ir(n) {
      indice = (n + rutas.length) % rutas.length;
      pista.style.transform = 'translateX(-' + (indice * 100) + '%)';
      contenedor.querySelectorAll('.carrusel__punto').forEach(function (p, j) {
        p.classList.toggle('carrusel__punto--activo', j === indice);
      });
      var contador = contenedor.querySelector('.carrusel__contador');
      var textoContador = (indice + 1) + ' / ' + rutas.length;
      if (contador.textContent !== textoContador) contador.textContent = textoContador;
    }

    var puntos = contenedor.querySelector('.carrusel__puntos');
    rutas.forEach(function (_, j) {
      var punto = document.createElement('button');
      punto.className = 'carrusel__punto';
      punto.setAttribute('aria-label', 'Ir a la imagen ' + (j + 1));
      punto.addEventListener('click', function () { ir(j); });
      puntos.appendChild(punto);
    });

    var prev = contenedor.querySelector('.carrusel__flecha--prev');
    var next = contenedor.querySelector('.carrusel__flecha--next');
    if (prev) prev.addEventListener('click', function () { ir(indice - 1); });
    if (next) next.addEventListener('click', function () { ir(indice + 1); });

    marco.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); ir(indice - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); ir(indice + 1); }
    });
    marco.setAttribute('tabindex', '0');
    marco.setAttribute('role', 'region');
    marco.setAttribute('aria-roledescription', 'carrusel');

    var inicioX = null;
    marco.addEventListener('touchstart', function (e) { inicioX = e.changedTouches[0].clientX; }, { passive: true });
    marco.addEventListener('touchend', function (e) {
      if (inicioX === null) return;
      var dx = e.changedTouches[0].clientX - inicioX;
      if (Math.abs(dx) > 40) ir(dx < 0 ? indice + 1 : indice - 1);
      inicioX = null;
    }, { passive: true });

    ir(0);
  }

  function pintarGalerias(datos) {
    document.querySelectorAll('[data-galeria]').forEach(function (el) {
      construirCarrusel(el, VYA.valor(datos, el.getAttribute('data-galeria')));
    });
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