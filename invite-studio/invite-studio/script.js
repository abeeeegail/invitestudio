(function () {
  'use strict';

  var S = window.STORE || {};
  var cats = S.categories || [];
  var prods = S.products || [];
  var catMap = {};
  cats.forEach(function (c) { catMap[c.name] = c; });

  /* ---------- helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // Safe element builder (never injects HTML, so config text can't break the page)
  function el(tag, props, children) {
    var n = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      var v = props[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? '' : v);
    });
    [].concat(children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      n.append(c.nodeType ? c : document.createTextNode(c));
    });
    return n;
  }

  function grad(h) {
    return 'linear-gradient(150deg,hsl(' + h + ',30%,86%),hsl(' + h + ',22%,68%))';
  }

  // Image box with colored placeholder + graceful fallback if the file is missing
  function media(src, hue, label, ratio, onclick) {
    var box = el('div', { class: 'ph ' + (ratio || 'r43'), style: 'background:' + grad(hue) });
    var cap = el('span', { text: label || '' });
    box.append(cap);
    if (src) {
      var img = el('img', { src: src, alt: label || '', loading: 'lazy' });
      img.addEventListener('error', function () { img.remove(); cap.hidden = false; });
      cap.hidden = true;
      box.append(img);
    }
    if (onclick) box.addEventListener('click', onclick);
    return box;
  }

  function peso(v) { return v ? '₱' + Number(v).toLocaleString('en-PH') : null; }
  function usd(v) { return v ? '$' + Number(v).toLocaleString('en-US') : null; }

  function priceRow(catName, big) {
    var c = catMap[catName] || {};
    return el('div', { class: 'pr' + (big ? ' big' : '') }, [
      el('span', {}, ['Local: ', el('b', { text: peso(c.local) || 'Inquire' })]),
      el('span', {}, ['International: ', el('b', { text: usd(c.intl) || 'Inquire' })])
    ]);
  }

  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast.id);
    toast.id = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  function goto(id) {
    var n = $(id);
    if (n) n.scrollIntoView({ behavior: 'smooth' });
  }

  /* ---------- header: theme + mobile menu ---------- */
  var root = document.documentElement;
  var themeBtn = $('#themeBtn');
  function setTheme(t) {
    root.dataset.theme = t;
    themeBtn.textContent = t === 'dark' ? '☀' : '☾';
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    var m = $('meta[name="theme-color"]');
    if (m) m.content = t === 'dark' ? '#2b211b' : '#F8F5EF';
    try { localStorage.setItem('theme', t); } catch (e) {}
  }
  setTheme(root.dataset.theme || 'light');
  themeBtn.addEventListener('click', function () {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  var nav = $('#nav'), menuBtn = $('#menuBtn');
  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- hero & static text ---------- */
  if (S.tagline) $('#heroTitle').textContent = S.tagline;
  if (S.intro) $('#heroIntro').textContent = S.intro;
  $('#heroMedia').append(media(S.heroImage, 30, 'Your homepage photo', 'r45'));
  $$('.proc').forEach(function (n) { n.textContent = (S.processingTime || '').trim(); });
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- collections ---------- */
  var state = { cat: 'All', q: '' };

  function setCat(name, scroll) {
    state.cat = name;
    renderShop();
    if (scroll) goto('#shop');
  }

  cats.forEach(function (c, i) {
    var count = prods.filter(function (p) { return p.category === c.name; }).length;
    $('#collGrid').append(el('button', { class: 'card cc', type: 'button', onclick: function () { setCat(c.name, true); } }, [
      media(c.image, 20 + i * 9, '', 'r32'),
      el('span', { class: 'cc-name', text: c.name }),
      el('span', { class: 'note', text: count ? count + (count > 1 ? ' designs' : ' design') : 'Coming soon' })
    ]));
  });

  /* ---------- product cards ---------- */
  function card(p) {
    var open = function () { openProduct(p); };
    var main = (p.images || [])[0];
    return el('article', { class: 'card' }, [
      media(main, p.hue || 30, p.name, 'r43', open),
      el('h3', { text: p.name }),
      el('p', { text: p.description }),
      priceRow(p.category),
      el('button', { class: 'btn o', type: 'button', onclick: open, text: 'View Details' })
    ]);
  }

  $('#featGrid').append.apply($('#featGrid'), prods.slice(0, S.featuredCount || 6).map(card));

  function renderShop() {
    var chips = $('#chips');
    chips.textContent = '';
    ['All'].concat(cats.map(function (c) { return c.name; })).forEach(function (n) {
      chips.append(el('button', {
        class: 'chip', type: 'button', text: n,
        'aria-pressed': String(n === state.cat),
        onclick: function () { setCat(n, false); }
      }));
    });
    var q = state.q.trim().toLowerCase();
    var list = prods.filter(function (p) {
      var inCat = state.cat === 'All' || p.category === state.cat;
      var hit = !q || (p.name + ' ' + p.description + ' ' + p.category).toLowerCase().indexOf(q) > -1;
      return inCat && hit;
    });
    var grid = $('#shopGrid');
    grid.textContent = '';
    if (!list.length) grid.append(el('p', { class: 'empty', text: 'More designs coming soon. Contact us for a custom request!' }));
    else list.forEach(function (p) { grid.append(card(p)); });
  }
  $('#q').addEventListener('input', function (e) { state.q = e.target.value; renderShop(); });
  renderShop();

  /* ---------- pricing table ---------- */
  cats.forEach(function (c) {
    var l = peso(c.local), i = usd(c.intl);
    $('#priceBody').append(el('tr', {}, [
      el('td', { text: c.name }),
      el('td', { class: l ? '' : 'na', text: l || 'Inquire' }),
      el('td', { class: i ? '' : 'na', text: i || 'Inquire' })
    ]));
  });

  /* ---------- product dialog ---------- */
  var pd = $('#pd'), current = null;

  function closeOnBackdrop(dlg) {
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.hasAttribute('data-close')) dlg.close();
    });
  }
  closeOnBackdrop(pd);
  closeOnBackdrop($('#legal'));

  function showDialog(d) { if (d.showModal) d.showModal(); else d.setAttribute('open', ''); }

  function openProduct(p) {
    current = p;
    var imgs = p.images || [];
    $('#pdName').textContent = p.name;
    $('#pdDesc').textContent = p.description;
    $('#pdPrices').replaceWith(Object.assign(priceRow(p.category, true), { id: 'pdPrices' }));

    var sample = $('#pdSample');
    var ok = typeof p.sample === 'string' && p.sample.indexOf('https://') === 0;
    sample.hidden = !ok;
    if (ok) sample.href = p.sample;

    function showMain(i) {
      var m = $('#pdMain');
      m.textContent = '';
      m.append(media(imgs[i], p.hue || 30, p.name, 'r45'));
      $$('#pdThumbs button').forEach(function (b, k) { b.setAttribute('aria-current', String(k === i)); });
    }
    var th = $('#pdThumbs');
    th.textContent = '';
    if (imgs.length > 1) {
      imgs.forEach(function (src, i) {
        var b = el('button', { type: 'button', 'aria-label': 'Photo ' + (i + 1), onclick: function () { showMain(i); } }, [media(src, p.hue || 30, '', 'r11')]);
        th.append(b);
      });
    }
    showMain(0);
    showDialog(pd);
  }

  $('#pdOrder').addEventListener('click', function () {
    pd.close();
    $('#ocat').value = current.category;
    fillDesigns();
    $('#odes').value = current.name;
    goto('#order');
  });

  /* ---------- order section ---------- */
  var ocat = $('#ocat'), odes = $('#odes');
  cats.forEach(function (c) { ocat.append(el('option', { text: c.name })); });

  function fillDesigns() {
    var c = ocat.value;
    odes.textContent = '';
    odes.append(el('option', { text: 'Not sure yet' }));
    prods.filter(function (p) { return p.category === c; })
      .forEach(function (p) { odes.append(el('option', { text: p.name })); });
    var f = $('#oflds');
    f.textContent = '';
    f.append(el('li', { text: 'Everyone: ' + (S.commonFields || '') }));
    if (S.fields && S.fields[c]) f.append(el('li', { text: c + ': ' + S.fields[c] }));
  }
  ocat.addEventListener('change', fillDesigns);
  fillDesigns();

  $('#oform').addEventListener('click', function () {
    var note = $('#ofn');
    if (S.orderFormUrl) {
      window.open(S.orderFormUrl, '_blank', 'noopener');
      note.textContent = 'Opening the order form. Remember your selection: ' + ocat.value + ' / ' + odes.value + '.';
    } else {
      var subject = 'Order: ' + ocat.value + ' / ' + odes.value;
      var body = 'Hi The Invite Studio,\n\nI would like to order:\nCategory: ' + ocat.value + '\nDesign: ' + odes.value +
        '\n\nPlease send me the details I need to provide.\n';
      window.location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      note.textContent = 'The online order form isn’t set up yet, so we opened an email instead.';
    }
  });

  /* ---------- payments ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (ok, no) {
      var t = el('textarea', { style: 'position:fixed;opacity:0' });
      t.value = text; document.body.append(t); t.select();
      try { document.execCommand('copy') ? ok() : no(); } catch (e) { no(e); } t.remove();
    });
  }

  function payBlock(m) {
    var kids = [];
    if (m.details) {
      kids.push(el('div', {}, [el('b', { text: m.label }), el('span', { text: m.details })]));
      if (m.copy) kids.push(el('button', {
        class: 'btn o', type: 'button', text: 'Copy number',
        onclick: function () { copyText(m.copy).then(function () { toast(m.label + ' number copied'); }, function () { toast('Copy failed. Please copy manually.'); }); }
      }));
    } else {
      kids.push(el('div', {}, [el('b', { text: m.label })]));
    }
    if (m.qr) {
      var img = el('img', { src: m.qr, alt: m.label + ' QR code', loading: 'lazy' });
      var fig = el('figure', { class: 'qr', style: 'margin:0' }, [img, el('figcaption', { text: 'Scan to pay via ' + m.label })]);
      img.addEventListener('error', function () { fig.remove(); });
      kids.push(fig);
    }
    return el('div', { class: 'pay' }, kids);
  }

  function renderPay(list, target, emptyMsg) {
    var items = (list || []).filter(function (m) { return m.details || m.qr; });
    if (!items.length) { target.append(el('p', { class: 'note', text: emptyMsg })); return; }
    items.forEach(function (m) { target.append(payBlock(m)); });
  }
  renderPay((S.payments || {}).local, $('#payLocal'), 'Payment details coming soon. Please contact us.');
  renderPay((S.payments || {}).international, $('#payIntl'), 'Please contact us for international payment details.');

  /* ---------- testimonials ---------- */
  if (S.testimonials && S.testimonials.length) {
    $('#testimonialsSec').hidden = false;
    S.testimonials.forEach(function (t) {
      $('#testi').append(el('div', { class: 'box' }, [
        el('p', { text: '“' + t.text + '”' }),
        el('p', { class: 'note', text: '— ' + (t.author || 'Customer') })
      ]));
    });
  }

  /* ---------- footer ---------- */
  var em = $('#fEmail');
  em.href = 'mailto:' + S.email; em.textContent = S.email;
  var ph = $('#fPhone');
  ph.href = 'tel:' + String(S.phone || '').replace(/[^\d+]/g, ''); ph.textContent = S.phone || '';
  $('#fLoc').textContent = S.location || '';

  var social = S.social || {};
  var names = { instagram: 'Instagram', facebook: 'Facebook', pinterest: 'Pinterest', tiktok: 'TikTok' };
  var anySocial = false;
  Object.keys(names).forEach(function (k) {
    if (social[k]) {
      anySocial = true;
      $('#fSocial').append(el('br'), el('a', { href: social[k], target: '_blank', rel: 'noopener', text: names[k] }));
    }
  });
  if (!anySocial) $('#fSocial').hidden = true;

  /* ---------- legal dialogs ---------- */
  $$('[data-legal]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-legal');
      $('#legalTitle').textContent = k === 'terms' ? 'Terms and Conditions' : 'Privacy Policy';
      var body = $('#legalBody');
      body.textContent = '';
      ((S.legal || {})[k] || []).forEach(function (t) { body.append(el('p', { text: t })); });
      showDialog($('#legal'));
    });
  });

  /* ---------- scroll reveal ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    $$('.reveal').forEach(function (s) { io.observe(s); });
  } else {
    $$('.reveal').forEach(function (s) { s.classList.add('in'); });
  }
})();
