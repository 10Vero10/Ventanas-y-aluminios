/* =========================================================
   Ventanas y Aluminios — Panel administrador
   Panel local sin backend: edita imágenes, guarda borrador en
   este navegador y "publica" generando un ZIP con las imágenes
   optimizadas + contenido.json listo para subir a GitHub.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Asunciones mínimas ---------- */
  if (window.VYA === undefined) throw new Error('Se requiere js/datos.js');

  var VYA = window.VYA;

  /* =========================================================
     1. Configuración de las secciones e ítems
     ========================================================= */
  var SECCIONES = [
    {
      id: 'inicio',
      titulo: 'Imágenes del inicio',
      miga: 'Inicio',
      descripcion: 'Portada, franja de confianza y miniaturas de las tarjetas.',
      items: [
        { clave: 'inicio.hero', etiqueta: 'Imagen de portada (Hero)', tipo: 'simple', proporcion: '16 : 9', ancho: 1600, alto: 900, base: 'hero', nota: 'Se ve de fondo en la portada completa del sitio.' },
        { clave: 'inicio.confianza', etiqueta: 'Franja "25 años fabricando confianza"', tipo: 'simple', proporcion: '4 : 3', ancho: 1200, alto: 900, base: 'confianza', nota: 'Foto del taller, del equipo o de una instalación terminada.' },
        { clave: 'inicio.tarjetas.ventanas', etiqueta: 'Tarjeta · Ventanas', tipo: 'simple', proporcion: '4 : 3', ancho: 800, alto: 600, base: 'tarjeta-ventanas', nota: 'Miniatura del grid de servicios en la portada.' },
        { clave: 'inicio.tarjetas.puertas', etiqueta: 'Tarjeta · Puertas', tipo: 'simple', proporcion: '4 : 3', ancho: 800, alto: 600, base: 'tarjeta-puertas', nota: 'Miniatura del grid de servicios en la portada.' },
        { clave: 'inicio.tarjetas.portones', etiqueta: 'Tarjeta · Portones', tipo: 'simple', proporcion: '4 : 3', ancho: 800, alto: 600, base: 'tarjeta-portones', nota: 'Miniatura del grid de servicios en la portada.' },
        { clave: 'inicio.tarjetas.divisiones', etiqueta: 'Tarjeta · Divisiones', tipo: 'simple', proporcion: '4 : 3', ancho: 800, alto: 600, base: 'tarjeta-divisiones', nota: 'Miniatura del grid de servicios en la portada.' },
        { clave: 'inicio.favicon', etiqueta: 'Favicon (ícono de pestaña)', tipo: 'simple', proporcion: '1 : 1', ancho: 96, alto: 96, base: 'favicon', formato: 'image/png', nota: 'Ícono pequeño que aparece en la pestaña del navegador. Se publica como PNG.' }
      ]
    },
    {
      id: 'catalogo',
      titulo: 'Imágenes del catálogo',
      miga: 'Catálogo',
      descripcion: 'Cada subcategoría admite varias fotos (galería). Arrastra las miniaturas para ordenarlas antes de publicar.',
      items: [
        { clave: 'catalogo.ventanas.corredizas', etiqueta: 'Ventanas · Corredizas', tipo: 'galeria', proporcion: '4 : 3', ancho: 1000, alto: 750, base: 'ventanas-corredizas', nota: 'Galería de trabajos de ventanas corredizas.' },
        { clave: 'catalogo.ventanas.batientes', etiqueta: 'Ventanas · Batientes', tipo: 'galeria', proporcion: '4 : 3', ancho: 1000, alto: 750, base: 'ventanas-batientes', nota: 'Galería de trabajos de ventanas batientes.' },
        { clave: 'catalogo.puertas.aluminio', etiqueta: 'Puertas · Aluminio', tipo: 'galeria', proporcion: '4 : 3', ancho: 1000, alto: 750, base: 'puertas-aluminio', nota: 'Galería de trabajos de puertas de aluminio.' },
        { clave: 'catalogo.puertas.vidrio', etiqueta: 'Puertas · Vidrio', tipo: 'galeria', proporcion: '4 : 3', ancho: 1000, alto: 750, base: 'puertas-vidrio', nota: 'Galería de trabajos de puertas de vidrio.' },
        { clave: 'catalogo.puertas.pvc', etiqueta: 'Puertas · PVC', tipo: 'galeria', proporcion: '4 : 3', ancho: 1000, alto: 750, base: 'puertas-pvc', nota: 'Galería de trabajos de puertas de PVC.' },
        { clave: 'catalogo.portones.instalacion', etiqueta: 'Portones · Instalación (Americanos)', tipo: 'galeria', proporcion: '4 : 3', ancho: 1000, alto: 750, base: 'portones-instalacion', nota: 'Galería de trabajos de portones americanos.' },
        { clave: 'catalogo.divisiones.vidrio_templado', etiqueta: 'Divisiones · Vidrio templado', tipo: 'galeria', proporcion: '4 : 3', ancho: 1000, alto: 750, base: 'divisiones-vidrio-templado', nota: 'Galería de divisiones de vidrio templado.' },
        { clave: 'catalogo.divisiones.acrilico', etiqueta: 'Divisiones · Acrílico', tipo: 'galeria', proporcion: '4 : 3', ancho: 1000, alto: 750, base: 'divisiones-acrilico', nota: 'Galería de divisiones de acrílico.' }
      ]
    },
    {
      id: 'quienes_somos',
      titulo: 'Imágenes de "¿Quiénes somos?"',
      miga: '¿Quiénes somos?',
      descripcion: 'Foto del equipo, de proyectos pasados y de control de calidad.',
      items: [
        { clave: 'quienes_somos.quienes_somos', etiqueta: '¿Quiénes somos?', tipo: 'simple', proporcion: '4 : 3', ancho: 1000, alto: 750, base: 'quienes-somos', nota: 'Foto del equipo o de las instalaciones.' },
        { clave: 'quienes_somos.experiencia', etiqueta: 'Nuestra experiencia', tipo: 'simple', proporcion: '4 : 3', ancho: 1000, alto: 750, base: 'experiencia', nota: 'Proyectos pasados o trabajo especializado.' },
        { clave: 'quienes_somos.compromiso', etiqueta: 'Nuestro compromiso', tipo: 'simple', proporcion: '4 : 3', ancho: 1000, alto: 750, base: 'compromiso', nota: 'Equipo trabajando o control de calidad.' }
      ]
    },
    {
      id: 'contacto',
      titulo: 'Imágenes de contacto',
      miga: 'Contacto',
      descripcion: 'La imagen de fondo es opcional; la página queda bien igual sin ella.',
      items: [
        { clave: 'contacto.fondo', etiqueta: 'Fondo de contacto (opcional)', tipo: 'simple', proporcion: '4 : 3', ancho: 1600, alto: 900, base: 'contacto-fondo', nota: 'Fondo sutil de la sección de contacto. Puedes eliminarla para mantener el diseño minimalista.', opcional: true }
      ]
    },
    {
      id: 'config',
      titulo: 'Configuración del sitio',
      miga: 'Configuración',
      descripcion: 'Opciones generales del sitio. Se publican junto con las imágenes presionando "Publicar cambios".',
      items: [
        { clave: 'config.cotizar', etiqueta: 'Botón "Cotizar"', tipo: 'interruptor', nota: 'Muestra u oculta el botón "Cotizar" de la cabecera, la portada y las secciones de cierre de todas las páginas. La página de Contacto no cambia.' }
      ]
    }
  ];

  var SECCION_ID = {};
  SECCIONES.forEach(function (s) { SECCION_ID[s.id] = s; });

  var FORMATOS = ['image/jpeg', 'image/png', 'image/webp'];
  var PESO_MAX = 3 * 1024 * 1024;
  var PLACEHOLDER = 'img/hero.svg';

  var FORMATO_SALIDA = (function () {
    try {
      var c = document.createElement('canvas');
      return c.toDataURL('image/webp').indexOf('image/webp') === 0 ? 'image/webp' : 'image/jpeg';
    } catch (e) { return 'image/jpeg'; }
  })();
  var EXTENSION = FORMATO_SALIDA === 'image/webp' ? 'webp' : 'jpg';

  function extensionDe(item) {
    var f = item.formato || FORMATO_SALIDA;
    if (f === 'image/png') return 'png';
    if (f === 'image/webp') return 'webp';
    return 'jpg';
  }

  /* =========================================================
     2. Estado
     ========================================================= */
  var estado = null;              // espejo de contenido.json con objetos de slot
  var lugarPublicado = null;      // último JSON de rutas (lo que está / estuvo publicado)
  var soporteArchivo = {};
  var historialDeshacer = [];
  var historialRehacer = [];
  var HISTORIAL_MAX = 25;
  var seccionActual = 'inicio';
  var conexionGitHub = null;
  try { conexionGitHub = JSON.parse(localStorage.getItem('vya_github') || 'null') || null; } catch (e) { conexionGitHub = null; }

  function slotNuevo(rutaOriginal) {
    return { actual: rutaOriginal || null, blob: null, vista: null };
  }

  function posicionar(objetivo, clave, valor) {
    var partes = clave.split('.');
    var nodo = objetivo;
    for (var i = 0; i < partes.length - 1; i++) {
      if (nodo[partes[i]] === undefined) nodo[partes[i]] = {};
      nodo = nodo[partes[i]];
    }
    nodo[partes[partes.length - 1]] = valor;
  }

  function obtener(objetivo, clave) {
    var partes = clave.split('.');
    var nodo = objetivo;
    for (var i = 0; i < partes.length; i++) {
      if (nodo == null) return undefined;
      nodo = nodo[partes[i]];
    }
    return nodo;
  }

  function construirEstado(datos) {
    var e = {};
    SECCIONES.forEach(function (sec) {
      sec.items.forEach(function (item) {
        if (item.tipo === 'interruptor') {
          posicionar(e, item.clave, VYA.valor(datos, item.clave) !== false);
          return;
        }
        var valor = VYA.valor(datos, item.clave);
        var slots;
        if (item.tipo === 'galeria') {
          slots = (Array.isArray(valor) ? valor : []).map(function (r) { return slotNuevo(r); });
        } else {
          slots = slotNuevo(valor || null);
        }
        posicionar(e, item.clave, slots);
      });
    });
    return e;
  }

  function rutaDelSlot(slot) {
    return slot && slot.actual !== undefined ? slot.actual : null;
  }

  /* Rutas actuales (sin meta) para comparar publicación */
  function construirRutas() {
    var out = {};
    SECCIONES.forEach(function (sec) {
      out[sec.id] = {};
      sec.items.forEach(function (item) {
        if (item.tipo === 'interruptor') {
          posicionar(out, item.clave, obtener(estado, item.clave) !== false);
          return;
        }
        var slots = obtener(estado, item.clave);
        var valor;
        if (Array.isArray(slots)) {
          valor = slots.map(rutaDelSlot);
        } else {
          valor = rutaDelSlot(slots);
        }
        posicionar(out, item.clave, valor);
      });
    });
    return out;
  }

  function hoyISO() {
    var d = new Date();
    function dos(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + dos(d.getMonth() + 1) + '-' + dos(d.getDate());
  }

  function construirJSONComplete() {
    var rutas = construirRutas();
    rutas.meta = { version: 1, actualizado: hoyISO() };
    return rutas;
  }

  function urlDelSlot(slot) {
    return slot.vista || slot.actual || (slot.opcional ? null : PLACEHOLDER);
  }

  function slotTieneCambios(slot) {
    return !!slot && !!slot.blob;
  }

  function valorPublicadoActivo(clave) {
    return VYA.valor(lugarPublicado, clave) !== false;
  }

  function contarCambios() {
    var n = 0;
    SECCIONES.forEach(function (sec) {
      sec.items.forEach(function (item) {
        if (item.tipo === 'interruptor') return;
        var slots = obtener(estado, item.clave);
        if (Array.isArray(slots)) {
          slots.forEach(function (s) { if (slotTieneCambios(s)) n++; });
        } else if (slotTieneCambios(slots)) {
          n++;
        }
      });
    });
    return n;
  }

  function contarCambiosConfig() {
    var n = 0;
    SECCIONES.forEach(function (sec) {
      sec.items.forEach(function (item) {
        if (item.tipo !== 'interruptor') return;
        if ((obtener(estado, item.clave) !== false) !== valorPublicadoActivo(item.clave)) n++;
      });
    });
    return n;
  }

  /* ---------- Historial (deshacer / rehacer) ---------- */
  function clonarEstado(objeto) {
    if (typeof structuredClone === 'function') {
      try { return structuredClone(objeto); } catch (e) { /* continúa con la copia manual */ }
    }
    return clonarManual(objeto);
  }

  function clonarManual(objeto) {
    if (objeto instanceof Blob) return objeto;
    if (Array.isArray(objeto)) return objeto.map(clonarManual);
    if (objeto && typeof objeto === 'object') {
      var copia = {};
      Object.keys(objeto).forEach(function (k) { copia[k] = clonarManual(objeto[k]); });
      return copia;
    }
    return objeto;
  }

  function registrarHistorial() {
    historialDeshacer.push(clonarEstado(estado));
    if (historialDeshacer.length > HISTORIAL_MAX) historialDeshacer.shift();
    historialRehacer.length = 0;
    actualizarBotonesHistorial();
  }

  function deshacer() {
    if (!historialDeshacer.length) return;
    historialRehacer.push(clonarEstado(estado));
    estado = historialDeshacer.pop();
    renderearTodo();
    actualizarBotonesHistorial();
    toast('Cambio deshecho.');
  }

  function rehacer() {
    if (!historialRehacer.length) return;
    historialDeshacer.push(clonarEstado(estado));
    estado = historialRehacer.pop();
    renderearTodo();
    actualizarBotonesHistorial();
    toast('Cambio rehecho.');
  }

  function actualizarBotonesHistorial() {
    document.getElementById('btnDeshacer').disabled = historialDeshacer.length === 0;
    document.getElementById('btnRehacer').disabled = historialRehacer.length === 0;
  }

  /* =========================================================
     3. Utilidades de interfaz
     ========================================================= */
  function $(sel, raiz) { return (raiz || document).querySelector(sel); }

  function toast(mensaje, tipo) {
    var cont = document.getElementById('contenedorToast');
    var el = document.createElement('div');
    el.className = 'toast' + (tipo === 'error' ? ' toast--error' : '');
    el.textContent = mensaje;
    cont.appendChild(el);
    setTimeout(function () { el.remove(); }, 4200);
  }

  function abrirModal(html) {
    var cont = document.getElementById('contenedorModal');
    var fondo = document.createElement('div');
    fondo.className = 'modal-fondo';
    var tarjeta = document.createElement('div');
    tarjeta.className = 'modal';
    tarjeta.innerHTML = html;
    fondo.appendChild(tarjeta);
    fondo.addEventListener('click', function (e) {
      if (e.target === fondo) cerrarModal();
    });
    cont.appendChild(fondo);
    return tarjeta;
  }

  function cerrarModal() {
    var cont = document.getElementById('contenedorModal');
    cont.innerHTML = '';
  }

  function descargarBytes(datos, nombre, tipo) {
    var blob = new Blob([datos], { type: tipo || 'application/octet-stream' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  /* ---------- IndexedDB para borradores ---------- */
  function abrirIDB() {
    return new Promise(function (res, rej) {
      var rq = indexedDB.open('vya-panel', 1);
      rq.onupgradeneeded = function () { rq.result.createObjectStore('datos'); };
      rq.onsuccess = function () { res(rq.result); };
      rq.onerror = function () { rej(rq.error); };
    });
  }
  function idbSet(clave, valor) {
    return abrirIDB().then(function (db) {
      return new Promise(function (res, rej) {
        var tx = db.transaction('datos', 'readwrite');
        tx.objectStore('datos').put(valor, clave);
        tx.oncomplete = res;
        tx.onerror = function () { rej(tx.error); };
      });
    });
  }
  function idbGet(clave) {
    return abrirIDB().then(function (db) {
      return new Promise(function (res, rej) {
        var tx = db.transaction('datos', 'readonly');
        var rq = tx.objectStore('datos').get(clave);
        rq.onsuccess = function () { res(rq.result); };
        rq.onerror = function () { rej(rq.error); };
      });
    });
  }
  function idbDel(clave) {
    return abrirIDB().then(function (db) {
      return new Promise(function (res, rej) {
        var tx = db.transaction('datos', 'readwrite');
        tx.objectStore('datos').delete(clave);
        tx.oncomplete = res;
        tx.onerror = function () { rej(tx.error); };
      });
    });
  }

  /* =========================================================
     4. Procesamiento de imágenes (escala + recorte centrado)
     ========================================================= */
  function procesarArchivo(archivo, item) {
    return new Promise(function (res, rej) {
      if (FORMATOS.indexOf(archivo.type) === -1) {
        return rej(new Error('Formato no permitido: ' + (archivo.name || 'archivo')));
      }
      if (archivo.size > PESO_MAX) {
        return rej(new Error('Pesa más de 3 MB: ' + archivo.name));
      }
      var urlObj = URL.createObjectURL(archivo);
      var img = new Image();
      img.onload = function () {
        var tw = item.ancho;
        var th = item.alto;
        var escala = Math.max(tw / img.width, th / img.height);
        var sAncho = tw / escala;
        var sAlto = th / escala;
        var sx = (img.width - sAncho) / 2;
        var sy = (img.height - sAlto) / 2;
        var canvas = document.createElement('canvas');
        canvas.width = tw;
        canvas.height = th;
        canvas.getContext('2d').drawImage(img, sx, sy, sAncho, sAlto, 0, 0, tw, th);
        canvas.toBlob(function (blob) {
          URL.revokeObjectURL(urlObj);
          if (!blob) return rej(new Error('No se pudo procesar la imagen'));
          res(blob);
        }, item.formato || FORMATO_SALIDA, item.formato === 'image/png' ? undefined : 0.85);
      };
      img.onerror = function () { URL.revokeObjectURL(urlObj); rej(new Error('Archivo de imagen no válido')); };
      img.src = urlObj;
    });
  }

  function prepararSlotsPorInsertar(archivos, item) {
    return Promise.all(archivos.map(function (archivo) {
      return procesarArchivo(archivo, item).then(function (blob) {
        return { blob: blob, vista: URL.createObjectURL(blob), actual: null };
      });
    }));
  }

  /* =========================================================
     5. Renderizado por sección
     ========================================================= */
  function renderearTodo() {
    renderearSeccion(seccionActual);
    actualizarEstadoPublicacion();
  }

  function renderearSeccion(seccionId) {
    var sec = SECCION_ID[seccionId];
    seccionActual = seccionId;

    document.getElementById('tituloSeccion').textContent = sec.titulo;
    document.getElementById('miga').textContent = sec.miga + ' · ' + sec.id;

    document.querySelectorAll('#navSecciones button').forEach(function (b) {
      b.classList.toggle('is-activa', b.dataset.seccion === seccionId);
    });

    var lista = document.getElementById('listaItems');
    lista.innerHTML = '';
    if (sec.descripcion) {
      var p = document.createElement('p');
      p.textContent = sec.descripcion;
      lista.appendChild(p);
    }

    sec.items.forEach(function (item) {
      lista.appendChild(construirArticulo(item, seccionId));
    });
  }

  function construirArticulo(item, seccionId) {
    if (item.tipo === 'interruptor') return construirInterruptor(item);

    var art = document.createElement('article');
    art.className = 'articulo';
    art.dataset.clave = item.clave;

    var slots = obtener(estado, item.clave);
    var esGaleria = item.tipo === 'galeria';
    var tieneCambio = esGaleria
      ? slots.some(slotTieneCambios)
      : slotTieneCambios(slots);

    /* Cabecera */
    var cab = document.createElement('div');
    cab.className = 'articulo-cabecera';
    var cabTxt = document.createElement('div');
    var h2 = document.createElement('h2');
    h2.textContent = item.etiqueta;
    var nota = document.createElement('p');
    nota.textContent = item.nota || '';
    cabTxt.appendChild(h2);
    cabTxt.appendChild(nota);
    var chip = document.createElement('span');
    chip.className = 'articulo-chip' + (tieneCambio ? ' articulo-chip--nuevo' : '');
    chip.textContent = esGaleria
      ? (tieneCambio ? 'Nuevos cambios' : slots.length + ' foto' + (slots.length === 1 ? '' : 's'))
      : (tieneCambio ? 'Nueva imagen' : item.proporcion);
    cab.appendChild(cabTxt);
    cab.appendChild(chip);
    art.appendChild(cab);

    /* Cuerpo */
    var cuerpo = document.createElement('div');
    cuerpo.className = 'articulo-cuerpo' + (esGaleria ? ' articulo-cuerpo--galeria' : '');

    if (esGaleria) {
      cuerpo.appendChild(construirVistaGaleria(item, slots));
      cuerpo.appendChild(construirControlesGaleria(item));
    } else {
      cuerpo.appendChild(construirVistaSimple(item, slots));
      cuerpo.appendChild(construirControlesSimple(item, slots));
    }
    art.appendChild(cuerpo);
    return art;
  }

  function construirInterruptor(item) {
    var art = document.createElement('article');
    art.className = 'articulo';
    art.dataset.clave = item.clave;

    var activo = obtener(estado, item.clave) !== false;

    /* Cabecera */
    var cab = document.createElement('div');
    cab.className = 'articulo-cabecera';
    var cabTxt = document.createElement('div');
    var h2 = document.createElement('h2');
    h2.textContent = item.etiqueta;
    var nota = document.createElement('p');
    nota.textContent = item.nota || '';
    cabTxt.appendChild(h2);
    cabTxt.appendChild(nota);

    var chip = document.createElement('span');
    chip.className = 'articulo-chip' + (activo ? ' articulo-chip--nuevo' : '');
    chip.textContent = activo ? 'Visible' : 'Oculto';
    cab.appendChild(cabTxt);
    cab.appendChild(chip);
    art.appendChild(cab);

    /* Cuerpo */
    var cuerpo = document.createElement('div');
    cuerpo.className = 'articulo-cuerpo articulo-cuerpo--interruptor';

    var cont = document.createElement('div');
    cont.className = 'articulo-controles';

    var fila = document.createElement('div');
    fila.className = 'interruptor-fila';

    var control = document.createElement('label');
    control.className = 'interruptor';
    var chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.checked = activo;
    var carril = document.createElement('span');
    carril.className = 'interruptor__carril';
    control.appendChild(chk);
    control.appendChild(carril);

    var texto = document.createElement('div');
    texto.className = 'interruptor-fila__texto';
    var titulo = document.createElement('b');
    titulo.textContent = activo ? 'Botón visible en el sitio' : 'Botón oculto en el sitio';
    var desc = document.createElement('p');
    desc.textContent = activo
      ? 'El botón "Cotizar" se muestra en la cabecera, la portada y las secciones de cierre. Publícalo para aplicarlo.'
      : 'El botón "Cotizar" queda oculto en todo el sitio. Publícalo para aplicarlo.';
    texto.appendChild(titulo);
    texto.appendChild(desc);

    fila.appendChild(control);
    fila.appendChild(texto);

    chk.addEventListener('change', function () {
      registrarHistorial();
      posicionar(estado, item.clave, chk.checked);
      renderearSeccion(seccionActual);
      actualizarEstadoPublicacion();
      toast(chk.checked ? 'El botón "Cotizar" se mostrará.' : 'El botón "Cotizar" quedará oculto.');
    });

    cont.appendChild(fila);
    cuerpo.appendChild(cont);
    art.appendChild(cuerpo);
    return art;
  }

  function construirVistaSimple(item, slot) {
    var cont = document.createElement('div');
    cont.className = 'vista-previa';
    cont.style.setProperty('--rp', item.proporcion);
    cont.style.aspectRatio = item.proporcion;

    var img = document.createElement('img');
    var url = urlDelSlot(slot);
    if (url) img.src = url;
    img.alt = 'Vista previa de ' + item.etiqueta;
    img.addEventListener('error', function () { img.src = PLACEHOLDER; });

    var etiq = document.createElement('span');
    etiq.className = 'vista-previa__etiqueta';
    etiq.textContent = 'Vista previa · ' + item.proporcion;

    cont.appendChild(img);
    cont.appendChild(etiq);
    return cont;
  }

  function construirVistaGaleria(item, slots) {
    var cont = document.createElement('div');
    cont.className = 'articulo-controles';
    var rejilla = document.createElement('div');
    rejilla.className = 'galeria-rejilla';

    if (!slots.length) {
      var vacio = document.createElement('p');
      vacio.style.cssText = 'grid-column:1/-1;color:var(--muted);font-size:.85rem;text-align:center;padding:1rem;';
      vacio.textContent = 'Sin fotos aún. Agrega imágenes con el botón o arrastrando un archivo.';
      rejilla.appendChild(vacio);
    }

    slots.forEach(function (slot, i) {
      rejilla.appendChild(construirMiniatura(item, slots, slot, i));
    });

    var zona = document.createElement('div');
    zona.className = 'zona-soltar';
    zona.innerHTML = '<p><b>Arrastra fotos aquí</b> o usa el botón.</p><p class="articulo-controles__fila" style="justify-content:center;margin-top:.7rem"><button class="btn btn--borde btn-mini" type="button">Elegir archivos…</button></p><p>JPG, PNG o WEBP · máx. 3 MB por foto · puedes subir todas las que quieras · se reencuadran a 4:3</p>';
    configurarZonaSoltar(zona, item, true);

    var boton = $('button', zona);
    boton.addEventListener('click', function (e) {
      e.stopPropagation();
      abrirSelectorImagenes(item);
    });

    cont.appendChild(rejilla);
    cont.appendChild(zona);
    return cont;
  }

  function construirMiniatura(item, slots, slot, i) {
    var min = document.createElement('div');
    min.className = 'galeria-miniatura';
    min.draggable = true;
    min.dataset.indice = String(i);

    var img = document.createElement('img');
    var url = urlDelSlot(slot);
    if (url) img.src = url;
    img.alt = 'Foto ' + (i + 1) + ' de ' + item.etiqueta;
    img.addEventListener('error', function () { img.src = PLACEHOLDER; });

    var num = document.createElement('span');
    num.className = 'galeria-miniatura__num';
    num.textContent = (i + 1) + (slot.blob ? ' · NUEVA' : '');

    var acciones = document.createElement('div');
    acciones.className = 'galeria-miniatura__acciones';

    var izq = document.createElement('button');
    izq.className = 'galeria-boton-fila';
    izq.type = 'button';
    izq.title = 'Mover a la izquierda';
    izq.textContent = '←';
    izq.addEventListener('click', function () {
      if (i === 0) return;
      registrarHistorial();
      var aux = slots[i - 1];
      slots[i - 1] = slots[i];
      slots[i] = aux;
      renderearSeccion(seccionActual);
      actualizarEstadoPublicacion();
    });

    var der = document.createElement('button');
    der.className = 'galeria-boton-fila';
    der.type = 'button';
    der.title = 'Mover a la derecha';
    der.textContent = '→';
    der.addEventListener('click', function () {
      if (i === slots.length - 1) return;
      registrarHistorial();
      var aux = slots[i + 1];
      slots[i + 1] = slots[i];
      slots[i] = aux;
      renderearSeccion(seccionActual);
      actualizarEstadoPublicacion();
    });

    var quitar = document.createElement('button');
    quitar.className = 'galeria-boton-fila galeria-boton-fila--quitar';
    quitar.type = 'button';
    quitar.title = 'Quitar esta foto';
    quitar.innerHTML = '&times;';
    quitar.addEventListener('click', function () {
      registrarHistorial();
      slots.splice(i, 1);
      renderearSeccion(seccionActual);
      actualizarEstadoPublicacion();
      toast('Foto eliminada de la galería.');
    });

    acciones.appendChild(izq);
    acciones.appendChild(der);
    acciones.appendChild(quitar);

    min.appendChild(img);
    min.appendChild(num);
    min.appendChild(acciones);

    min.addEventListener('dragstart', function (ev) {
      ev.dataTransfer.setData('text/plain', String(i));
      min.classList.add('imagen-marcada');
    });
    min.addEventListener('dragend', function () {
      min.classList.remove('imagen-marcada');
    });
    min.addEventListener('dragover', function (ev) {
      ev.preventDefault();
      min.classList.add('imagen-marcada');
    });
    min.addEventListener('dragleave', function () {
      min.classList.remove('imagen-marcada');
    });
    min.addEventListener('drop', function (ev) {
      ev.preventDefault();
      min.classList.remove('imagen-marcada');
      var desde = parseInt(ev.dataTransfer.getData('text/plain'), 10);
      if (isNaN(desde) || desde === i) return;
      registrarHistorial();
      var m = slots.splice(desde, 1)[0];
      slots.splice(i, 0, m);
      renderearSeccion(seccionActual);
      actualizarEstadoPublicacion();
    });

    return min;
  }

  function construirControlesSimple(item, slot) {
    var cont = document.createElement('div');
    cont.className = 'articulo-controles';

    var zona = document.createElement('div');
    zona.className = 'zona-soltar';
    zona.innerHTML = '<p><b>Arrastra una imagen aquí</b> o elige el archivo.</p><p class="articulo-controles__fila" style="justify-content:center;margin-top:.7rem"><button class="btn btn--borde btn-mini" type="button">Elegir archivo…</button></p><p>JPG, PNG o WEBP · máx. 3 MB</p><p>Se reencuadra automáticamente a ' + item.proporcion + '</p>';
    configurarZonaSoltar(zona, item, false);
    var boton = $('button', zona);
    boton.addEventListener('click', function (e) {
      e.stopPropagation();
      abrirSelectorImagenes(item);
    });

    var fila = document.createElement('div');
    fila.className = 'articulo-controles__fila';
    var eli = document.createElement('button');
    eli.className = 'btn btn--borde btn-mini btn-mini--peligro';
    eli.type = 'button';
    eli.textContent = item.opcional ? 'Eliminar imagen' : 'Eliminar (volver a la imagen por defecto)';
    eli.addEventListener('click', function () {
      registrarHistorial();
      var fallback = soporteArchivo[item.clave];
      slot.actual = fallback || null;
      slot.blob = null;
      slot.vista = null;
      renderearSeccion(seccionActual);
      actualizarEstadoPublicacion();
      toast('Imagen eliminada. Volvió a la imagen por defecto.');
    });
    fila.appendChild(eli);

    var nota = document.createElement('p');
    nota.className = 'articulo-nota';
    nota.textContent = slot.blob
      ? 'Nueva imagen lista. Se publicará como img/' + item.base + '.' + extensionDe(item)
      : 'En uso: ' + (slot.actual || 'ninguna imagen');

    cont.appendChild(zona);
    cont.appendChild(fila);
    cont.appendChild(nota);
    return cont;
  }

  function construirControlesGaleria(item) {
    var cont = document.createElement('div');
    var nota = document.createElement('p');
    nota.className = 'articulo-nota';
    nota.textContent = 'Consejo: arrastra las miniaturas para ordenar la galería. Puedes agregar todas las imágenes que quieras; cada una la publicas con un clic.';
    cont.appendChild(nota);
    return cont;
  }

  function configurarZonaSoltar(zona, item, esGaleria) {
    zona.addEventListener('dragover', function (ev) {
      ev.preventDefault();
      zona.classList.add('zona-soltar--sobre');
    });
    zona.addEventListener('dragleave', function () {
      zona.classList.remove('zona-soltar--sobre');
    });
    zona.addEventListener('drop', function (ev) {
      ev.preventDefault();
      zona.classList.remove('zona-soltar--sobre');
      var archivos = Array.prototype.slice.call(ev.dataTransfer.files || []);
      if (archivos.length) insertarArchivos(archivos, item, esGaleria);
    });
  }

  /* =========================================================
     6. Subida de imágenes
     ========================================================= */
  var entradaImagenes = document.getElementById('entradaImagenes');
  var itemPendiente = null;

  function abrirSelectorImagenes(item) {
    itemPendiente = item;
    entradaImagenes.value = '';
    entradaImagenes.click();
  }

  entradaImagenes.addEventListener('change', function () {
    if (!itemPendiente) return;
    var archivos = Array.prototype.slice.call(entradaImagenes.files || []);
    var esGaleria = itemPendiente.tipo === 'galeria';
    insertarArchivos(archivos, itemPendiente, esGaleria);
    itemPendiente = null;
  });

  function insertarArchivos(archivos, item, esGaleria) {
    var slots = obtener(estado, item.clave);
    prepararSlotsPorInsertar(archivos, item).then(function (nuevos) {
      registrarHistorial();
      nuevos.forEach(function (ns) { ns.actual = null; });
      if (esGaleria) {
        slots.push.apply(slots, nuevos);
      } else {
        var slot = slots;
        slot.blob = nuevos[0].blob;
        slot.vista = nuevos[0].vista;
        slot.actual = null;
      }
      renderearSeccion(seccionActual);
      actualizarEstadoPublicacion();
      var n = archivos.length;
      toast((esGaleria ? 'Fotos agregadas a la galería' : 'Imagen nueva lista') + ', optimizada en ' + EXTENSION + '.');
    }).catch(function (err) {
      toast(err.message, 'error');
    });
  }

  /* =========================================================
     7. Barra de estado, borrador, publicación (ZIP)
     ========================================================= */
  function actualizarEstadoPublicacion() {
    var barra = document.getElementById('estadoPublicacion');
    var cambios = contarCambios();
    var cambiosConfig = contarCambiosConfig();
    var igual = JSON.stringify(construirRutas()) === JSON.stringify(lugarPublicado);
    if (igual && cambios === 0 && cambiosConfig === 0) {
      barra.innerHTML = 'Todo publicado. Sin cambios pendientes.';
    } else if (igual) {
      barra.innerHTML = '<b>' + cambios + '</b> imagen(es) nueva(s) guardada(s) en el borrador.';
    } else if (cambios === 0) {
      barra.innerHTML = 'Cambios de configuración sin publicar.';
    } else {
      barra.innerHTML = '<b>' + cambios + '</b> imagen(es) nueva(s) y/o el orden cambió. Publica para exportar el ZIP.';
    }
  }

  function guardarBorrador() {
    idbSet('borrador', clonarEstado(estado)).then(function () {
      toast('Borrador guardado en este navegador.');
    }).catch(function () {
      toast('No se pudo guardar el borrador.', 'error');
    });
  }

  function mostrarAvisoBorrador() {
    var cont = document.getElementById('avisoBorrador');
    cont.innerHTML = '';
    idbGet('borrador').then(function (borrador) {
      if (!borrador) return;
      var aviso = document.createElement('div');
      aviso.className = 'aviso-restaurar';
      var txt = document.createElement('span');
      txt.textContent = 'Hay un borrador sin publicar en este navegador.';
      var acciones = document.createElement('span');
      acciones.className = 'articulo-controles__fila';
      var restaurar = document.createElement('button');
      restaurar.className = 'btn btn--borde btn-mini';
      restaurar.type = 'button';
      restaurar.textContent = 'Restaurar borrador';
      restaurar.addEventListener('click', function () {
        registrarHistorial();
        estado = borrador;
        cont.innerHTML = '';
        renderearTodo();
        toast('Borrador restaurado.');
      });
      var descartar = document.createElement('button');
      descartar.className = 'btn btn--borde btn-mini btn-mini--peligro';
      descartar.type = 'button';
      descartar.textContent = 'Descartar';
      descartar.addEventListener('click', function () {
        idbDel('borrador').then(function () { cont.innerHTML = ''; toast('Borrador descartado.'); });
      });
      acciones.appendChild(restaurar);
      acciones.appendChild(descartar);
      aviso.appendChild(txt);
      aviso.appendChild(acciones);
      cont.appendChild(aviso);
    }).catch(function () {});
  }

  /* ---------- Escritor ZIP (sin dependencias, método STORE) ---------- */
  var CRC_TABLA = (function () {
    var t = [];
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[n] = c >>> 0;
    }
    return t;
  })();

  function crc32(datos) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < datos.length; i++) c = (CRC_TABLA[(c ^ datos[i]) & 0xFF] ^ (c >>> 8)) >>> 0;
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  function dosFechaHora(d) {
    return {
      fecha: (((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()) & 0xFFFF,
      hora: ((d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1)) & 0xFFFF
    };
  }

  function crearZip(entradas) {
    var t = dosFechaHora(new Date());
    var enc = new TextEncoder();
    var central = [];
    var piezas = [];
    var tamaño = 0;

    entradas.forEach(function (ent) {
      var nombreBytes = enc.encode(ent.nombre);
      var crc = crc32(ent.datos);
      var len = ent.datos.length;
      var offset = tamaño;

      var cab = new Uint8Array(30 + nombreBytes.length);
      var dv = new DataView(cab.buffer);
      dv.setUint32(0, 0x04034b50, true);
      dv.setUint16(4, 20, true);
      dv.setUint16(6, 0x0800, true);
      dv.setUint16(8, 0, true);
      dv.setUint16(10, t.hora, true);
      dv.setUint16(12, t.fecha, true);
      dv.setUint32(14, crc, true);
      dv.setUint32(18, len, true);
      dv.setUint32(22, len, true);
      dv.setUint16(26, nombreBytes.length, true);
      dv.setUint16(28, 0, true);
      cab.set(nombreBytes, 30);

      var cen = new Uint8Array(46 + nombreBytes.length);
      var cv = new DataView(cen.buffer);
      cv.setUint32(0, 0x02014b50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 0x0800, true);
      cv.setUint16(10, 0, true);
      cv.setUint16(12, t.hora, true);
      cv.setUint16(14, t.fecha, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, len, true);
      cv.setUint32(24, len, true);
      cv.setUint16(28, nombreBytes.length, true);
      cv.setUint16(30, 0, true);
      cv.setUint16(32, 0, true);
      cv.setUint16(34, 0, true);
cv.setUint16(36, 0, true);
cv.setUint32(42, offset, true);
cen.set(nombreBytes, 46);

      piezas.push(cab, ent.datos);
      central.push(cen);
      tamaño += cab.length + len;
    });

    var inicioCentral = tamaño;
    var centralTamaño = 0;
    var todas = piezas.slice();
    central.forEach(function (c) { todas.push(c); centralTamaño += c.length; });

    var eocd = new Uint8Array(22);
    var ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(4, 0, true);
    ev.setUint16(6, 0, true);
    ev.setUint16(8, entradas.length, true);
    ev.setUint16(10, entradas.length, true);
    ev.setUint32(12, centralTamaño, true);
    ev.setUint32(16, inicioCentral, true);
    ev.setUint16(20, 0, true);
    todas.push(eocd);

    var total = 0;
    todas.forEach(function (p) { total += p.length; });
    var salida = new Uint8Array(total);
    var off = 0;
    todas.forEach(function (p) { salida.set(p, off); off += p.length; });
    return salida;
  }

  function publicarCambios() {
    var cambios = contarCambios();
    var igual = JSON.stringify(construirRutas()) === JSON.stringify(lugarPublicado);

    if (!cambios && igual) {
      toast('No hay cambios que publicar.', 'error');
      return;
    }

    /* 1. Asignar nombres de archivo únicos e identificar las imágenes nuevas */
    var blobsPorRuta = {};

    SECCIONES.forEach(function (sec) {
      sec.items.forEach(function (item) {
        if (item.tipo === 'interruptor') return;
        var slots = obtener(estado, item.clave);
        var lista = Array.isArray(slots) ? slots : [slots];
        var usadas = new Set(lista.map(function (s) { return s.actual; }).filter(Boolean));
        var seq = 0;

        lista.forEach(function (slot) {
          if (!slot.blob) return;
          var ruta;
          if (item.tipo === 'galeria') {
            do {
              seq++;
              ruta = 'img/' + item.base + '-' + seq + '.' + extensionDe(item);
            } while (usadas.has(ruta));
          } else {
            ruta = 'img/' + item.base + '.' + extensionDe(item);
          }
          usadas.add(ruta);
          blobsPorRuta[ruta] = slot.blob;
          slot.pendienteRuta = ruta;
        });
      });
    });

    /* 2. Convertir imágenes a bytes y armar el ZIP */
    var enc = new TextEncoder();
    var rutasNuevas = Object.keys(blobsPorRuta);

    return Promise.all(rutasNuevas.map(function (ruta) {
      return blobsPorRuta[ruta].arrayBuffer().then(function (buf) {
        return { nombre: ruta, datos: new Uint8Array(buf) };
      });
    })).then(function (entradasImagenes) {
      /* 3. Marcar los slots como publicados (la vista previa se conserva) */
      SECCIONES.forEach(function (sec) {
        sec.items.forEach(function (item) {
          if (item.tipo === 'interruptor') return;
          var slots = obtener(estado, item.clave);
          var lista = Array.isArray(slots) ? slots : [slots];
          lista.forEach(function (slot) {
            if (slot.pendienteRuta) {
              slot.actual = slot.pendienteRuta;
              slot.blob = null;
              delete slot.pendienteRuta;
            }
          });
        });
      });

      var json = construirJSONComplete();

      var entradas = entradasImagenes.concat([
        {
          nombre: 'contenido.json',
          datos: enc.encode(JSON.stringify(json, null, 2))
        }
      ]);

      var finalizar = function () {
        lugarPublicado = construirRutas();
        idbDel('borrador');
        renderearSeccion(seccionActual);
        actualizarEstadoPublicacion();
      };

      if (conexionGitHub) {
        return publicarGitHub(entradas).then(function () {
          finalizar();
          toast('Publicado en línea. El sitio se actualiza en 1–2 minutos.');
        }).catch(function (err) {
          toast('No se pudo publicar en línea: ' + err.message, 'error');
        });
      }

      toast('Aún no estás conectado con GitHub. Conéctalo una vez para publicar sin descargar archivos.', 'error');
      abrirModalGitHub();
    });
  }

  /* =========================================================
     7b. Publicación en línea directa a GitHub (sin archivos)
     ========================================================= */

  function ghFetch(ruta, metodo, cuerpo) {
    return fetch('https://api.github.com' + ruta, {
      method: metodo || 'GET',
      headers: {
        'Authorization': 'Bearer ' + conexionGitHub.token,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: cuerpo ? JSON.stringify(cuerpo) : undefined
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (j) {
        if (!res.ok) throw new Error((j && j.message) || ('GitHub respondió HTTP ' + res.status));
        return j;
      });
    });
  }

  function bytesABase64(datos) {
    return new Promise(function (resolver, rechazar) {
      var fr = new FileReader();
      fr.onload = function () { resolver(String(fr.result).split(',')[1]); };
      fr.onerror = rechazar;
      fr.readAsDataURL(new Blob([datos]));
    });
  }

  function publicarGitHub(entradas) {
    var repo = conexionGitHub.repo;
    var rama = conexionGitHub.rama;
    var mensaje = 'Actualización del sitio — ' + new Date().toISOString().slice(0, 10);

    return ghFetch('/repos/' + repo + '/git/ref/heads/' + rama).then(function (ref) {
      return Promise.all(entradas.map(function (ent) {
        return bytesABase64(ent.datos).then(function (b64) {
          return ghFetch('/repos/' + repo + '/git/blobs', 'POST', { content: b64, encoding: 'base64' });
        }).then(function (blob) {
          return { path: ent.nombre, mode: '100644', type: 'blob', sha: blob.sha };
        });
      })).then(function (items) {
        return ghFetch('/repos/' + repo + '/git/trees', 'POST', {
          base_tree: ref.object.sha,
          tree: items
        });
      }).then(function (arbol) {
        return ghFetch('/repos/' + repo + '/git/commits', 'POST', {
          message: mensaje,
          tree: arbol.sha,
          parents: [ref.object.sha]
        });
      }).then(function (commit) {
        return ghFetch('/repos/' + repo + '/git/refs/heads/' + rama, 'PATCH', {
          sha: commit.sha,
          force: false
        });
      });
    });
  }

  function refrescarBtnGitHub() {
    var b = document.getElementById('btnGitHub');
    if (!b) return;
    b.textContent = conexionGitHub ?
      'En línea: ' + conexionGitHub.repo :
      'Conectar para publicar en línea';
  }

  function abrirModalGitHub() {
    var conectado = !!conexionGitHub;
    var repo = conexionGitHub ? conexionGitHub.repo : '10Vero10/Ventanas-y-aluminios';
    var rama = conexionGitHub ? conexionGitHub.rama : 'main';
    var html =
      '<h2>' + (conectado ? 'Publicación en línea · conectada' : 'Conectar con GitHub') + '</h2>' +
      '<p>Con esto, el botón <b>Publicar</b> sube las fotos directo al sitio web, sin guardar ningún archivo en tu equipo.</p>' +
      '<form id="formGitHub">' +
      '<label>Token de GitHub (Personal Access Token)' +
      '<input type="password" id="ghToken" autocomplete="new-password" placeholder="github_pat_…"' +
      (conectado ? '' : ' required') + '></label>' +
      '<label>Repositorio<input type="text" id="ghRepo" value="' + repo + '"></label>' +
      '<label>Rama<input type="text" id="ghRama" value="' + rama + '"></label>' +
      '<div class="modal-pasos">' +
      '<details><summary>Cómo crear el token (una sola vez)</summary>' +
      '<ol style="padding-left:1.2rem">' +
      '<li>En github.com: tu foto → <b>Settings</b> → <b>Developer settings</b> → <b>Personal access tokens</b> → <b>Fine-grained tokens</b> → <b>Generate new token</b>.</li>' +
      '<li>Repository access: <b>Only select repositories</b> → elige <b>' + repo + '</b>.</li>' +
      '<li>Permissions: <b>Contents</b> → <b>Read and write</b>.</li>' +
      '<li>Generate token y pégalo aquí. Guárdalo en un lugar seguro.</li></ol>' +
      '</details>' +
      '<p style="margin:.8rem 0 0">El token queda guardado solo en este navegador. Úsalo en tu equipo propio: desde la consola del navegador (F12) cualquier persona podría leerlo.</p>' +
      '</div>' +
      '<div class="modal__botones">' +
      '<button class="btn btn--borde" type="button" data-cerrar>Cancelar</button>' +
      (conectado ? '<button class="btn btn--borde" type="button" id="ghDesconectar">Desconectar</button>' : '') +
      '<button class="panel-boton" type="submit">' + (conectado ? 'Actualizar conexión' : 'Guardar conexión') + '</button>' +
      '</div>' +
      '</form>';
    var tarjeta = abrirModal(html);
    tarjeta.querySelector('[data-cerrar]').addEventListener('click', cerrarModal);
    if (conectado) {
      tarjeta.querySelector('#ghDesconectar').addEventListener('click', desconectarGitHub);
    }
    tarjeta.querySelector('#formGitHub').addEventListener('submit', function (e) {
      e.preventDefault();
      guardarConexionGitHub(tarjeta);
    });
  }

  function guardarConexionGitHub(tarjeta) {
    var token = tarjeta.querySelector('#ghToken').value.trim();
    var repo = tarjeta.querySelector('#ghRepo').value.trim()
      .replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '');
    var rama = tarjeta.querySelector('#ghRama').value.trim() || 'main';
    if (!token || !repo) { toast('Completa el token y el repositorio.', 'error'); return; }
    var anterior = conexionGitHub;
    conexionGitHub = { token: token, repo: repo, rama: rama };
    ghFetch('/repos/' + repo).then(function () {
      localStorage.setItem('vya_github', JSON.stringify(conexionGitHub));
      refrescarBtnGitHub();
      cerrarModal();
      toast('Conectado a GitHub. Publicar sube las fotos directo al sitio.');
    }).catch(function (err) {
      conexionGitHub = anterior;
      toast('No se pudo conectar: ' + err.message, 'error');
    });
  }

  function desconectarGitHub() {
    conexionGitHub = null;
    localStorage.removeItem('vya_github');
    refrescarBtnGitHub();
    cerrarModal();
    toast('Conexión eliminada. Sin conexión se descarga el ZIP.');
  }

  /* =========================================================
     8. Importar una carpeta publicada (revertir/restaurar)
     ========================================================= */
  function importarCarpeta(archivos) {
    var mapa = {};
    archivos.forEach(function (f) {
      var partes = (f.webkitRelativePath || f.name).split('/');
      var ruta = partes.slice(1).join('/');
      if (ruta) mapa[ruta] = f;
    });
    var jsonArchivo = archivos.find(function (f) { return f.name === 'contenido.json'; });
    if (!jsonArchivo) {
      toast('No se encontró contenido.json en la carpeta.', 'error');
      return;
    }
    var lector = new FileReader();
    lector.onload = function () {
      try {
        var datos = JSON.parse(lector.result);
        registrarHistorial();
        estado = construirEstado(datos);
        lugarPublicado = convertirRutasDesdeEstado();
        renderearTodo();
        toast('Contenido importado. Ya coincide con lo publicado.');
      } catch (e) {
        toast('El contenido.json no es válido.', 'error');
      }
    };
    lector.readAsText(jsonArchivo);
  }

  function convertirRutasDesdeEstado() {
    var rutas = construirRutas();
    return rutas;
  }

  /* =========================================================
     9. Acceso, clave y sesión
     ========================================================= */
  function sha256(texto) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto)).then(function (buf) {
      var b = new Uint8Array(buf);
      var hex = '';
      for (var i = 0; i < b.length; i++) hex += b[i].toString(16).padStart(2, '0');
      return hex;
    });
  }

  function iniciarSesion() {
    document.getElementById('pantallaLogin').hidden = true;
    document.getElementById('app').hidden = false;
    sessionStorage.setItem('vya_panel', '1');
    mostrarAvisoBorrador();
  }

  function cerrarSesion() {
    sessionStorage.removeItem('vya_panel');
    document.getElementById('app').hidden = true;
    document.getElementById('pantallaLogin').hidden = false;
  }

  function abrirModalCambiarClave() {
    var tarjeta = abrirModal(
      '<h2>Cambiar contraseña</h2>' +
      '<p>Elige una contraseña nueva de al menos 8 caracteres. Al guardar se descarga el archivo <b>admin/seguridad.js</b>: reemplaza con él el que está en la carpeta <b>admin</b> del sitio.</p>' +
      '<form id="formClave">' +
      '  <label>Contraseña nueva<input type="password" id="claveNueva" minlength="8" required></label>' +
      '  <label>Repetir contraseña<input type="password" id="claveNueva2" minlength="8" required></label>' +
      '  <div class="modal-pasos"></div>' +
      '  <div class="modal__botones">' +
      '    <button class="btn btn--borde" type="button" data-cerrar>Cancelar</button>' +
      '    <button class="panel-boton" type="submit">Generar archivo</button>' +
      '  </div>' +
      '</form>'
    );
    tarjeta.querySelector('[data-cerrar]').addEventListener('click', cerrarModal);
    tarjeta.querySelector('#formClave').addEventListener('submit', function (e) {
      e.preventDefault();
      var n1 = tarjeta.querySelector('#claveNueva').value;
      var n2 = tarjeta.querySelector('#claveNueva2').value;
      if (n1 !== n2) {
        toast('Las contraseñas no coinciden.', 'error');
        return;
      }
      if (n1.length < 8) {
        toast('Usa al menos 8 caracteres.', 'error');
        return;
      }
      sha256(n1).then(function (hash) {
        var contenido =
          '/* Contraseña del panel — Ventanas y Aluminios */\n' +
          'window.VYA_CLAVE =\n' +
          "  '" + hash + "';\n";
        descargarBytes(enc2(contenido), 'admin/seguridad.js', 'application/javascript');
        tarjeta.querySelector('.modal-pasos').textContent =
          'Archivo descargado: admin/seguridad.js\n' +
          'Cópialo reemplazando el actual dentro de la carpeta admin/.\n' +
          'Nota: el hash es solo un candado visual; el contenido del sitio es público por diseño.';
        toast('Archivo de contraseña generado.');
      });
    });
  }

  function enc2(s) { return new TextEncoder().encode(s); }

  function abrirModalImportar() {
    abrirModal(
      '<h2>Importar contenido publicado</h2>' +
      '<p>Útil para volver a un estado ya publicado (por ejemplo, para deshacer un error). Selecciona la <b>carpeta</b> que descomprimiste de un ZIP anterior (debe contener <b>contenido.json</b> y las imágenes).</p>' +
      '<div class="modal__botones">' +
      '  <button class="btn btn--borde" type="button" data-cerrar>Cancelar</button>' +
      '  <button class="panel-boton" type="button" id="elegirCarpeta">Elegir carpeta…</button>' +
      '</div>'
    );
    document.querySelector('#contenedorModal [data-cerrar]').addEventListener('click', cerrarModal);
    document.querySelector('#contenedorModal #elegirCarpeta').addEventListener('click', function () {
      cerrarModal();
      document.getElementById('entradaImportar').value = '';
      document.getElementById('entradaImportar').click();
    });
  }

  /* =========================================================
     10. Inicio y eventos
     ========================================================= */
  function encender() {
    var formLogin = document.getElementById('formLogin');
    formLogin.addEventListener('submit', function (e) {
      e.preventDefault();
      var clave = document.getElementById('clave').value;
      var error = document.getElementById('loginError');
      sha256(clave).then(function (hash) {
        if (hash === window.VYA_CLAVE) {
          error.hidden = true;
          iniciarSesion();
          inicializarDatos();
        } else {
          error.hidden = false;
          error.textContent = 'Contraseña incorrecta.';
        }
      });
    });

    document.getElementById('navSecciones').addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      renderearSeccion(b.dataset.seccion);
    });

    document.getElementById('btnDeshacer').addEventListener('click', deshacer);
    document.getElementById('btnRehacer').addEventListener('click', rehacer);
    document.getElementById('btnBorrador').addEventListener('click', guardarBorrador);
    document.getElementById('btnPublicar').addEventListener('click', publicarCambios);
    document.getElementById('btnGitHub').addEventListener('click', abrirModalGitHub);
    refrescarBtnGitHub();
    document.getElementById('btnSalir').addEventListener('click', cerrarSesion);
    document.getElementById('btnClave').addEventListener('click', abrirModalCambiarClave);
    document.getElementById('btnImportar').addEventListener('click', abrirModalImportar);

    document.getElementById('entradaImportar').addEventListener('change', function () {
      var archivos = Array.prototype.slice.call(document.getElementById('entradaImportar').files || []);
      if (archivos.length) importarCarpeta(archivos);
    });

    document.addEventListener('keydown', function (e) {
      var mod = e.ctrlKey || e.metaKey;
      if (mod && !e.shiftKey && (e.key === 'z' || e.key === 'Z')) { e.preventDefault(); deshacer(); }
      if (mod && (e.key === 'y' || e.key === 'Y')) { e.preventDefault(); rehacer(); }
    });

    if (sessionStorage.getItem('vya_panel') === '1') {
      iniciarSesion();
      inicializarDatos();
    }
  }

  function inicializarDatos() {
    VYA.cargarContenido().then(function (datos) {
      estado = construirEstado(datos);
      SECCIONES.forEach(function (sec) {
        sec.items.forEach(function (item) {
          soporteArchivo[item.clave] = VYA.valor(datos, item.clave) || null;
        });
      });
      lugarPublicado = construirRutas();
      historialDeshacer.length = 0;
      historialRehacer.length = 0;
      renderearTodoYEstado();
    }).catch(function () {
      estado = construirEstado({});
      lugarPublicado = construirRutas();
      renderearTodoYEstado();
      toast('No se pudo leer contenido.json. Se cargan valores por defecto.', 'error');
    });
  }

  function renderearTodoYEstado() {
    renderearSeccion('inicio');
    actualizarEstadoPublicacion();
    actualizarBotonesHistorial();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', encender);
  } else {
    encender();
  }
})();