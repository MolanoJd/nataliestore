(function () {
  'use strict';
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var panels = {};
  tabs.forEach(function (t) { panels[t.dataset.key] = document.getElementById(t.getAttribute('aria-controls')); });
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var titles = {
    inicio: 'By Natalie Store — Moda, lencería y belleza',
    ropa: 'Ropa femenina — By Natalie Store',
    lenceria: 'Lencería — By Natalie Store',
    belleza: 'Belleza y maquillaje — By Natalie Store',
    perfumes: 'Perfumes y accesorios — By Natalie Store',
    nosotras: 'Nuestra historia — By Natalie Store',
    contacto: 'Contacto — By Natalie Store'
  };

  function show(key, opts) {
    opts = opts || {};
    if (!panels[key]) key = 'inicio';
    tabs.forEach(function (t) {
      var on = t.dataset.key === key;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var p = panels[t.dataset.key];
      if (on) {
        p.hidden = false;
        p.classList.remove('enter'); void p.offsetWidth;
        if (!reduce) p.classList.add('enter');
        if (opts.scrollTab) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
      } else {
        p.hidden = true;
      }
    });
    document.title = titles[key] || titles.inicio;
    if (opts.push !== false && location.hash !== '#' + key) history.pushState(null, '', '#' + key);
    if (opts.top !== false) window.scrollTo({ top: 0, behavior: 'auto' });
    if (opts.focus) panels[key].focus({ preventScroll: true });
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(t.dataset.key, { scrollTab: true }); });
    t.addEventListener('keydown', function (e) {
      var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (e.key === 'Home') { e.preventDefault(); tabs[0].focus(); show(tabs[0].dataset.key, { scrollTab: true }); return; }
      if (e.key === 'End') { e.preventDefault(); var l = tabs[tabs.length - 1]; l.focus(); show(l.dataset.key, { scrollTab: true }); return; }
      if (!dir) return;
      e.preventDefault();
      var n = tabs[(i + dir + tabs.length) % tabs.length];
      n.focus(); show(n.dataset.key, { scrollTab: true });
    });
  });

  // Any element with data-go switches tab
  document.addEventListener('click', function (e) {
    var go = e.target.closest('[data-go]');
    if (!go) return;
    e.preventDefault();
    show(go.dataset.go, { scrollTab: true, focus: true });
  });

  window.addEventListener('popstate', function () { show(location.hash.slice(1) || 'inicio', { push: false, scrollTab: true }); });
  show(location.hash.slice(1) || 'inicio', { push: false, top: false });

  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();
