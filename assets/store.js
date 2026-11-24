(function () {
  'use strict';
  var BASE = document.body.getAttribute('data-base') || '';
  var PHONE = '573202422675';
  var KEY = 'ns-cart-v1';
  var P = window.NS_PRODUCTS || [];
  var CATS = window.NS_CATEGORIES || [];
  var byId = {};
  P.forEach(function (p) { byId[p.id] = p; });
  var catName = {};
  CATS.forEach(function (c) { catName[c.id] = c.name; });

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function money(n) { return '$ ' + Math.round(n).toLocaleString('es-CO'); }
  function img(p) { return BASE + 'assets/img/p/' + p.img + '.webp'; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------------- Cart state ---------------- */
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
  cart = cart.filter(function (l) { return byId[l.id]; });
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} render(); }
  function count() { return cart.reduce(function (a, l) { return a + l.qty; }, 0); }
  function total() { return cart.reduce(function (a, l) { return a + byId[l.id].price * l.qty; }, 0); }
  function add(id, opts, qty) {
    var key = id + '|' + (opts.size || '') + '|' + (opts.color || '');
    var found = cart.filter(function (l) { return l.key === key; })[0];
    if (found) found.qty += qty || 1;
    else cart.push({ key: key, id: id, size: opts.size || '', color: opts.color || '', qty: qty || 1 });
    save();
    toast(byId[id]);
  }

  /* ---------------- Overlays ---------------- */
  var lastFocus = null;
  function openOverlay(el) { lastFocus = document.activeElement; el.classList.add('open'); document.body.classList.add('lock'); var f = el.querySelector('[data-autofocus]') || el.querySelector('button, a, input'); if (f) f.focus(); }
  function closeOverlay(el) { el.classList.remove('open'); if (!$('.overlay.open') && !$('.mmenu.open')) document.body.classList.remove('lock'); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var o = $('.overlay.open') || $('.mmenu.open');
    if (o) closeOverlay(o);
  });
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-close]');
    if (c) closeOverlay(c.closest('.overlay, .mmenu'));
  });

  /* ---------------- Drawer ---------------- */
  var drawer = $('#cart');
  function render() {
    $$('.badge').forEach(function (b) { var n = count(); b.textContent = n; b.setAttribute('data-n', n); });
    if (!drawer) return;
    var items = $('.items', drawer);
    if (!cart.length) {
      items.innerHTML = '<div class="empty"><svg class="icon" aria-hidden="true"><use href="#i-bag"/></svg><p>Tu bolsa está vacía.</p><p style="margin-top:14px"><a class="btn btn-dark" href="' + BASE + 'tienda/">Ir a la tienda</a></p></div>';
    } else {
      items.innerHTML = cart.map(function (l) {
        var p = byId[l.id];
        var meta = [l.size && 'Talla/Tamaño: ' + l.size, l.color && 'Color: ' + l.color].filter(Boolean).join(' · ');
        return '<div class="line" data-key="' + esc(l.key) + '"><img src="' + img(p) + '" alt="" width="76" height="95"><div><b>' + esc(p.name) + '</b>' + (meta ? '<small>' + esc(meta) + '</small>' : '') +
          '<div class="qty" role="group" aria-label="Cantidad de ' + esc(p.name) + '"><button type="button" data-q="-1" aria-label="Quitar uno">−</button><span>' + l.qty + '</span><button type="button" data-q="1" aria-label="Agregar uno">+</button></div>' +
          '<div><button class="rm" type="button" data-rm>Eliminar</button></div></div><div class="lp">' + money(p.price * l.qty) + '</div></div>';
      }).join('');
    }
    $('.total b', drawer).textContent = money(total());
    $('[data-checkout]', drawer).disabled = !cart.length;
  }
  if (drawer) {
    drawer.addEventListener('click', function (e) {
      var line = e.target.closest('.line');
      if (!line) return;
      var l = cart.filter(function (x) { return x.key === line.getAttribute('data-key'); })[0];
      if (!l) return;
      var q = e.target.closest('[data-q]');
      if (q) { l.qty += parseInt(q.getAttribute('data-q'), 10); if (l.qty < 1) cart.splice(cart.indexOf(l), 1); save(); }
      if (e.target.closest('[data-rm]')) { cart.splice(cart.indexOf(l), 1); save(); }
    });
    $('[data-checkout]', drawer).addEventListener('click', function () {
      if (!cart.length) return;
      var name = $('#c-name').value.trim(), city = $('#c-city').value.trim();
      var lines = cart.map(function (l) {
        var p = byId[l.id];
        var extra = [l.size, l.color].filter(Boolean).join(', ');
        return '• ' + l.qty + ' x ' + p.name + (extra ? ' (' + extra + ')' : '') + ' — ' + money(p.price * l.qty);
      });
      var msg = 'Hola Natalie Store, quiero hacer este pedido:\n\n' + lines.join('\n') + '\n\nTotal: ' + money(total()) +
        (name ? '\nNombre: ' + name : '') + (city ? '\nCiudad: ' + city : '') + '\n\n¿Me confirman disponibilidad, envío y medios de pago?';
      window.open('https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }
  $$('[data-open-cart]').forEach(function (b) { b.addEventListener('click', function () { render(); openOverlay(drawer); }); });

  /* ---------------- Toast ---------------- */
  var toastEl = $('#toast'), toastT;
  function toast(p) {
    if (!toastEl) return;
    $('img', toastEl).src = img(p);
    $('[data-t]', toastEl).textContent = p.name + ' se agregó a tu bolsa';
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 3200);
  }
  if (toastEl) $('button', toastEl).addEventListener('click', function () { toastEl.classList.remove('show'); render(); openOverlay(drawer); });

  /* ---------------- Product modal ---------------- */
  var modal = $('#quick');
  var sel = {};
  function pills(name, arr) {
    if (!arr || !arr.length) return '';
    return '<div class="opt"><span>' + name + '</span><div class="pills" data-opt="' + (name === 'Color' ? 'color' : 'size') + '">' +
      arr.map(function (v, i) { return '<button type="button" aria-pressed="' + (arr.length === 1 && i === 0 ? 'true' : 'false') + '">' + esc(v) + '</button>'; }).join('') + '</div></div>';
  }
  function openProduct(id) {
    var p = byId[id]; if (!p || !modal) return;
    sel = { id: id, size: p.sizes.length === 1 ? p.sizes[0] : '', color: p.colors.length === 1 ? p.colors[0] : '', qty: 1 };
    var sizeLabel = p.cat === 'perfumes' || p.cat === 'belleza' ? 'Tamaño' : 'Talla';
    $('.ph img', modal).src = img(p);
    $('.ph img', modal).alt = p.name;
    $('.body', modal).innerHTML =
      '<span class="eyebrow">' + esc(catName[p.cat] || '') + '</span><h2 id="q-title">' + esc(p.name) + '</h2>' +
      '<div class="price">' + (p.oldPrice ? '<span class="now sale">' + money(p.price) + '</span><s>' + money(p.oldPrice) + '</s>' : '<span class="now">' + money(p.price) + '</span>') + '</div>' +
      '<p class="desc">' + esc(p.desc) + '</p>' + pills(sizeLabel, p.sizes) + pills('Color', p.colors) +
      '<div class="opt"><span>Cantidad</span><div class="qty"><button type="button" data-mq="-1" aria-label="Quitar uno">−</button><span data-mqv>1</span><button type="button" data-mq="1" aria-label="Agregar uno">+</button></div></div>' +
      '<p class="err" role="alert"></p>' +
      '<div class="actions"><button class="btn btn-dark btn-block" type="button" data-add><svg class="icon" aria-hidden="true"><use href="#i-bag"/></svg>Agregar a la bolsa</button>' +
      '<a class="btn btn-line btn-block" target="_blank" rel="noopener" href="https://wa.me/' + PHONE + '?text=' + encodeURIComponent('Hola Natalie Store, tengo una pregunta sobre: ' + p.name) + '">Preguntar por WhatsApp</a></div>' +
      (window.NS_DEMO ? '<p class="demo-note">Producto, foto y precio de ejemplo. El catálogo real se publicará pronto.</p>' : '');
    openOverlay(modal.closest('.overlay'));
  }
  if (modal) {
    modal.addEventListener('click', function (e) {
      var pill = e.target.closest('.pills button');
      if (pill) {
        var group = pill.parentNode;
        $$('button', group).forEach(function (b) { b.setAttribute('aria-pressed', b === pill ? 'true' : 'false'); });
        sel[group.getAttribute('data-opt')] = pill.textContent;
        $('.err', modal).textContent = '';
      }
      var mq = e.target.closest('[data-mq]');
      if (mq) { sel.qty = Math.max(1, sel.qty + parseInt(mq.getAttribute('data-mq'), 10)); $('[data-mqv]', modal).textContent = sel.qty; }
      if (e.target.closest('[data-add]')) {
        var p = byId[sel.id];
        if (p.sizes.length > 1 && !sel.size) { $('.err', modal).textContent = 'Elige una ' + (p.cat === 'perfumes' || p.cat === 'belleza' ? 'presentación' : 'talla') + '.'; return; }
        add(sel.id, sel, sel.qty);
        closeOverlay(modal.closest('.overlay'));
      }
    });
  }

  /* ---------------- Cards ---------------- */
  function card(p) {
    var tag = p.oldPrice ? '<span class="tag sale">−' + Math.round((1 - p.price / p.oldPrice) * 100) + '%</span>' : (p.tags.indexOf('nuevo') > -1 ? '<span class="tag new">Nuevo</span>' : '');
    return '<article class="card">' +
      '<div class="media"><div class="ph"><img src="' + img(p) + '" alt="' + esc(p.name) + '" width="720" height="900" loading="lazy"></div>' + tag +
      '<button class="open" type="button" data-product="' + p.id + '"><span class="sr">Ver ' + esc(p.name) + '</span></button>' +
      '<button class="quick" type="button" data-product="' + p.id + '"><svg class="icon" aria-hidden="true"><use href="#i-bag"/></svg>Agregar</button></div>' +
      '<div class="info"><span class="cat">' + esc(catName[p.cat] || '') + '</span><h3>' + esc(p.name) + '</h3>' +
      '<div class="price">' + (p.oldPrice ? '<span class="now sale">' + money(p.price) + '</span><s>' + money(p.oldPrice) + '</s>' : '<span class="now">' + money(p.price) + '</span>') + '</div></div></article>';
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-product]');
    if (b) { e.preventDefault(); openProduct(b.getAttribute('data-product')); }
  });
  window.NS = { card: card, products: P, byId: byId, money: money, img: img, openProduct: openProduct };

  /* ---------------- Generic tabs ---------------- */
  $$('[role="tablist"][data-tabs]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function select(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on ? 'true' : 'false');
        x.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(x.getAttribute('aria-controls'));
        if (panel && !on) panel.hidden = true;
      });
      var sp = document.getElementById(t.getAttribute('aria-controls'));
      if (sp) { sp.hidden = false; sp.classList.remove('fade-in'); void sp.offsetWidth; sp.classList.add('fade-in'); }
      if (focus) t.focus();
      list.dispatchEvent(new CustomEvent('tabchange', { detail: t.getAttribute('data-value') }));
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        select(tabs[(i + d + tabs.length) % tabs.length], true);
      });
    });
    list._select = select;
  });

  /* ---------------- Mobile menu ---------------- */
  var mm = $('.mmenu');
  $$('[data-open-menu]').forEach(function (b) { b.addEventListener('click', function () { openOverlay(mm); }); });
  if (mm) $$('nav a', mm).forEach(function (a) { a.addEventListener('click', function () { closeOverlay(mm); }); });

  /* ---------------- Featured tabs on home ---------------- */
  var feat = { nuevo: 'feat-nuevo', top: 'feat-top', oferta: 'feat-oferta' };
  Object.keys(feat).forEach(function (k) {
    var el = document.getElementById(feat[k]);
    if (!el) return;
    var list = P.filter(function (p) { return k === 'oferta' ? !!p.oldPrice : p.tags.indexOf(k) > -1; }).slice(0, 8);
    el.innerHTML = list.map(card).join('');
  });
  $$('[data-mini]').forEach(function (el) {
    var c = el.getAttribute('data-mini');
    el.innerHTML = P.filter(function (p) { return p.cat === c; }).slice(0, 3).map(function (p) {
      return '<a href="#" data-product="' + p.id + '"><div class="ph"><img src="' + img(p) + '" alt="" width="720" height="900" loading="lazy"></div><b>' + esc(p.name) + '</b><span>' + money(p.price) + '</span></a>';
    }).join('');
  });

  /* ---------------- Shop page ---------------- */
  var shopGrid = document.getElementById('shop-grid');
  if (shopGrid) {
    var params = new URLSearchParams(location.search);
    var state = { cat: params.get('cat') || 'todo', q: params.get('q') || '', sort: 'rel', flt: '' };
    var catList = document.getElementById('shop-cats');
    var input = document.getElementById('shop-q');
    var sortSel = document.getElementById('shop-sort');
    input.value = state.q;
    function apply() {
      var list = P.filter(function (p) {
        if (state.cat !== 'todo' && p.cat !== state.cat) return false;
        if (state.flt === 'nuevo' && p.tags.indexOf('nuevo') < 0) return false;
        if (state.flt === 'oferta' && !p.oldPrice) return false;
        if (state.q) { var q = state.q.toLowerCase(); return (p.name + ' ' + p.desc + ' ' + (catName[p.cat] || '')).toLowerCase().indexOf(q) > -1; }
        return true;
      });
      if (state.sort === 'asc') list.sort(function (a, b) { return a.price - b.price; });
      if (state.sort === 'desc') list.sort(function (a, b) { return b.price - a.price; });
      if (state.sort === 'new') list.sort(function (a, b) { return (b.tags.indexOf('nuevo') > -1) - (a.tags.indexOf('nuevo') > -1); });
      shopGrid.innerHTML = list.length ? list.map(card).join('') : '<p class="noresults" style="grid-column:1/-1">No encontramos productos con esos filtros.</p>';
      document.getElementById('shop-count').textContent = list.length + (list.length === 1 ? ' producto' : ' productos');
      var c = CATS.filter(function (x) { return x.id === state.cat; })[0];
      document.getElementById('shop-title').textContent = c ? c.name : 'Toda la tienda';
      document.getElementById('shop-desc').textContent = c ? c.desc + '.' : 'Ropa, lencería, belleza, perfumes y accesorios en un solo lugar.';
      var u = new URL(location.href);
      state.cat === 'todo' ? u.searchParams.delete('cat') : u.searchParams.set('cat', state.cat);
      state.q ? u.searchParams.set('q', state.q) : u.searchParams.delete('q');
      history.replaceState(null, '', u);
    }
    catList.addEventListener('tabchange', function (e) { state.cat = e.detail; apply(); });
    var initTab = $('[data-value="' + state.cat + '"]', catList);
    if (initTab && catList._select) catList._select(initTab);
    var tmr;
    input.addEventListener('input', function () { clearTimeout(tmr); tmr = setTimeout(function () { state.q = input.value.trim(); apply(); }, 180); });
    sortSel.addEventListener('change', function () { state.sort = sortSel.value; apply(); });
    $$('[data-flt]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-flt');
        state.flt = state.flt === v ? '' : v;
        $$('[data-flt]').forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-flt') === state.flt ? 'true' : 'false'); });
        apply();
      });
    });
    apply();
  }

  render();
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();
