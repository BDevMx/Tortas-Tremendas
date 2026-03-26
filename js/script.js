// =============================================
//  HORARIO ABIERTO / CERRADO
// =============================================
function verificarHorario() {
  var status = document.getElementById('horario-status');
  if (!status) return;

  // Hora de México (UTC-6)
  var now = new Date();
  var utc = now.getTime() + now.getTimezoneOffset() * 60000;
  var mexico = new Date(utc + (-6 * 60 * 60000));
  var dia = mexico.getDay(); // 0=dom, 1=lun...6=sab
  var hora = mexico.getHours();
  var min = mexico.getMinutes();
  var tiempo = hora * 60 + min;

  var abierto = false;
  var proximoHorario = '';

  if (dia >= 1 && dia <= 5) {
    // Lunes a Viernes: 10:00 - 21:30
    abierto = tiempo >= 600 && tiempo < 1290;
    proximoHorario = abierto ? 'Cierra a las 9:30 PM' : (tiempo < 600 ? 'Abre a las 10:00 AM' : 'Abre mañana a las 10:00 AM');
  } else if (dia === 6) {
    // Sábado: 10:00 - 23:00
    abierto = tiempo >= 600 && tiempo < 1380;
    proximoHorario = abierto ? 'Cierra a las 11:00 PM' : (tiempo < 600 ? 'Abre a las 10:00 AM' : 'Abre el domingo a la 1:00 PM');
  } else {
    // Domingo: 13:00 - 23:00
    abierto = tiempo >= 780 && tiempo < 1380;
    proximoHorario = abierto ? 'Cierra a las 11:00 PM' : (tiempo < 780 ? 'Abre a la 1:00 PM' : 'Abre el lunes a las 10:00 AM');
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
  { id:8,  nombre:"BBQ",                  precio:60, ingredientes:["Pechuga en fajita","Cebolla en salsa BBQ","Lechuga","Tomate","Aguacate","Tapa fundida de queso de hebra"] },
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
  "Base de frijol","Base de tomate","Cebolla","Cebolla en salsa BBQ","Piña",
  "Lechuga","Tomate","Aguacate",
  "Queso de hebra","Queso manchego","Queso amarillo","Tapa fundida de queso de hebra","Queso de hebra fundido en la tapa",
  "Pepperoni","Salsa verde de chicharrón en habanero"
];

var BEBIDAS = [
  { id:101, nombre:"Coca 500ml",          precio:25 },
  { id:102, nombre:"Mundet 500ml",        precio:25 },
  { id:103, nombre:"Agua Maku 500ml",     precio:20 },
  { id:104, nombre:"Jamaica",             precio:18 },
  { id:105, nombre:"Horchata",            precio:18 },
  { id:106, nombre:"Guayaba",             precio:18 },
  { id:107, nombre:"Maracuyá",            precio:18 },
  { id:108, nombre:"Tamarindo",           precio:18 },
  { id:109, nombre:"Boing Mango 500ml",   precio:22 },
  { id:110, nombre:"Boing Guayaba 500ml", precio:22 },
  { id:111, nombre:"Boing Uva 500ml",     precio:22 },
  { id:112, nombre:"Boing Manzana 500ml", precio:22 },
  { id:113, nombre:"Zarza Parrilla 500ml",precio:20 },
  { id:114, nombre:"Chiva Cola 600ml",    precio:27 }
];

var COSTO_EXTRA = 10;
var COSTO_ENVIO = 35;

// ← Aquí pegas tu URL del Apps Script después de implementarlo
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

  // Construir URL con parámetros — evita problemas de CORS completamente
  var params = [
    'tortas='    + encodeURIComponent(tortasTexto  || '-'),
    'bebidas='   + encodeURIComponent(bebidasTexto || '-'),
    'extras='    + encodeURIComponent(extrasTexto  || '-'),
    'subtotal='  + subtotal,
    'envio='     + envio,
    'total='     + total,
    'entrega='   + encodeURIComponent(entrega === 'domicilio' ? 'Domicilio' : 'Recoger')
  ].join('&');

  // Usar imagen invisible — funciona desde cualquier origen sin CORS
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
    // Cerrar al tocar fuera
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

// Cerrar nav al hacer clic en un link
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.addEventListener('click', function() {
      cerrarNav();
    });
  });
});


var carrito = [];
var tortaActual = null;
var tipoEntrega = null; // null = sin seleccionar, 'domicilio', 'recoger'

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
  var gtortas = document.getElementById('grid-tortas');
  var gbebidas = document.getElementById('grid-bebidas');
  var ttortas = document.getElementById('tab-tortas');
  var tbebidas = document.getElementById('tab-bebidas');
  if (sec === 'tortas') {
    gtortas.style.display = 'grid';
    gbebidas.style.display = 'none';
    ttortas.className = 'menu-tab activo';
    tbebidas.className = 'menu-tab';
  } else {
    gtortas.style.display = 'none';
    gbebidas.style.display = 'grid';
    ttortas.className = 'menu-tab';
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

  // Listener en extras para actualizar precio
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
  // Cerrar si pican fuera del modal (en el overlay oscuro)
  if (e.target === document.getElementById('modal-overlay')) {
    cerrarModalBtn();
  }
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
  var panel = document.getElementById('carrito-panel');
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
  var panel = document.getElementById('carrito-panel');
  var overlay = document.getElementById('carrito-overlay');
  panel.classList.add('abierto');
  if (overlay) overlay.classList.add('activo');
}

function renderCarrito() {
  var n = carrito.length;
  document.getElementById('carrito-count').textContent = n;

  var itemsEl = document.getElementById('carrito-items');
  var footer = document.getElementById('carrito-footer');

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
  var filaEnvio = document.getElementById('fila-envio');
  var btnEnviar = document.getElementById('btn-enviar');
  var aviso = document.getElementById('entrega-aviso');

  if (tipoEntrega === null) {
    // Sin selección: no mostrar total ni habilitar envío
    bloqueTotal.style.display = 'none';
    btnEnviar.disabled = true;
    btnEnviar.className = 'btn whatsapp carrito-enviar deshabilitado';
    aviso.textContent = 'Elige una opción para continuar';
    aviso.style.color = '#888';
    return;
  }

  bloqueTotal.style.display = 'block';
  btnEnviar.disabled = false;
  btnEnviar.className = 'btn whatsapp carrito-enviar';

  if (tipoEntrega === 'domicilio') {
    filaEnvio.style.display = 'flex';
    document.getElementById('carrito-envio').textContent = '$' + COSTO_ENVIO;
    document.getElementById('carrito-total').textContent = '$' + (subtotal + COSTO_ENVIO);
    aviso.textContent = 'Envío a domicilio: $' + COSTO_ENVIO;
    aviso.style.color = '#ffb300';
  } else {
    filaEnvio.style.display = 'none';
    document.getElementById('carrito-total').textContent = '$' + subtotal;
    aviso.textContent = 'Sin costo de envío';
    aviso.style.color = '#25D366';
  }
}

function setEntrega(tipo) {
  tipoEntrega = tipo;

  var btnDom = document.getElementById('btn-domicilio');
  var btnRec = document.getElementById('btn-recoger');

  // Quitar activo a ambos, luego poner al elegido
  btnDom.className = 'entrega-btn';
  btnRec.className = 'entrega-btn';

  if (tipo === 'domicilio') {
    btnDom.className = 'entrega-btn activo';
  } else {
    btnRec.className = 'entrega-btn activo';
  }

  // Recalcular con subtotal actual
  var subtotal = 0;
  for (var i = 0; i < carrito.length; i++) { subtotal += carrito[i].precio; }
  actualizarTotal(subtotal);
}

function quitarDelCarrito(i) {
  carrito.splice(i, 1);
  renderCarrito();
}

function limpiarCarrito() {
  carrito = [];
  tipoEntrega = null;
  // Reset botones de entrega
  var btnDom = document.getElementById('btn-domicilio');
  var btnRec = document.getElementById('btn-recoger');
  if (btnDom) btnDom.className = 'entrega-btn';
  if (btnRec) btnRec.className = 'entrega-btn';
  renderCarrito();
}

// =============================================
//  ENVIAR PEDIDO
// =============================================
function enviarPedido() {
  if (!carrito.length || tipoEntrega === null) return;

  var tortas = carrito.filter(function(i) { return i.tipo === 'torta'; });
  var bebidas = carrito.filter(function(i) { return i.tipo === 'bebida'; });
  var subtotal = carrito.reduce(function(s, i) { return s + i.precio; }, 0);
  var envio = tipoEntrega === 'domicilio' ? COSTO_ENVIO : 0;

  // Guardar en Google Sheets automáticamente
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

  // Si la URL tiene ancla al cargar (ej: index.html#horario desde menú), ajustar scroll con offset
  // Si hay ancla ir a esa sección, si no ir hasta arriba siempre
  verificarHorario();

  // Si la URL tiene #torta-X abrir ese modal
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

      // Links externos o mailto: dejar pasar normal
      if (href.startsWith('http') || href.startsWith('mailto')) return;

      // Ancla pura (#seccion) en la misma página: scroll suave, sin animación
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

      // Link con ancla a OTRA página (ej: index.html#horario desde menu.html)
      if (href.includes('.html')) {
        e.preventDefault();
        var dest = href;

        // Extraer la parte de página sin ancla para comparar
        var destPagina = dest.split('#')[0];

        // Si la página destino es distinta a la actual → animar slide
        if (destPagina !== paginaActual) {
          document.body.classList.add('page-exit');
          setTimeout(function() { window.location = dest; }, 300);
        } else {
          // Misma página pero con ancla (ej: index.html#contacto estando en index.html)
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
