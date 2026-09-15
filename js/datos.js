/* Ventanas y Aluminios — Carga del contenido central (contenido.json) */
(function () {
  'use strict';
  var VYA = window.VYA = window.VYA || {};

  VYA.cargarContenido = function () {
    if (!VYA.promesa) {
      VYA.promesa = fetch('contenido.json', { cache: 'no-store' }).then(function (r) {
        if (!r.ok) throw new Error('No se pudo cargar contenido.json');
        return r.json();
      });
    }
    return VYA.promesa;
  };

  VYA.valor = function (datos, ruta) {
    var partes = ruta.split('.');
    var actual = datos;
    for (var i = 0; i < partes.length; i++) {
      if (actual == null) return undefined;
      actual = actual[partes[i]];
    }
    return actual;
  };

  VYA.buscarSeccion = function (datos, seccion) {
    return VYA.valor(datos, seccion) || {};
  };

  VYA.fondoContacto = function (datos) {
    return datos && datos.contacto ? datos.contacto.fondo : null;
  };

  VYA.establecerImg = function (el, ruta) {
    el.removeAttribute('src');
    if (Array.isArray(ruta)) ruta = ruta[0];
    if (!ruta) ruta = 'img/hero.svg';
    el.addEventListener('error', function controlador() {
      el.removeEventListener('error', controlador);
      el.src = 'img/hero.svg';
    }, { capture: true });
    el.src = ruta;
  };
})();