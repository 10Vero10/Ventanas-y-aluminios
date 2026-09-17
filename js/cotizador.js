/* =========================================================================
   Ventanas y Aluminios - Motor del cotizador en 3 pasos + plano vivo
   Archivo independiente. Usa el objeto global VYA expuesto por js/datos.js.
   NO modifica js/sitio.js.
   ========================================================================= */

(function () {
  'use strict';

  if (window.VYA === undefined) return;

  var VYA = window.VYA;

  var estado = {
    producto: 'ventanas',
    ancho: 150,
    alto: 150,
    cantidad: 1,
    acabado: 'mate_negro',
    cristal: 'claro',
    instalacion: false,
    mosquitero: false
  };

  var plano = {
    grupoMarco: null,
    grupoCruces: null,
    cotaAncho: null,
    cotaAlto: null,
    area: null,
    cantidad: null
  };

  /* ---------- Utils ---------- */
  function listo(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function valorRuta(obj, ruta, fallback) {
    if (!obj || !ruta) return fallback;
    var partes = ruta.split('.');
    var v = obj;
    for (var i = 0; i < partes.length; i++) {
      if (v === undefined || v === null) return fallback;
      v = v[partes[i]];
    }
    return (v === undefined || v === null) ? fallback : v;
  }

  function num(v, def) {
    var n = Number(v);
    return isNaN(n) ? (def || 0) : n;
  }

  function moneda(v) {
    return '$ ' + Math.round(v).toLocaleString('es-AR');
  }

  function m2(a, b) {
    return (a / 100) * (b / 100);
  }

  /* ---------- Acceso a elementos ---------- */
  var pasos = {};        // data-paso -> fieldset
  var chips = {};        // data-paso-tab -> boton
  var ag = {};           // ganchos varios

  function tomar() {
    pasos = {};
    chips = {};
    ag = {};
    document.querySelectorAll('[data-paso]').forEach(function (el) {
      pasos[el.getAttribute('data-paso')] = el;
    });
    document.querySelectorAll('[data-paso-tab]').forEach(function (el) {
      chips[el.getAttribute('data-paso-tab')] = el;
    });
    ['ancho', 'alto', 'cantidad', 'acabado', 'cristal', 'instalacion', 'mosquitero'].forEach(function (k) {
      ag[k] = null;
    });
  }

  function leerGanchos() {
    var base = document.getElementById('formCotizador');
    if (!base) return;

    /* stepper cantidad */
    var meno = base.querySelector('[data-cq-menos]');
    var mas = base.querySelector('[data-cq-mas]');
    var cantidadEl = base.querySelector('[data-cq-cantidad]');

    /* resumen */
    var rs = {};
    base.querySelectorAll('[data-rs-*]').forEach(function (el) {
      var key = el.getAttribute('data-rs').replace(/^rs-/, '');
      rs[key] = el;
    });

    /* botones */
    var siguiente = base.querySelector('[data-cq-siguiente]');
    var atras = base.querySelector('[data-cq-atras]');
    var paso3 = base.querySelector('[data-cq-paso3]');
    var atras2 = base.querySelector('[data-cq-atras2]');
    var whatsapp = base.querySelector('[data-cq-whatsapp]');
    var pdf = base.querySelector('[data-cq-pdf]');

    return {
      base: base,
      meno: meno,
      mas: mas,
      cantidadEl: cantidadEl,
      rs: rs,
      siguiente: siguiente,
      atras: atras,
      paso3: paso3,
      atras2: atras2,
      whatsapp: whatsapp,
      pdf: pdf
    };
  }

  function obtenerConfig(datos) {
    var c = valorRuta(datos, 'config.cotizador', {});
    var base = valorRuta(c, 'base', {});
    var acabados = valorRuta(c, 'acabados', {});
    var cristales = valorRuta(c, 'cristales', {});
    var menaje = valorRuta(c, 'menaje', {});
    return {
      base: base,
      acabados: acabados,
      cristales: cristales,
      menaje: menaje,
      moneda: valorRuta(c, 'moneda', 'ARS')
    };
  }

  function calc(config, estado) {
    var precioBase = num(valorRuta(config.base, estado.producto), 50000);
    var factorAcabado = Math.max(num(valorRuta(config.acabados, estado.acabado), 1), 0.1);
    var cristalExtra = num(valorRuta(config.cristales, estado.cristal), 0) || num(valorRuta(config.cristales, estado.cristal + '.extra'), 0);
    var area = m2(estado.ancho, estado.alto);
    var inst = estado.instalacion ? num(valorRuta(config.menaje, 'instalacion')) : 0;
    var mosq = estado.mosquitero ? num(valorRuta(config.menaje, 'mosquitero')) : 0;
    var costoPartes = precioBase * area * factorAcabado * estado.cantidad;
    if (cristalExtra) costoPartes += cristalExtra * area * estado.cantidad;
    var total = costoPartes + inst * estado.cantidad + mosq * estado.cantidad;
    return {
      area: area,
      costoPartes: costoPartes,
      instalacion: inst * estado.cantidad,
      mosquitero: mosq * estado.cantidad,
      total: total
    };
  }

  function formatear(m) {
    m = String(m).replace('.', ',');
    return m;
  }
})();
