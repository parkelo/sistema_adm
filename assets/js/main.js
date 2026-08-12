/* ═══════════════════════════════════════════════════════════
   TAMARA MARIA · MÍDIA KIT 2026 — interações & efeitos
   ═══════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE    = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const clamp   = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ─────────── 1. PRELOADER ─────────── */
  const preloader = $('#preloader');
  const preBar    = $('.preloader__bar i');

  function runPreloader() {
    const imgs = $$('img');
    const total = imgs.length || 1;
    let done = 0;

    const tick = () => {
      done++;
      if (preBar) preBar.style.width = Math.round((done / total) * 100) + '%';
    };

    imgs.forEach(img => {
      if (img.complete) tick();
      else {
        img.addEventListener('load', tick, { once: true });
        img.addEventListener('error', tick, { once: true });
      }
    });

    const finish = () => {
      if (preBar) preBar.style.width = '100%';
      setTimeout(() => {
        preloader?.classList.add('is-done');
        document.body.classList.add('is-ready');
        armHero();
      }, 280);
    };

    // libera no load ou após 2.6s (o que vier primeiro)
    let released = false;
    const release = () => { if (!released) { released = true; finish(); } };
    window.addEventListener('load', release, { once: true });
    setTimeout(release, 2600);
  }

  /* ─────────── 2. SPLIT TEXT (headings display) ─────────── */
  function splitText(el) {
    const frag = document.createDocumentFragment();
    let i = 0;

    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          [...n.textContent].forEach(ch => {
            if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); return; }
            const s = document.createElement('span');
            s.className = 'ch';
            s.textContent = ch;
            s.style.setProperty('--d', (i++ * 34) + 'ms');
            frag.appendChild(s);
          });
        } else if (n.nodeName === 'BR') {
          frag.appendChild(document.createElement('br'));
        } else {
          walk(n);
        }
      });
    };

    walk(el);
    el.textContent = '';
    el.appendChild(frag);
    el.classList.add('is-armed');
  }

  /* ─────────── 3. REVEAL ON SCROLL ─────────── */
  function initReveal() {
    // delays declarativos
    $$('[data-reveal][data-delay]').forEach(el =>
      el.style.setProperty('--d', el.dataset.delay + 'ms')
    );

    const splits = $$('[data-split]');
    if (!REDUCED) splits.forEach(splitText);

    /* o hero é animado por armHero() quando o preloader sai — se o observer
       cuidasse dele, a animação aconteceria escondida atrás da cortina */
    const hero = $('#hero');
    const targets = [
      ...$$('[data-reveal]'),
      ...splits,
      ...$$('.gallery__item'),
      ...$$('[data-count]')
    ].filter(el => !hero || !hero.contains(el));

    if (REDUCED || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-in'));
      $$('[data-count]').forEach(setFinalCount);
      return;
    }

    const activate = el => {
      if (el.classList.contains('is-in')) return;
      el.classList.add('is-in');
      if (el.hasAttribute('data-count')) countUp(el);
    };

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        activate(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(el => io.observe(el));

    /* rede de segurança: se algo já está na viewport e não foi ativado
       (ex.: alvo sem área por causa de clip/transform), ativa manualmente */
    const sweep = () => {
      targets.forEach(el => {
        if (el.classList.contains('is-in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight * 0.92 && r.bottom > 0) { activate(el); io.unobserve(el); }
      });
    };
    addEventListener('load', () => setTimeout(sweep, 900), { once: true });
    addEventListener('scroll', () => {
      clearTimeout(sweep._t);
      sweep._t = setTimeout(sweep, 260);
    }, { passive: true });
  }

  /* ─────────── 4. CONTADOR ANIMADO ─────────── */
  const fmt = (v, d) =>
    v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

  function setFinalCount(el) {
    const d = +(el.dataset.decimals || 0);
    el.textContent = fmt(+el.dataset.count, d) + (el.dataset.suffix || '');
  }

  function countUp(el) {
    const target = +el.dataset.count;
    const dec    = +(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || '';
    const dur    = 1700;
    const t0     = performance.now();

    const step = now => {
      const p = clamp((now - t0) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);            // easeOutCubic
      el.textContent = fmt(target * eased, dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else setFinalCount(el);
    };
    requestAnimationFrame(step);
  }

  /* ─────────── 5. HEADER + PROGRESSO + FAB ─────────── */
  function initScrollUI() {
    const header = $('#header');
    const bar    = $('#scrollProgress');
    const fab    = $('#fab');
    const hero   = $('#hero');
    let last = 0, raf = false;

    const update = () => {
      const y   = window.scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;

      if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

      header.classList.toggle('is-stuck', y > 24);
      // esconde ao descer, revela ao subir (nunca com o menu aberto)
      const menuOpen = $('#menu')?.classList.contains('is-open');
      header.classList.toggle('is-hidden', !menuOpen && y > 320 && y > last);

      if (fab && hero) fab.classList.toggle('is-on', y > hero.offsetHeight * 0.7);

      last = y;
      raf = false;
    };

    addEventListener('scroll', () => {
      if (!raf) { raf = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ─────────── 6. MENU MOBILE ─────────── */
  function initMenu() {
    const burger = $('#burger');
    const menu   = $('#menu');
    if (!burger || !menu) return;

    const setOpen = open => {
      burger.classList.toggle('is-open', open);
      menu.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('is-locked', open);
      document.body.classList.toggle('is-menu', open);
    };

    burger.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
    $$('.menu__link', menu).forEach(a => a.addEventListener('click', () => setOpen(false)));
    addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
    });
  }

  /* ─────────── 7. NAV ATIVA ─────────── */
  function initNavActive() {
    const links = $$('.nav-desk__link[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    const map = new Map();
    links.forEach(l => {
      const sec = $(l.getAttribute('href'));
      if (sec) map.set(sec, l);
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const link = map.get(e.target);
        if (!link) return;
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { threshold: 0.4, rootMargin: '-20% 0px -40% 0px' });

    map.forEach((_, sec) => io.observe(sec));
  }

  /* ─────────── 8. PARALLAX ─────────── */
  function initParallax() {
    if (REDUCED) return;
    const els = $$('[data-parallax]');
    if (!els.length) return;

    const items = els.map(el => ({ el, speed: parseFloat(el.dataset.parallax) || 0 }));
    let raf = false;

    const update = () => {
      const vh = innerHeight;
      items.forEach(({ el, speed }) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.transform = `translate3d(0,${offset.toFixed(2)}px,0)`;
      });
      raf = false;
    };

    addEventListener('scroll', () => {
      if (!raf) { raf = true; requestAnimationFrame(update); }
    }, { passive: true });
    addEventListener('resize', update, { passive: true });
    update();
  }

  /* ─────────── 9. CURSOR + MAGNÉTICO + TILT (desktop) ─────────── */
  function initPointerFX() {
    if (!FINE || REDUCED) return;

    /* cursor */
    const cur = $('#cursor');
    if (cur) {
      document.body.classList.add('has-cursor');
      let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;

      addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
      addEventListener('mouseleave', () => { cur.style.opacity = '0'; });
      addEventListener('mouseenter', () => { cur.style.opacity = '1'; });

      (function loop() {
        cx += (tx - cx) * 0.19;
        cy += (ty - cy) * 0.19;
        cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
        requestAnimationFrame(loop);
      })();

      $$('a, button, .gallery__item, .stat, .logo, .role').forEach(el => {
        el.addEventListener('mouseenter', () => cur.classList.add('is-hot'));
        el.addEventListener('mouseleave', () => cur.classList.remove('is-hot'));
      });
    }

    /* magnético */
    $$('[data-magnetic]').forEach(el => {
      const STR = 0.28;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * STR;
        const dy = (e.clientY - (r.top + r.height / 2)) * STR;
        el.style.transform = `translate3d(${dx}px,${dy}px,0)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });

    /* tilt 3D */
    $$('[data-tilt]').forEach(el => {
      const MAX = 6;
      el.style.transformStyle = 'preserve-3d';
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width  - 0.5;
        const py = (e.clientY - r.top)  / r.height - 0.5;
        el.style.transform =
          `perspective(900px) rotateY(${(px * MAX).toFixed(2)}deg) rotateX(${(-py * MAX).toFixed(2)}deg) translateY(-4px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ─────────── 10. LIGHTBOX ─────────── */
  function initLightbox() {
    const box   = $('#lightbox');
    const img   = $('#lbImg');
    const count = $('#lbCount');
    const items = $$('[data-lightbox]');
    if (!box || !items.length) return;

    const srcs = items.map(el => el.dataset.lightbox);
    const alts = items.map(el => $('img', el)?.alt || '');
    let idx = 0;

    const show = i => {
      idx = (i + srcs.length) % srcs.length;
      img.src = srcs[idx];
      img.alt = alts[idx];
      if (count) count.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(srcs.length).padStart(2, '0')}`;
    };
    const open = i => { show(i); box.classList.add('is-open'); document.body.classList.add('is-locked'); };
    const close = () => { box.classList.remove('is-open'); document.body.classList.remove('is-locked'); };

    items.forEach((el, i) => {
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.addEventListener('click', () => open(i));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });

    $('#lbClose')?.addEventListener('click', close);
    $('#lbPrev')?.addEventListener('click', () => show(idx - 1));
    $('#lbNext')?.addEventListener('click', () => show(idx + 1));
    box.addEventListener('click', e => { if (e.target === box) close(); });

    addEventListener('keydown', e => {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });

    /* swipe (mobile) */
    let x0 = null;
    box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 55) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  /* ─────────── 11. ÂNCORAS COM OFFSET ─────────── */
  function initAnchors() {
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        const t = $(id);
        if (!t) return;
        e.preventDefault();
        const top = t.getBoundingClientRect().top + window.scrollY - 10;
        window.scrollTo({ top, behavior: REDUCED ? 'auto' : 'smooth' });
      });
    });
  }

  /* ─────────── 12. HERO ARMADO PÓS-PRELOADER ─────────── */
  function armHero() {
    const h1 = $('.hero [data-split]');
    if (h1) requestAnimationFrame(() => h1.classList.add('is-in'));
    $$('.hero [data-reveal]').forEach(el => el.classList.add('is-in'));
  }

  /* ─────────── BOOT ─────────── */
  initReveal();
  initScrollUI();
  initMenu();
  initNavActive();
  initParallax();
  initPointerFX();
  initLightbox();
  initAnchors();
  runPreloader();
})();
