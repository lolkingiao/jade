/* 玉語軒 JADE & SILENCE — interaction layer
   Vanilla ES6, no dependencies. */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Header on scroll ---------- */
  const hdr = $('.hdr');
  if (hdr) {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 60 !== hdr.classList.contains('is-stuck')) hdr.classList.toggle('is-stuck', y > 60);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 2. Mobile drawer ---------- */
  const burger = $('.burger'), drawer = $('.drawer');
  if (burger && drawer) {
    const set = (open) => {
      drawer.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      burger.setAttribute('aria-expanded', String(open));
    };
    burger.addEventListener('click', () => set(!drawer.classList.contains('is-open')));
    $$('a', drawer).forEach((a) => a.addEventListener('click', () => set(false)));
    const x = $('.drawer__x', drawer);
    if (x) x.addEventListener('click', () => set(false));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  }

  /* ---------- 3. Scroll reveal ---------- */
  const reveals = $$('.rv');
  /* failsafe: never leave content invisible, whatever the observer does */
  setTimeout(() => reveals.forEach((el) => el.classList.add('is-in')), 2500);
  if (reveals.length) {
    if (RM || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* ---------- 4. Language toggle (zh-Hant / en) ---------- */
  const LANG_KEY = 'jy-lang';
  function applyLang(lang) {
    const isEn = lang === 'en';
    document.documentElement.lang = isEn ? 'en' : 'zh-Hant';
    document.documentElement.setAttribute('data-lang', isEn ? 'en' : 'zh');
    $$('[data-zh]').forEach((el) => {
      const v = isEn ? el.getAttribute('data-en') : el.getAttribute('data-zh');
      if (v !== null && v !== undefined) el.innerHTML = v;
    });
    $$('[data-zh-ph]').forEach((el) => {
      el.setAttribute('placeholder', isEn ? el.getAttribute('data-en-ph') : el.getAttribute('data-zh-ph'));
    });
    $$('.js-lang').forEach((b) => { b.textContent = isEn ? '中文' : 'EN'; });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }
  let lang = 'zh';
  const urlLang = new URLSearchParams(location.search).get('lang');
  if (urlLang === 'en' || urlLang === 'zh') lang = urlLang;
  else { try { lang = localStorage.getItem(LANG_KEY) || 'zh'; } catch (e) {} }
  applyLang(lang);
  $$('.js-lang').forEach((b) =>
    b.addEventListener('click', () => {
      lang = lang === 'en' ? 'zh' : 'en';
      applyLang(lang);
      try {
        const u = new URL(location.href);
        u.searchParams.set('lang', lang);
        history.replaceState(null, '', u);
      } catch (e) {}
    })
  );

  /* ---------- 5. Collection filtering ---------- */
  const grid = $('[data-grid]');
  if (grid) {
    const cards = $$('.card', grid);
    const chips = $$('.chip[data-filter]');
    const count = $('[data-count]');
    const run = (f) => {
      let n = 0;
      cards.forEach((c) => {
        const hit = f === 'all' || (c.getAttribute('data-group') || '').split(' ').indexOf(f) > -1;
        c.style.display = hit ? '' : 'none';
        if (hit) n++;
      });
      if (count) count.textContent = String(n).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
    };
    /* filter is URL-addressable: /collection.html?group=white */
    const apply = (f, updateUrl) => {
      let chip = null;
      chips.forEach((c) => { if (c.getAttribute('data-filter') === f) chip = c; });
      if (!chip) {
        f = 'all';
        chips.forEach((c) => { if (c.getAttribute('data-filter') === 'all') chip = c; });
      }
      chips.forEach((c) => c.classList.toggle('is-on', c === chip));
      run(f);
      if (updateUrl) {
        try {
          const u = new URL(location.href);
          if (f === 'all') u.searchParams.delete('group');
          else u.searchParams.set('group', f);
          history.replaceState(null, '', u);
        } catch (e) {}
      }
    };
    chips.forEach((chip) =>
      chip.addEventListener('click', () => apply(chip.getAttribute('data-filter'), true))
    );
    let initial = 'all';
    try { initial = new URLSearchParams(location.search).get('group') || 'all'; } catch (e) {}
    apply(initial, false);

    /* sort — no price sort: every piece is price on request */
    const sortSel = $('[data-sort]');
    if (sortSel) {
      const val = (c, k) => c.getAttribute('data-' + k) || '';
      sortSel.addEventListener('change', () => {
        const k = sortSel.value;
        const order = cards.slice().sort((a, b) => {
          if (k === 'weight') return (parseFloat(val(b, 'weight')) || 0) - (parseFloat(val(a, 'weight')) || 0);
          if (k === 'title') return val(a, 'title').localeCompare(val(b, 'title'), 'zh-Hant');
          if (k === 'no') return val(a, 'no').localeCompare(val(b, 'no'));
          return (+val(a, 'idx')) - (+val(b, 'idx'));
        });
        order.forEach((c) => grid.appendChild(c));
      });
    }
  }

  /* ---------- 6. Product gallery ---------- */
  let lbIndex = 0;
  const stage = $('.gal__stage');
  if (stage) {
    const main = $('img', stage);
    const thumbs = $$('.gal__thumbs button');
    const capEl = $('[data-gal-cap]');
    thumbs.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        thumbs.forEach((b) => b.classList.remove('is-on'));
        btn.classList.add('is-on');
        const src = btn.getAttribute('data-full');
        const srcset = btn.getAttribute('data-srcset');
        if (srcset) main.setAttribute('srcset', srcset); else main.removeAttribute('srcset');
        main.setAttribute('src', src);
        main.setAttribute('alt', btn.getAttribute('data-alt') || '');
        if (capEl) capEl.textContent = btn.getAttribute('data-cap') || '';
        // keep the lightbox in sync
        lbIndex = i;
      });
    });

    if (!RM && window.matchMedia('(hover:hover)').matches) {
      stage.addEventListener('mousemove', (e) => {
        const r = stage.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        stage.classList.add('is-zoom');
        main.style.transformOrigin = x + '% ' + y + '%';
      });
      stage.addEventListener('mouseleave', () => stage.classList.remove('is-zoom'));
    }
  }

  /* ---------- 7. Lightbox ---------- */
  const lb = $('.lb');
  if (lb && stage) {
    const lbImg = $('.lb__img', lb);
    const lbCap = $('.lb__cap', lb);
    const lbBar = $('.lb__bar', lb);
    const thumbs = $$('.gal__thumbs button');
    const items = thumbs.map((b) => ({
      full: b.getAttribute('data-full'),
      cap: b.getAttribute('data-cap') || '',
      alt: b.getAttribute('data-alt') || ''
    }));
    if (items.length) {
      lbIndex = Math.max(0, thumbs.findIndex((b) => b.classList.contains('is-on')));
      const show = (i) => {
        lbIndex = (i + items.length) % items.length;
        const it = items[lbIndex];
        lbImg.setAttribute('src', it.full);
        lbImg.setAttribute('alt', it.alt);
        if (lbCap) lbCap.textContent = it.cap;
        if (lbBar) lbBar.textContent = String(lbIndex + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');
      };
      const open = () => {
        show(lbIndex);
        lb.classList.add('is-open');
        requestAnimationFrame(() => lb.classList.add('is-in'));
        document.body.style.overflow = 'hidden';
      };
      const close = () => {
        lb.classList.remove('is-in');
        document.body.style.overflow = '';
        setTimeout(() => lb.classList.remove('is-open'), 320);
      };
      stage.addEventListener('click', open);
      const x = $('.lb__x', lb); if (x) x.addEventListener('click', close);
      const p = $('.lb__nav--prev', lb); if (p) p.addEventListener('click', (e) => { e.stopPropagation(); show(lbIndex - 1); });
      const n = $('.lb__nav--next', lb); if (n) n.addEventListener('click', (e) => { e.stopPropagation(); show(lbIndex + 1); });
      lb.addEventListener('click', (e) => { if (e.target === lb || e.target === lbImg) close(); });
      document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('is-open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(lbIndex - 1);
        if (e.key === 'ArrowRight') show(lbIndex + 1);
      });
    }
  }

  /* ---------- 8. Enquiry form ---------- */
  const form = $('[data-enquiry]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const get = (k) => (d.get(k) || '').toString().trim();
      const lines = [
        '藏品洽詢 / Enquiry',
        '藏品：' + get('piece'),
        '編號：' + get('ref'),
        '姓名：' + get('name'),
        '聯絡：' + get('contact'),
        '訊息：' + get('message')
      ].join('\n');
      const wa = form.getAttribute('data-wa');
      const url = 'https://wa.me/' + wa + '?text=' + encodeURIComponent(lines);
      window.open(url, '_blank', 'noopener');
      const ok = $('[data-ok]');
      if (ok) ok.style.display = 'block';
    });
  }

  /* ---------- 9. Footer year ---------- */
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
