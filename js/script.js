// =============================================
//  HORARIO ABIERTO / CERRADO
// =============================================
function verificarHorario() {
  var status = document.getElementById('horario-status');
  if (!status) return;

  var now = new Date();
  var utc = now.getTime() + now.getTimezoneOffset() * 60000;
  var mexico = new Date(utc + (-6 * 60 * 60000));
  var dia = mexico.getDay();
  var hora = mexico.getHours();
  var min = mexico.getMinutes();
  var tiempo = hora * 60 + min;

  var abierto = false;
  var proximoHorario = '';

  if (dia >= 1 && dia <= 5) {
    abierto = tiempo >= 540 && tiempo < 1260;
    proximoHorario = abierto ? 'Cierra a las 9:00 PM' : (tiempo < 540 ? 'Abre a las 9:00 AM' : 'Abre mañana a las 9:00 AM');
  } else if (dia === 6) {
    abierto = tiempo >= 540 && tiempo < 1380;
    proximoHorario = abierto ? 'Cierra a las 11:00 PM' : (tiempo < 540 ? 'Abre a las 9:00 AM' : 'Abre el domingo a la 1:00 PM');
  } else {
    abierto = tiempo >= 780 && tiempo < 1380;
    proximoHorario = abierto ? 'Cierra a las 11:00 PM' : (tiempo < 780 ? 'Abre a la 1:00 PM' : 'Abre el lunes a las 9:00 AM');
  }

  status.textContent = abierto ? ('Abierto ahora — ' + proximoHorario) : ('Cerrado — ' + proximoHorario);
  status.className = 'horario-status ' + (abierto ? 'abierto' : 'cerrado');
}

// =============================================
//  COMPARTIR TORTA
// =============================================
function compartirTorta(id, nombre, e) {
  e.stopPropagation();
  var url = window.location.origin + window.location.pathname + '#torta-' + id;
  if (navigator.share) {
    navigator.share({ title: nombre + ' — Tortas Tre\'mendas', url: url });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(function() { mostrarToast('Link copiado'); });
  } else {
    mostrarToast('Link: ' + url);
  }
}

function mostrarToast(msg) {
  var t = document.getElementById('share-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'share-toast';
    t.className = 'share-toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('visible');
  setTimeout(function() { t.classList.remove('visible'); }, 2500);
}

// =============================================
//  CONFIRMACIÓN VISUAL AL AGREGAR
// =============================================
function confirmarAgregado() {
  var btn = document.querySelector('.carrito-btn');
  if (!btn) return;
  btn.classList.add('agregado');
  setTimeout(function() { btn.classList.remove('agregado'); }, 700);
  // Vibración haptic (Android y algunos iOS)
  if (navigator.vibrate) navigator.vibrate(50);
}

// Siempre iniciar hasta arriba al cargar o recargar
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('load', function() {
  var hash = window.location.hash;
  if (!hash || hash.length <= 1) {
    window.scrollTo(0, 0);
  }
});

// Fix flecha atrás iOS (bfcache)
window.addEventListener('pageshow', function(e) {
  if (e.persisted) window.location.reload();
});

// =============================================
//  DATOS
// =============================================
var TORTAS = [
  { id:1,  nombre:"Queso de puerco",      precio:45, ingredientes:["Queso de puerco","Base de frijol","Lechuga","Tomate","Aguacate","Tapa fundida de queso de hebra"] },
  { id:2,  nombre:"Jamón",                precio:45, ingredientes:["Jamón","Base de frijol","Lechuga","Tomate","Aguacate","Tapa fundida de queso de hebra"] },
  { id:3,  nombre:"Huevo",                precio:45, ingredientes:["Huevo","Base de frijol","Lechuga","Tomate","Aguacate","Tapa fundida de queso de hebra"] },
  { id:4,  nombre:"Salchicha",            precio:45, ingredientes:["Salchicha","Cebolla","Base de frijol","Lechuga","Tomate","Aguacate","Tapa fundida de queso de hebra"] },
  { id:5,  nombre:"3 Quesos",             precio:50, ingredientes:["Base de frijol","Queso manchego","Queso amarillo","Queso de hebra","Lechuga","Tomate","Aguacate"] },
  { id:6,  nombre:"Bistec de cerdo",      precio:55, ingredientes:["Bistec de cerdo","Cebolla","Base de frijol","Lechuga","Tomate","Aguacate","Tapa fundida de queso de hebra"] },
  { id:7,  nombre:"Chorizo",              precio:50, ingredientes:["Chorizo","Cebolla","Base de frijol","Lechuga","Tomate","Aguacate","Tapa fundida de queso de hebra"] },
  { id:8,  nombre:"BBQ",                  precio:60, ingredientes:["Pechuga en fajita","Pechuga en BBQ","Lechuga","Tomate","Aguacate","Tapa fundida de queso de hebra"] },
  { id:9,  nombre:"Cubana",               precio:65, ingredientes:["Jamón","Queso de puerco","Chorizo","Base de frijol","Lechuga","Tomate","Aguacate","Tapa fundida de queso de hebra"] },
  { id:10, nombre:"Hawaiana",             precio:65, ingredientes:["Chuleta","Cebolla","Piña","Lechuga","Tomate","Aguacate","Base de frijol","Queso de hebra fundido en la tapa"] },
  { id:11, nombre:"Tortipizza",           precio:60, ingredientes:["Base de tomate","Queso manchego","Queso amarillo","Queso de hebra","Pepperoni","Lechuga","Tomate","Aguacate"] },
  { id:12, nombre:"Pollo",                precio:55, ingredientes:["Pollo","Cebolla","Base de frijol","Lechuga","Tomate","Aguacate","Tapa fundida de queso de hebra"] },
  { id:13, nombre:"Milanesa de pollo",    precio:65, ingredientes:["Milanesa de pollo","Base de frijol","Lechuga","Tomate","Aguacate","Tapa fundida de queso de hebra"] },
  { id:14, nombre:"Pierna",               precio:65, ingredientes:["Pierna natural","Cebolla","Lechuga","Tomate","Aguacate","Base de frijol","Tapa fundida de queso de hebra"] },
  { id:15, nombre:"Pastor",               precio:65, ingredientes:["Pastor","Base de frijol","Lechuga","Tomate","Aguacate","Tapa fundida de queso de hebra"] },
  { id:16, nombre:"LA TRE'MENDA (BARDA)", precio:80, ingredientes:["Base de frijol","Jamón","Queso de puerco","Chorizo","Carne deshebrada","Queso de hebra","Lechuga","Tomate","Aguacate","Salsa verde de chicharrón en habanero"], especial:true }
];

var TODOS_INGREDIENTES = [
  "Jamón","Queso de puerco","Chorizo","Bistec de cerdo","Pollo","Milanesa de pollo",
  "Pechuga en fajita","Chuleta","Pierna natural","Pastor","Carne deshebrada","Salchicha","Huevo",
  "Base de frijol","Base de tomate","Cebolla","Pechuga en BBQ","Piña",
  "Lechuga","Tomate","Aguacate",
  "Queso de hebra","Queso manchego","Queso amarillo",
  "Pepperoni","Salsa verde de chicharrón en habanero"
];

var BEBIDAS = [
  { id:101, nombre:"Coca 500ml",              precio:25 },
  { id:102, nombre:"Mundet 500ml",            precio:25 },
  { id:103, nombre:"Agua Maku Jamaica 500ml", precio:20 },
  { id:104, nombre:"Agua Maku Horchata 500ml",precio:20 },
  { id:105, nombre:"Agua Maku Guayaba 500ml", precio:20 },
  { id:106, nombre:"Agua Maku Maracuyá 500ml",precio:20 },
  { id:107, nombre:"Agua Maku Tamarindo 500ml",precio:20 },
  { id:108, nombre:"Boing Mango 500ml",       precio:22 },
  { id:109, nombre:"Boing Guayaba 500ml",     precio:22 },
  { id:110, nombre:"Boing Uva 500ml",         precio:22 },
  { id:111, nombre:"Boing Manzana 500ml",     precio:22 },
  { id:112, nombre:"Zarza Parrilla 500ml",    precio:20 },
  { id:113, nombre:"Chiva Cola 600ml",        precio:27 }
];

var COSTO_EXTRA = 10;
var COSTO_ENVIO = 35;

var SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxuHSnWMLHLcolkGTX2Yh9FPCC8xusOMtyFqn_tSWGt3Yda9F2lQUMo5AvPjqNYY0nP/exec';

// =============================================
//  GUARDAR EN GOOGLE SHEETS
// =============================================
function guardarEnSheets(tortas, bebidas, subtotal, envio, total, entrega) {
  if (!SHEETS_URL || SHEETS_URL === 'PEGA_AQUI_TU_URL_DEL_APPS_SCRIPT') return;

  var tortasTexto = tortas.map(function(t) {
    var partes = [t.nombre];
    if (t.sinIngredientes && t.sinIngredientes.length) partes.push('sin ' + t.sinIngredientes.join('/'));
    if (t.extras && t.extras.length) partes.push('extra: ' + t.extras.join('/'));
    if (t.nota) partes.push(t.nota);
    return partes.join(' | ');
  }).join('; ');

  var bebidasTexto = bebidas.map(function(b) { return b.nombre; }).join(', ');
  var extrasTexto = tortas.map(function(t) {
    return t.extras && t.extras.length ? t.nombre + ': ' + t.extras.join(', ') : '';
  }).filter(Boolean).join('; ');

  var params = [
    'tortas='    + encodeURIComponent(tortasTexto  || '-'),
    'bebidas='   + encodeURIComponent(bebidasTexto || '-'),
    'extras='    + encodeURIComponent(extrasTexto  || '-'),
    'subtotal='  + subtotal,
    'envio='     + envio,
    'total='     + total,
    'entrega='   + encodeURIComponent(entrega === 'domicilio' ? 'Domicilio' : 'Recoger')
  ].join('&');

  var img = new Image();
  img.src = SHEETS_URL + '?' + params;
}

// =============================================
//  MENÚ HAMBURGUESA (MÓVIL)
// =============================================
function toggleNav() {
  var links = document.getElementById('nav-links');
  var toggle = document.getElementById('nav-toggle');
  if (!links) return;
  if (links.classList.contains('abierto')) {
    cerrarNav();
  } else {
    links.classList.add('abierto');
    if (toggle) toggle.classList.add('abierto');
    setTimeout(function() {
      document.addEventListener('click', cerrarNavFuera);
    }, 10);
  }
}

function cerrarNav() {
  var links = document.getElementById('nav-links');
  var toggle = document.getElementById('nav-toggle');
  if (links) links.classList.remove('abierto');
  if (toggle) toggle.classList.remove('abierto');
  document.removeEventListener('click', cerrarNavFuera);
}

function cerrarNavFuera(e) {
  var links = document.getElementById('nav-links');
  var toggle = document.getElementById('nav-toggle');
  if (links && !links.contains(e.target) && toggle && !toggle.contains(e.target)) {
    cerrarNav();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.addEventListener('click', function() { cerrarNav(); });
  });
});

// =============================================
//  ESTADO GLOBAL
// =============================================
var carrito = [];
var tortaActual = null;
var tipoEntrega = null;
var ubicacionPedido = null;

// =============================================
//  RENDER MENÚ
// =============================================
function renderMenu() {
  var c = document.getElementById('menu-container');
  if (!c) return;

  var html = '<div class="menu-tabs">'
    + '<button class="menu-tab activo" id="tab-tortas" onclick="cambiarSeccion(\'tortas\')">Tortas</button>'
    + '<button class="menu-tab" id="tab-bebidas" onclick="cambiarSeccion(\'bebidas\')">Bebidas</button>'
    + '</div>';

  html += '<div id="grid-tortas" class="menu-grid">'
    + TORTAS.map(function(t) {
        return '<div class="torta-card' + (t.especial ? ' especial' : '') + '" onclick="abrirModal(' + t.id + ')">'
          + '<h2>' + t.nombre + '</h2>'
          + '<p class="precio">$' + t.precio + '</p>'
          + '<button class="btn-agregar">Ver y agregar</button>'
          + '</div>';
      }).join('') + '</div>';

  html += '<div id="grid-bebidas" class="menu-grid" style="display:none">'
    + BEBIDAS.map(function(b) {
        return '<div class="torta-card" onclick="agregarBebida(' + b.id + ')">'
          + '<h2>' + b.nombre + '</h2>'
          + '<p class="precio">$' + b.precio + '</p>'
          + '<button class="btn-agregar">Agregar</button>'
          + '</div>';
      }).join('') + '</div>';

  c.innerHTML = html;
}

function cambiarSeccion(sec) {
  var gtortas  = document.getElementById('grid-tortas');
  var gbebidas = document.getElementById('grid-bebidas');
  var ttortas  = document.getElementById('tab-tortas');
  var tbebidas = document.getElementById('tab-bebidas');
  if (sec === 'tortas') {
    gtortas.style.display  = 'grid';
    gbebidas.style.display = 'none';
    ttortas.className  = 'menu-tab activo';
    tbebidas.className = 'menu-tab';
  } else {
    gtortas.style.display  = 'none';
    gbebidas.style.display = 'grid';
    ttortas.className  = 'menu-tab';
    tbebidas.className = 'menu-tab activo';
  }
}

function agregarBebida(id) {
  var beb = null;
  for (var i = 0; i < BEBIDAS.length; i++) { if (BEBIDAS[i].id === id) { beb = BEBIDAS[i]; break; } }
  if (!beb) return;
  carrito.push({ tipo:'bebida', nombre:beb.nombre, precio:beb.precio });
  renderCarrito();
  abrirCarrito();
  confirmarAgregado();
}

// =============================================
//  MODAL TORTAS
// =============================================
function abrirModal(id) {
  tortaActual = null;
  for (var i = 0; i < TORTAS.length; i++) { if (TORTAS[i].id === id) { tortaActual = TORTAS[i]; break; } }
  if (!tortaActual) return;

  document.getElementById('modal-nombre').textContent = tortaActual.nombre;
  document.getElementById('modal-precio').textContent = '$' + tortaActual.precio;

  document.getElementById('modal-ingredientes').innerHTML = tortaActual.ingredientes.map(function(ing) {
    return '<label class="chip-label"><input type="checkbox" class="ing-check" value="' + ing + '" checked>'
      + '<span class="chip chip-ing">' + ing + '</span></label>';
  }).join('');

  var propios = tortaActual.ingredientes;
  var disponibles = TODOS_INGREDIENTES.filter(function(x) { return propios.indexOf(x) === -1; });
  document.getElementById('modal-extras').innerHTML = disponibles.map(function(ext) {
    return '<label class="chip-label"><input type="checkbox" class="ext-check" value="' + ext + '">'
      + '<span class="chip chip-ext">' + ext + ' <small style="opacity:.6">+$' + COSTO_EXTRA + '</small></span></label>';
  }).join('');

  document.getElementById('modal-nota').value = '';
  actualizarPrecioModal();

  var extChecks = document.querySelectorAll('.ext-check');
  for (var j = 0; j < extChecks.length; j++) {
    extChecks[j].onchange = actualizarPrecioModal;
  }

  document.getElementById('modal-overlay').className = 'modal-overlay activo';
}

function actualizarPrecioModal() {
  if (!tortaActual) return;
  var n = document.querySelectorAll('.ext-check:checked').length;
  document.getElementById('modal-precio').textContent = '$' + (tortaActual.precio + n * COSTO_EXTRA);
}

function cerrarModal(e) {
  if (e.target === document.getElementById('modal-overlay')) cerrarModalBtn();
}

function cerrarModalBtn() {
  document.getElementById('modal-overlay').className = 'modal-overlay';
}

function agregarAlCarrito() {
  if (!tortaActual) return;
  var ings = document.querySelectorAll('.ing-check');
  var exts = document.querySelectorAll('.ext-check');
  var nota = document.getElementById('modal-nota').value.trim();
  var sin = [], extras = [];
  for (var i = 0; i < ings.length; i++) { if (!ings[i].checked) sin.push(ings[i].value); }
  for (var j = 0; j < exts.length; j++) { if (exts[j].checked) extras.push(exts[j].value); }
  carrito.push({
    tipo:'torta', nombre:tortaActual.nombre,
    precio: tortaActual.precio + extras.length * COSTO_EXTRA,
    sinIngredientes:sin, extras:extras, nota:nota
  });
  cerrarModalBtn();
  renderCarrito();
  abrirCarrito();
  confirmarAgregado();
}

// =============================================
//  CARRITO
// =============================================
function toggleCarrito() {
  var panel   = document.getElementById('carrito-panel');
  var overlay = document.getElementById('carrito-overlay');
  if (panel.classList.contains('abierto')) {
    panel.classList.remove('abierto');
    if (overlay) overlay.classList.remove('activo');
  } else {
    panel.classList.add('abierto');
    if (overlay) overlay.classList.add('activo');
  }
}

function abrirCarrito() {
  var panel   = document.getElementById('carrito-panel');
  var overlay = document.getElementById('carrito-overlay');
  panel.classList.add('abierto');
  if (overlay) overlay.classList.add('activo');
}

function renderCarrito() {
  var n = carrito.length;
  document.getElementById('carrito-count').textContent = n;

  var itemsEl = document.getElementById('carrito-items');
  var footer  = document.getElementById('carrito-footer');

  if (n === 0) {
    itemsEl.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
    footer.className = 'carrito-footer oculto';
    return;
  }

  footer.className = 'carrito-footer';

  var subtotal = 0;
  itemsEl.innerHTML = carrito.map(function(item, i) {
    subtotal += item.precio;
    var det = [];
    if (item.sinIngredientes && item.sinIngredientes.length) det.push('Sin: ' + item.sinIngredientes.join(', '));
    if (item.extras && item.extras.length) det.push('Extra: ' + item.extras.join(', '));
    if (item.nota) det.push(item.nota);
    return '<div class="carrito-item">'
      + '<div class="carrito-item-info"><strong>' + item.nombre + '</strong>'
      + ' <span class="carrito-item-precio">$' + item.precio + '</span>'
      + (det.length ? '<small>' + det.join(' · ') + '</small>' : '')
      + '</div><button class="carrito-item-remove" onclick="quitarDelCarrito(' + i + ')">✕</button></div>';
  }).join('');

  document.getElementById('carrito-subtotal').textContent = '$' + subtotal;
  actualizarTotal(subtotal);
}

function actualizarTotal(subtotal) {
  var bloqueTotal = document.getElementById('bloque-total');
  var filaEnvio   = document.getElementById('fila-envio');
  var btnEnviar   = document.getElementById('btn-enviar');
  var aviso       = document.getElementById('entrega-aviso');

  if (tipoEntrega === null) {
    bloqueTotal.style.display = 'none';
    btnEnviar.disabled = true;
    btnEnviar.className = 'btn whatsapp carrito-enviar deshabilitado';
    aviso.textContent = 'Elige una opción para continuar';
    aviso.style.color = '#888';
    return;
  }

  bloqueTotal.style.display = 'block';

  if (tipoEntrega === 'domicilio') {
    filaEnvio.style.display = 'flex';
    document.getElementById('carrito-envio').textContent = '$' + COSTO_ENVIO;
    document.getElementById('carrito-total').textContent = '$' + (subtotal + COSTO_ENVIO);
    aviso.textContent  = ubicacionPedido ? 'Envío a domicilio: $' + COSTO_ENVIO : 'Selecciona tu ubicación abajo';
    aviso.style.color  = ubicacionPedido ? '#ffb300' : '#e53935';
    btnEnviar.disabled = !ubicacionPedido;
    btnEnviar.className = 'btn whatsapp carrito-enviar' + (!ubicacionPedido ? ' deshabilitado' : '');
  } else {
    filaEnvio.style.display = 'none';
    document.getElementById('carrito-total').textContent = '$' + subtotal;
    aviso.textContent = 'Sin costo de envío';
    aviso.style.color = '#25D366';
    btnEnviar.disabled = false;
    btnEnviar.className = 'btn whatsapp carrito-enviar';
  }
}

function setEntrega(tipo) {
  tipoEntrega = tipo;
  var btnDom = document.getElementById('btn-domicilio');
  var btnRec = document.getElementById('btn-recoger');
  btnDom.className = 'entrega-btn';
  btnRec.className = 'entrega-btn';

  if (tipo === 'domicilio') {
    btnDom.className = 'entrega-btn activo';
    mostrarPanelUbicacion();
  } else {
    btnRec.className = 'entrega-btn activo';
    ocultarPanelUbicacion();
    ubicacionPedido = null;
  }

  var subtotal = 0;
  for (var i = 0; i < carrito.length; i++) { subtotal += carrito[i].precio; }
  actualizarTotal(subtotal);
}

// =============================================
//  SISTEMA DE UBICACIÓN — UNIVERSAL iOS/Android
// =============================================
var mapaLeaflet    = null;
var markerLeaflet  = null;

function mostrarPanelUbicacion() {
  var panel = document.getElementById('ubicacion-panel');
  if (panel) {
    panel.style.display = 'block';
    // Pequeño delay para que el DOM termine de pintar antes de iniciar Leaflet
    setTimeout(function() { inicializarMapa(); }, 120);
  }
}

function ocultarPanelUbicacion() {
  var panel = document.getElementById('ubicacion-panel');
  if (panel) panel.style.display = 'none';
}

function inicializarMapa() {
  if (mapaLeaflet) {
    // Si ya existe, solo hacer invalidateSize por si el panel cambió de tamaño
    setTimeout(function() { mapaLeaflet.invalidateSize(); }, 50);
    return;
  }

  var mapDiv = document.getElementById('mapa-leaflet');
  if (!mapDiv || typeof L === 'undefined') return;

  var lat = 19.4548, lng = -96.9663;

  mapaLeaflet = L.map('mapa-leaflet', {
    zoomControl:       true,
    scrollWheelZoom:   false,   // La rueda del mouse NO hace zoom → scrollea el carrito
    doubleClickZoom:   true,
    dragging:          true,
    tap:               true,    // Necesario para iOS
    tapTolerance:      15,      // Más tolerante en iOS
    touchZoom:         true,    // Permite pinch-zoom en el mapa
    bounceAtZoomLimits: false
  }).setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19
  }).addTo(mapaLeaflet);

  // Marcador arrastrable
  markerLeaflet = L.marker([lat, lng], { draggable: true }).addTo(mapaLeaflet);
  markerLeaflet.bindPopup('📍 Arrastra para ajustar').openPopup();

  markerLeaflet.on('dragend', function() {
    var pos = markerLeaflet.getLatLng();
    guardarUbicacion(pos.lat, pos.lng);
  });

  mapaLeaflet.on('click', function(e) {
    markerLeaflet.setLatLng(e.latlng);
    guardarUbicacion(e.latlng.lat, e.latlng.lng);
  });

  // ---- FIX SCROLL UNIVERSAL ----
  // En iOS/Android: cuando el usuario arrastra sobre el mapa con intención
  // de scrollear el carrito, Leaflet puede capturar el evento.
  // Solución: detectamos si el gesto es principalmente vertical (scroll)
  // y en ese caso deshabilitamos temporalmente el drag del mapa.
  var mapEl       = mapDiv;
  var touchStartY = 0;
  var touchStartX = 0;
  var mapaArrastrando = false;

  mapEl.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      mapaArrastrando = false;
    }
  }, { passive: true });

  mapEl.addEventListener('touchmove', function(e) {
    if (e.touches.length !== 1) return;
    var dy = Math.abs(e.touches[0].clientY - touchStartY);
    var dx = Math.abs(e.touches[0].clientX - touchStartX);

    // Si el movimiento es más vertical que horizontal y todavía no
    // empezó a arrastrar el mapa → permitir scroll del carrito
    if (!mapaArrastrando && dy > dx && dy > 8) {
      // Deshabilitar drag del mapa temporalmente para este gesto
      if (mapaLeaflet.dragging.enabled()) {
        mapaLeaflet.dragging.disable();
      }
    } else if (!mapaArrastrando && dx > dy && dx > 8) {
      // Movimiento horizontal → es drag del mapa
      mapaArrastrando = true;
      if (!mapaLeaflet.dragging.enabled()) {
        mapaLeaflet.dragging.enable();
      }
    }
  }, { passive: true });

  mapEl.addEventListener('touchend', function() {
    // Siempre restaurar dragging al soltar
    setTimeout(function() {
      if (mapaLeaflet && !mapaLeaflet.dragging.enabled()) {
        mapaLeaflet.dragging.enable();
      }
      mapaArrastrando = false;
    }, 50);
  }, { passive: true });

  // Forzar redibujado por si el panel tenía display:none al inicializar
  setTimeout(function() { mapaLeaflet.invalidateSize(); }, 200);
}

function usarMiUbicacion() {
  var btn = document.getElementById('btn-mi-ubicacion');
  if (btn) {
    btn.textContent = '📡 Detectando...';
    btn.disabled = true;
    btn.classList.remove('confirmado');
  }

  if (!navigator.geolocation) {
    alert('Tu navegador no soporta GPS. Usa la opción de mapa.');
    if (btn) { btn.textContent = '📍 Usar mi ubicación'; btn.disabled = false; }
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function(pos) {
      var lat = pos.coords.latitude;
      var lng = pos.coords.longitude;

      if (!mapaLeaflet) {
        inicializarMapa();
        setTimeout(function() { centrarMapaEnUbicacion(lat, lng, btn); }, 300);
      } else {
        centrarMapaEnUbicacion(lat, lng, btn);
      }
    },
    function(err) {
      var msg = err.code === 1
        ? 'Permiso denegado. Activa el GPS en tu navegador y recarga.'
        : 'No se pudo detectar tu ubicación. Toca el mapa para elegirla.';
      alert(msg);
      if (btn) { btn.textContent = '📍 Usar mi ubicación'; btn.disabled = false; }
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
  );
}

function centrarMapaEnUbicacion(lat, lng, btn) {
  mapaLeaflet.setView([lat, lng], 17);
  markerLeaflet.setLatLng([lat, lng]);
  guardarUbicacion(lat, lng);
  if (btn) {
    btn.textContent = '✅ Ubicación detectada';
    btn.disabled = false;
    btn.classList.add('confirmado');
  }
}

function guardarUbicacion(lat, lng) {
  ubicacionPedido = {
    lat:     lat.toFixed(6),
    lng:     lng.toFixed(6),
    mapsUrl: 'https://maps.google.com/?q=' + lat.toFixed(6) + ',' + lng.toFixed(6)
  };

  var aviso = document.getElementById('ubicacion-confirmada');
  if (aviso) {
    aviso.textContent = '✅ Ubicación lista — ajusta el pin si es necesario';
    aviso.style.color = '#25D366';
  }

  actualizarBtnEnviar();

  // Actualizar también el aviso del selector de entrega
  var avisoEntrega = document.getElementById('entrega-aviso');
  if (avisoEntrega && tipoEntrega === 'domicilio') {
    avisoEntrega.textContent = 'Envío a domicilio: $' + COSTO_ENVIO;
    avisoEntrega.style.color = '#ffb300';
  }
}

function actualizarBtnEnviar() {
  var btn = document.getElementById('btn-enviar');
  if (!btn) return;
  var subtotal = carrito.reduce(function(s, i) { return s + i.precio; }, 0);
  actualizarTotal(subtotal);
}

function quitarDelCarrito(i) {
  carrito.splice(i, 1);
  renderCarrito();
}

function limpiarCarrito() {
  carrito       = [];
  tipoEntrega   = null;
  ubicacionPedido = null;
  ocultarPanelUbicacion();
  if (mapaLeaflet) { mapaLeaflet.remove(); mapaLeaflet = null; markerLeaflet = null; }
  var btnDom = document.getElementById('btn-domicilio');
  var btnRec = document.getElementById('btn-recoger');
  if (btnDom) btnDom.className = 'entrega-btn';
  if (btnRec) btnRec.className = 'entrega-btn';
  // Reset botón GPS
  var btnGps = document.getElementById('btn-mi-ubicacion');
  if (btnGps) {
    btnGps.textContent = '📍 Usar mi ubicación';
    btnGps.disabled = false;
    btnGps.classList.remove('confirmado');
  }
  renderCarrito();
}

// =============================================
//  ENVIAR PEDIDO
// =============================================
function enviarPedido() {
  if (!carrito.length || tipoEntrega === null) return;
  if (tipoEntrega === 'domicilio' && !ubicacionPedido) {
    alert('Por favor selecciona tu ubicación de entrega en el mapa.');
    return;
  }

  var tortas   = carrito.filter(function(i) { return i.tipo === 'torta'; });
  var bebidas  = carrito.filter(function(i) { return i.tipo === 'bebida'; });
  var subtotal = carrito.reduce(function(s, i) { return s + i.precio; }, 0);
  var envio    = tipoEntrega === 'domicilio' ? COSTO_ENVIO : 0;

  guardarEnSheets(tortas, bebidas, subtotal, envio, subtotal + envio, tipoEntrega);

  var lineas = ["Pedido - Tortas Tre'mendas", ""];

  if (tortas.length) {
    lineas.push("Tortas:");
    tortas.forEach(function(item, idx) {
      lineas.push((idx+1) + '. ' + item.nombre + ' - $' + item.precio);
      if (item.sinIngredientes && item.sinIngredientes.length) lineas.push('   Sin: ' + item.sinIngredientes.join(', '));
      if (item.extras && item.extras.length) lineas.push('   Extra: ' + item.extras.join(', '));
      if (item.nota) lineas.push('   Nota: ' + item.nota);
    });
  }

  if (bebidas.length) {
    lineas.push('');
    lineas.push("Bebidas:");
    bebidas.forEach(function(item, idx) {
      lineas.push((idx+1) + '. ' + item.nombre + ' - $' + item.precio);
    });
  }

  lineas.push('');
  if (tipoEntrega === 'domicilio') {
    lineas.push('Entrega: A domicilio');
    if (ubicacionPedido) lineas.push('📍 Entregar aquí: ' + ubicacionPedido.mapsUrl);
    lineas.push('Subtotal: $' + subtotal);
    lineas.push('Envio: $' + COSTO_ENVIO);
    lineas.push('Total: $' + (subtotal + COSTO_ENVIO));
  } else {
    lineas.push('Entrega: Paso a recogerlo');
    lineas.push('Total: $' + subtotal);
  }

  lineas.push('');
  lineas.push('Hola, quisiera confirmar este pedido. Muchas gracias.');

  window.open('https://wa.me/522281270558?text=' + encodeURIComponent(lineas.join('\n')), '_blank');
}

// =============================================
//  TRANSICIÓN ENTRE PÁGINAS
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  renderMenu();
  verificarHorario();

  var hash = window.location.hash;
  if (hash && hash.startsWith('#torta-')) {
    var tortaId = parseInt(hash.replace('#torta-', ''));
    if (tortaId) setTimeout(function() { abrirModal(tortaId); }, 500);
  } else if (hash && hash.length > 1) {
    setTimeout(function() {
      var target = document.querySelector(hash);
      if (target) {
        var navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 60;
        var offsetTop = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 16;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }, 300);
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  var paginaActual = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (!href) return;
      if (href.startsWith('http') || href.startsWith('mailto')) return;

      if (href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          var navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 60;
          var offsetTop = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 16;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
        return;
      }

      if (href.includes('.html')) {
        e.preventDefault();
        var dest      = href;
        var destPagina = dest.split('#')[0];
        if (destPagina !== paginaActual) {
          document.body.classList.add('page-exit');
          setTimeout(function() { window.location = dest; }, 300);
        } else {
          var ancla = dest.split('#')[1];
          if (ancla) {
            var el = document.getElementById(ancla);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }
    });
  });
});
