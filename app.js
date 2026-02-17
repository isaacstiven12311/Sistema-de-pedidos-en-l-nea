/* ================================================================
   SABORES EXÓTICOS · Heladería Artesanal
   Archivo: app.js
   Descripción: Lógica completa del sistema — Cliente, Cocina, ERP
   Autores: Isaac Núñez · Nicolas Betancourt · Daniel Rojas
   Año: 2026
================================================================ */

/* ================================================================
   MÓDULO 1 — BASE DE DATOS (Catálogo y datos iniciales)
================================================================ */

/** Catálogo de helados artesanales */
const products = [
  {
    id: 1,
    name: "Lúcuma",
    region: "Amazonas",
    color: "#C85F3C",
    desc: "Fruta peruana de textura cremosa y sabor caramelizado. Suministrada por comunidades del Putumayo.",
    price: 4500,
    prepTime: 3
  },
  {
    id: 2,
    name: "Maracuyá",
    region: "Caribe",
    color: "#C9A227",
    desc: "Tropical y refrescante, con equilibrio perfecto entre dulce y ácido. Origen Golfo de Morrosquillo.",
    price: 4200,
    prepTime: 3
  },
  {
    id: 3,
    name: "Guanábana",
    region: "Chocó",
    color: "#4A7C59",
    desc: "Cremosidad excepcional con notas frescas. Comunidades afrocolombianas del Chocó biogeográfico.",
    price: 4800,
    prepTime: 4
  },
  {
    id: 4,
    name: "Coco Tostado",
    region: "Caribe",
    color: "#A8462A",
    desc: "Coco caramelizado con trozos crujientes. Costas atlánticas, cultivos orgánicos de pequeños productores.",
    price: 5000,
    prepTime: 4
  },
  {
    id: 5,
    name: "Matcha Orgánico",
    region: "Sierra Nevada",
    color: "#355C41",
    desc: "Té verde ceremonial con sabor terroso. Cultivado en huertos experimentales de la Sierra Nevada.",
    price: 5500,
    prepTime: 3
  },
  {
    id: 6,
    name: "Lavanda",
    region: "Llanos",
    color: "#7a6bde",
    desc: "Notas florales suaves y aromáticas. Lavanda silvestre recolectada por comunidades llaneras.",
    price: 5200,
    prepTime: 3
  },
  {
    id: 7,
    name: "Pistacho Siciliano",
    region: "Sierra Nevada",
    color: "#6B7F5A",
    desc: "Pistachos importados molidos artesanalmente. Uno de nuestros sabores emblema con textura única.",
    price: 6000,
    prepTime: 5
  },
  {
    id: 8,
    name: "Rosas y Frambuesa",
    region: "Llanos",
    color: "#C85F3C",
    desc: "Fusión floral y frutal. Pétalos de rosa cultivados en el piedemonte llanero por mujeres campesinas.",
    price: 5800,
    prepTime: 4
  }
];

/** Inventario de materias primas */
const inventory = [
  { id: 1,  name: "Pulpa de Lúcuma",    origin: "Putumayo",            stock: 18, unit: "kg", min: 5  },
  { id: 2,  name: "Pulpa de Maracuyá",  origin: "Golfo Morrosquillo",  stock: 22, unit: "kg", min: 8  },
  { id: 3,  name: "Pulpa de Guanábana", origin: "Chocó",               stock: 3,  unit: "kg", min: 5  },
  { id: 4,  name: "Coco Rallado",       origin: "Caribe",              stock: 12, unit: "kg", min: 4  },
  { id: 5,  name: "Matcha Premium",     origin: "Sierra Nevada",       stock: 2,  unit: "kg", min: 3  },
  { id: 6,  name: "Esencia Lavanda",    origin: "Llanos",              stock: 6,  unit: "L",  min: 2  },
  { id: 7,  name: "Pistacho Importado", origin: "Sicilia / Imp.",      stock: 9,  unit: "kg", min: 3  },
  { id: 8,  name: "Mermelada Frambuesa",origin: "Llanos",              stock: 7,  unit: "kg", min: 3  },
  { id: 9,  name: "Crema de Leche",     origin: "Local",               stock: 40, unit: "L",  min: 10 },
  { id: 10, name: "Azúcar Orgánica",    origin: "Cauca",               stock: 35, unit: "kg", min: 10 }
];

/** Red de proveedores comunitarios */
const suppliers = [
  { id: 1, name: "Cabildo Indígena Uitoto",  region: "Amazonas",          products: "Pulpa lúcuma, cacao artesanal",   cert: "Comercio Justo",  active: true  },
  { id: 2, name: "Coop. Afro Chocó",         region: "Chocó",             products: "Guanábana, borojo",               cert: "Orgánico",         active: true  },
  { id: 3, name: "Asoc. Pesc. Morrosquillo", region: "Caribe",            products: "Maracuyá, coco",                  cert: "Agroecológico",    active: true  },
  { id: 4, name: "Mujeres Llaneras",         region: "Llanos Orientales", products: "Lavanda, rosas, frambuesa",        cert: "Comercio Justo",  active: true  },
  { id: 5, name: "Red Sierra Nevada",        region: "Sierra Nevada",     products: "Matcha experimental, hierbas",    cert: "Orgánico",         active: false }
];

/* ================================================================
   MÓDULO 2 — ESTADO DE LA APLICACIÓN
================================================================ */

let order         = [];   // Items en el carrito actual
let ticketCounter = 1;    // Contador de turnos
let kitchenOrders = [];   // Pedidos en el panel de cocina
let allSales      = [];   // Historial de ventas
let salesCounter  = 1;    // Contador de ventas
let alertTimer    = null; // Timer para las alertas toast

/* ================================================================
   MÓDULO 3 — NAVEGACIÓN PRINCIPAL
================================================================ */

/**
 * Cambia la página visible (Cliente / Cocina / ERP).
 * @param {string} pageId  - ID del elemento de la página a mostrar
 * @param {HTMLElement} btn - Botón que disparó el evento
 */
function showPage(pageId, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  if (btn) btn.classList.add('active');

  // Acciones específicas al cambiar de página
  if (pageId === 'cocinaPage') renderKitchen();
  if (pageId === 'erpPage')    refreshErp();
}

/**
 * Cambia el panel activo dentro del ERP.
 * @param {string} panelId - ID del panel a mostrar
 * @param {HTMLElement} btn - Botón del sidebar que disparó el evento
 */
function showErpPanel(panelId, btn) {
  document.querySelectorAll('.erp-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.erp-sidebar-nav button').forEach(b => b.classList.remove('active'));
  document.getElementById(panelId).classList.add('active');
  if (btn) btn.classList.add('active');
}

/* ================================================================
   MÓDULO 4 — CATÁLOGO DE PRODUCTOS (Página cliente)
================================================================ */

/**
 * Genera y renderiza las tarjetas de productos en el DOM.
 */
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = products.map(p => `
    <div class="prod-card">
      <div class="prod-card-color-bar" style="background:${p.color}"></div>
      <div class="prod-body">
        <div class="prod-region">📍 ${p.region}</div>
        <h3>${p.name}</h3>
        <p class="prod-desc">${p.desc}</p>
        <div class="prod-footer">
          <span class="prod-price">$${p.price.toLocaleString('es-CO')}</span>
          <span class="prod-time">${p.prepTime} MIN</span>
        </div>
        <button class="add-btn" onclick="addToOrder(${p.id})">
          <span>+ Agregar</span>
        </button>
      </div>
    </div>
  `).join('');
}

/* ================================================================
   MÓDULO 5 — CARRITO DE PEDIDO
================================================================ */

/**
 * Agrega un producto al carrito. Si ya existe, incrementa la cantidad.
 * @param {number} pid - ID del producto
 */
function addToOrder(pid) {
  const product  = products.find(p => p.id === pid);
  const existing = order.find(i => i.id === pid);
  if (existing) {
    existing.quantity++;
  } else {
    order.push({ ...product, quantity: 1 });
  }
  updateCart();
}

/**
 * Elimina un item del carrito por su índice.
 * @param {number} idx - Índice del item en el array order
 */
function removeFromOrder(idx) {
  order.splice(idx, 1);
  updateCart();
}

/**
 * Actualiza la visualización del carrito en el sidebar.
 * Recalcula totales y tiempo de espera.
 */
function updateCart() {
  const itemsDiv = document.getElementById('orderItems');
  const totalQty = order.reduce((s, i) => s + i.quantity, 0);

  // Actualizar badge del carrito
  document.getElementById('orderCount').textContent = totalQty;

  // Carrito vacío
  if (!order.length) {
    itemsDiv.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>';
    document.getElementById('totalPrice').textContent = '0';
    document.getElementById('waitTime').textContent   = '0';
    document.getElementById('checkoutBtn').disabled   = true;
    return;
  }

  // Renderizar items
  itemsDiv.innerHTML = order.map((item, i) => `
    <div class="o-item">
      <div>
        <div class="o-item-name">${item.name}</div>
        <div class="o-item-qty">×${item.quantity}</div>
      </div>
      <span class="o-item-price">$${(item.price * item.quantity).toLocaleString('es-CO')}</span>
      <button class="o-remove" onclick="removeFromOrder(${i})">×</button>
    </div>
  `).join('');

  // Calcular total y tiempo estimado
  const total    = order.reduce((s, i) => s + i.price * i.quantity, 0);
  const maxTime  = Math.max(...order.map(i => i.prepTime));
  const waitTime = maxTime + Math.floor(totalQty / 2);

  document.getElementById('totalPrice').textContent = total.toLocaleString('es-CO');
  document.getElementById('waitTime').textContent   = waitTime;
  document.getElementById('checkoutBtn').disabled   = false;
}

/* ================================================================
   MÓDULO 6 — CONFIRMACIÓN DE PEDIDO Y TICKET
================================================================ */

/**
 * Procesa el checkout: genera ticket, envía a cocina y registra venta.
 */
document.getElementById('checkoutBtn').addEventListener('click', () => {
  const total    = order.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalQty = order.reduce((s, i) => s + i.quantity, 0);
  const maxTime  = Math.max(...order.map(i => i.prepTime));
  const wait     = maxTime + Math.floor(totalQty / 2);
  const turnStr  = String(ticketCounter).padStart(3, '0');

  // Mostrar modal ticket
  document.getElementById('ticketNum').textContent   = turnStr;
  document.getElementById('ticketTotal').textContent = total.toLocaleString('es-CO');
  document.getElementById('ticketTime').textContent  = wait;
  document.getElementById('ticketModal').classList.add('open');

  // Enviar pedido a cocina
  kitchenOrders.push({
    id:        ticketCounter,
    turnStr,
    items:     [...order],
    total,
    wait,
    status:    'pending',
    createdAt: Date.now()
  });

  // Registrar en el historial de ventas
  allSales.unshift({
    n:      salesCounter++,
    turn:   turnStr,
    items:  order.map(i => `${i.name} ×${i.quantity}`).join(', '),
    total,
    wait,
    date:   new Date().toLocaleString('es-CO'),
    status: 'Confirmado'
  });

  updateKitchenBadge();
  ticketCounter++;
  order = [];
  updateCart();
});

/** Cierra el modal del ticket de turno */
function closeTicket() {
  document.getElementById('ticketModal').classList.remove('open');
}

/** Actualiza el badge de notificación en la pestaña de Cocina */
function updateKitchenBadge() {
  const pending = kitchenOrders.filter(o => o.status === 'pending').length;
  document.getElementById('kitchenBadge').textContent = pending;
}

/* ================================================================
   MÓDULO 7 — PANEL DE COCINA (Kanban)
================================================================ */

/**
 * Renderiza el tablero Kanban de cocina con los tres estados.
 */
function renderKitchen() {
  const pending  = kitchenOrders.filter(o => o.status === 'pending');
  const progress = kitchenOrders.filter(o => o.status === 'progress');
  const done     = kitchenOrders.filter(o => o.status === 'done');

  // Actualizar estadísticas
  document.getElementById('kPending').textContent  = pending.length;
  document.getElementById('kProgress').textContent = progress.length;
  document.getElementById('kDone').textContent     = done.length;

  // Renderizar columnas
  document.getElementById('colPending').innerHTML  = buildKitchenCards(pending,  'pending');
  document.getElementById('colProgress').innerHTML = buildKitchenCards(progress, 'progress');
  document.getElementById('colDone').innerHTML     = buildKitchenCards(done,     'done');
}

/**
 * Construye el HTML de las tarjetas del Kanban.
 * @param {Array}  list   - Lista de pedidos filtrada por estado
 * @param {string} status - Estado: 'pending' | 'progress' | 'done'
 * @returns {string} HTML generado
 */
function buildKitchenCards(list, status) {
  if (!list.length) return '<div class="k-empty">Sin pedidos</div>';

  return list.map(o => {
    const elapsed  = Math.floor((Date.now() - o.createdAt) / 60000);
    const itemsHtml = o.items.map(i =>
      `<div class="k-item-row"><span>${i.name}</span><span>×${i.quantity}</span></div>`
    ).join('');

    // Botones según el estado actual
    let actions = '';
    if (status === 'pending') {
      actions = `
        <button class="k-btn k-btn-start" onclick="moveOrder(${o.id}, 'progress')">▶ Iniciar</button>
        <button class="k-btn k-btn-del"   onclick="moveOrder(${o.id}, 'cancel')">🗑</button>`;
    } else if (status === 'progress') {
      actions = `
        <button class="k-btn k-btn-done"  onclick="moveOrder(${o.id}, 'done')">✔ Listo</button>
        <button class="k-btn k-btn-del"   onclick="moveOrder(${o.id}, 'cancel')">🗑</button>`;
    } else {
      actions = `
        <button class="k-btn k-btn-del"   onclick="moveOrder(${o.id}, 'cancel')">Eliminar</button>`;
    }

    return `
      <div class="k-order-card">
        <div class="k-card-top">
          <span class="k-turn">#${o.turnStr}</span>
          <span class="k-elapsed">${elapsed}' transcurrido</span>
        </div>
        <div class="k-items">${itemsHtml}</div>
        <div class="k-actions">${actions}</div>
      </div>`;
  }).join('');
}

/**
 * Mueve un pedido a otro estado o lo elimina del Kanban.
 * @param {number} id        - ID del pedido
 * @param {string} newStatus - Nuevo estado: 'progress' | 'done' | 'cancel'
 */
function moveOrder(id, newStatus) {
  if (newStatus === 'cancel') {
    kitchenOrders = kitchenOrders.filter(o => o.id !== id);
  } else {
    const order = kitchenOrders.find(o => o.id === id);
    if (order) order.status = newStatus;
  }
  updateKitchenBadge();
  renderKitchen();
}

/* ================================================================
   MÓDULO 8 — ERP: ACTUALIZACIÓN GENERAL
================================================================ */

/**
 * Refresca todos los paneles del ERP con datos actualizados.
 */
function refreshErp() {
  renderInventory();
  renderSuppliers();
  renderSalesTable();
  renderInvoices();
  renderDashboard();
}

/* ================================================================
   MÓDULO 9 — ERP: DASHBOARD
================================================================ */

/**
 * Actualiza el dashboard con KPIs calculados en tiempo real.
 */
function renderDashboard() {
  // Fecha de hoy
  const today = new Date().toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  document.getElementById('dashDate').textContent = today;

  // KPI: Ventas del día
  const totalDay = allSales.reduce((s, x) => s + x.total, 0);
  document.getElementById('kpiSalesDay').textContent = '$' + totalDay.toLocaleString('es-CO');
  document.getElementById('kpiSalesSub').textContent = allSales.length + ' pedidos';

  // KPI: Producto más vendido
  const freq = buildProductFrequency();
  const best = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];
  document.getElementById('kpiBest').textContent = best ? best[0] : '—';

  // KPI: Tiempo promedio de espera
  const avgTime = allSales.length
    ? Math.round(allSales.reduce((s, x) => s + x.wait, 0) / allSales.length)
    : 0;
  document.getElementById('kpiAvgTime').textContent = avgTime + ' min';

  // Clientes en reportes
  document.getElementById('rptClients').textContent = allSales.length;

  // Tabla de pedidos recientes
  renderRecentOrdersTable(freq);

  // Gráfico de barras
  renderSalesBars(freq);
}

/**
 * Construye un objeto con la frecuencia de venta de cada producto.
 * @returns {Object} { nombreProducto: cantidad }
 */
function buildProductFrequency() {
  const freq = {};
  allSales.forEach(s => {
    s.items.split(', ').forEach(it => {
      const name = it.split(' ×')[0];
      freq[name] = (freq[name] || 0) + 1;
    });
  });
  return freq;
}

/**
 * Renderiza la tabla de pedidos recientes en el Dashboard.
 * @param {Object} freq - Frecuencias de productos
 */
function renderRecentOrdersTable() {
  const tbody = document.getElementById('recentOrdersBody');
  if (!allSales.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:2rem">Sin pedidos aún</td></tr>';
    return;
  }
  tbody.innerHTML = allSales.slice(0, 10).map(s => `
    <tr>
      <td><strong>#${s.turn}</strong></td>
      <td style="font-size:.82rem;color:var(--muted)">
        ${s.items.substring(0, 40)}${s.items.length > 40 ? '…' : ''}
      </td>
      <td><strong>$${s.total.toLocaleString('es-CO')}</strong></td>
      <td>${s.wait} min</td>
      <td><span class="pill pill-green">${s.status}</span></td>
    </tr>
  `).join('');
}

/**
 * Renderiza el gráfico de barras de ventas por producto.
 * @param {Object} freq - Frecuencias de productos
 */
function renderSalesBars(freq) {
  const barsDiv = document.getElementById('salesBars');
  const maxFreq = Math.max(1, ...Object.values(freq));
  barsDiv.innerHTML = products.map(p => {
    const count  = freq[p.name] || 0;
    const height = Math.round((count / maxFreq) * 140) + 4;
    return `
      <div class="bar-col">
        <div class="bar-val">${count}</div>
        <div class="bar-fill" style="height:${height}px; background:linear-gradient(180deg, ${p.color}, ${p.color}99)"></div>
        <div class="bar-lbl">${p.name.split(' ')[0]}</div>
      </div>`;
  }).join('');
}

/* ================================================================
   MÓDULO 10 — ERP: INVENTARIO
================================================================ */

/**
 * Renderiza la tabla de inventario con indicadores de stock.
 */
function renderInventory() {
  document.getElementById('inventoryBody').innerHTML = inventory.map(item => {
    const isLow     = item.stock <= item.min;
    const isWarning = item.stock <= item.min * 1.5 && !isLow;
    const pillClass = isLow ? 'pill-red' : isWarning ? 'pill-yellow' : 'pill-green';
    const pillLabel = isLow ? 'Stock Bajo' : isWarning ? 'Revisar' : 'OK';
    return `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td>${item.origin}</td>
        <td>${item.stock}</td>
        <td>${item.unit}</td>
        <td>${item.min}</td>
        <td><span class="pill ${pillClass}">${pillLabel}</span></td>
        <td>
          <button class="erp-btn erp-btn-primary erp-btn-sm" onclick="editStock(${item.id})">Editar</button>
        </td>
      </tr>`;
  }).join('');
}

/**
 * Permite editar el stock de un insumo mediante un prompt.
 * @param {number} id - ID del insumo
 */
function editStock(id) {
  const item   = inventory.find(i => i.id === id);
  if (!item) return;
  const newVal = prompt(`Stock actual de "${item.name}" (${item.stock} ${item.unit}):`, item.stock);
  if (newVal !== null && !isNaN(parseFloat(newVal))) {
    item.stock = parseFloat(newVal);
    renderInventory();
    showAlert(`✅ Stock de "${item.name}" actualizado`);
  }
}

/**
 * Guarda un nuevo insumo desde el modal de inventario.
 */
function saveInventoryItem() {
  const name   = document.getElementById('invName').value.trim();
  const origin = document.getElementById('invOrigin').value.trim();
  const stock  = parseFloat(document.getElementById('invStock').value)  || 0;
  const unit   = document.getElementById('invUnit').value;
  const min    = parseFloat(document.getElementById('invMin').value)    || 0;

  if (!name) return alert('Ingresa el nombre del insumo');

  inventory.push({ id: inventory.length + 1, name, origin, stock, unit, min });
  closeModal('modalInventory');
  renderInventory();
  showAlert('✅ Insumo registrado correctamente');

  // Limpiar campos del formulario
  ['invName', 'invOrigin', 'invStock', 'invMin'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

/* ================================================================
   MÓDULO 11 — ERP: PROVEEDORES
================================================================ */

/**
 * Renderiza la tabla de proveedores comunitarios.
 */
function renderSuppliers() {
  document.getElementById('suppliersBody').innerHTML = suppliers.map(s => `
    <tr>
      <td><strong>${s.name}</strong></td>
      <td>📍 ${s.region}</td>
      <td style="font-size:.82rem;color:var(--muted)">${s.products}</td>
      <td><span class="pill pill-green">${s.cert}</span></td>
      <td><span class="pill ${s.active ? 'pill-green' : 'pill-gray'}">${s.active ? 'Activo' : 'Inactivo'}</span></td>
      <td>
        <button class="erp-btn erp-btn-primary erp-btn-sm" onclick="toggleSupplier(${s.id})">
          ${s.active ? 'Desactivar' : 'Activar'}
        </button>
      </td>
    </tr>
  `).join('');
}

/**
 * Guarda un nuevo proveedor desde el modal.
 */
function saveSupplier() {
  const name     = document.getElementById('supName').value.trim();
  const region   = document.getElementById('supRegion').value;
  const cert     = document.getElementById('supCert').value;
  const products2= document.getElementById('supProducts').value.trim();

  if (!name) return alert('Ingresa el nombre del proveedor');

  suppliers.push({ id: suppliers.length + 1, name, region, products: products2, cert, active: true });
  closeModal('modalSupplier');
  renderSuppliers();
  showAlert('✅ Proveedor registrado correctamente');

  // Limpiar campos
  ['supName', 'supProducts'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

/**
 * Activa o desactiva un proveedor.
 * @param {number} id - ID del proveedor
 */
function toggleSupplier(id) {
  const supplier = suppliers.find(s => s.id === id);
  if (supplier) {
    supplier.active = !supplier.active;
    renderSuppliers();
  }
}

/* ================================================================
   MÓDULO 12 — ERP: VENTAS
================================================================ */

/**
 * Renderiza el historial completo de ventas.
 */
function renderSalesTable() {
  const tbody = document.getElementById('salesBody');
  if (!allSales.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:2rem">Sin ventas registradas</td></tr>';
    return;
  }
  tbody.innerHTML = allSales.map(s => `
    <tr>
      <td>#${s.n}</td>
      <td><strong>#${s.turn}</strong></td>
      <td style="font-size:.82rem;color:var(--muted)">
        ${s.items.substring(0, 45)}${s.items.length > 45 ? '…' : ''}
      </td>
      <td><strong>$${s.total.toLocaleString('es-CO')}</strong></td>
      <td>${s.wait} min</td>
      <td style="font-size:.78rem">${s.date}</td>
      <td><span class="pill pill-green">${s.status}</span></td>
    </tr>
  `).join('');
}

/**
 * Exporta el historial de ventas como archivo CSV.
 */
function exportCSV() {
  if (!allSales.length) {
    showAlert('⚠️ No hay ventas para exportar');
    return;
  }
  const headers = ['#', 'Turno', 'Productos', 'Total (COP)', 'Tiempo (min)', 'Fecha', 'Estado'];
  const rows    = allSales.map(s =>
    [s.n, s.turn, `"${s.items}"`, s.total, s.wait, s.date, s.status].join(',')
  );
  const csv  = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `ventas_sabores_exoticos_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showAlert('⬇️ Archivo CSV descargado');
}

/* ================================================================
   MÓDULO 13 — ERP: FACTURAS
================================================================ */

/**
 * Genera la tabla de facturas con cálculo de IVA (19%).
 */
function renderInvoices() {
  const tbody = document.getElementById('invoicesBody');
  if (!allSales.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:2rem">Sin facturas generadas</td></tr>';
    return;
  }
  tbody.innerHTML = allSales.map((s, i) => {
    const iva      = Math.round(s.total * 0.19);
    const subtotal = s.total - iva;
    const invoiceN = String(allSales.length - i).padStart(4, '0');
    return `
      <tr>
        <td><strong>FV-${invoiceN}</strong></td>
        <td>#${s.turn}</td>
        <td style="font-size:.78rem;color:var(--muted)">
          ${s.items.substring(0, 35)}${s.items.length > 35 ? '…' : ''}
        </td>
        <td>$${subtotal.toLocaleString('es-CO')}</td>
        <td>$${iva.toLocaleString('es-CO')}</td>
        <td><strong>$${s.total.toLocaleString('es-CO')}</strong></td>
        <td style="font-size:.78rem">${s.date}</td>
      </tr>`;
  }).join('');
}

/* ================================================================
   MÓDULO 14 — MODALES
================================================================ */

/**
 * Abre un modal por su ID.
 * @param {string} modalId
 */
function openModal(modalId) {
  document.getElementById(modalId).classList.add('open');
}

/**
 * Cierra un modal por su ID.
 * @param {string} modalId
 */
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

// Cerrar modales al hacer clic fuera del contenido
document.querySelectorAll('.erp-modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

/* ================================================================
   MÓDULO 15 — ALERTAS TOAST
================================================================ */

/**
 * Muestra una notificación toast en la esquina inferior derecha.
 * @param {string} msg - Mensaje a mostrar
 */
function showAlert(msg) {
  const el = document.getElementById('alertBanner');
  document.getElementById('alertMsg').textContent = msg;
  el.classList.add('show');
  clearTimeout(alertTimer);
  alertTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

/* ================================================================
   MÓDULO 16 — INICIALIZACIÓN
================================================================ */

/**
 * Inicializa la aplicación al cargar la página.
 */
(function init() {
  renderProducts();
  renderInventory();
  renderSuppliers();

  // Mostrar la fecha actual en el dashboard
  document.getElementById('dashDate').textContent = new Date().toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
})();