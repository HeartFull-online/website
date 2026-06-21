(function () {
  const languages = {
    en: { flag: '🇺🇸', name: 'English', dir: '' },
    es: { flag: '🇪🇸', name: 'Español', dir: 'es' },
    zh: { flag: '🇨🇳', name: '中文', dir: 'zh' },
    ar: { flag: '🇸🇦', name: 'العربية', dir: 'ar' },
    vi: { flag: '🇻🇳', name: 'Tiếng Việt', dir: 'vi' },
  };
  const navLabels = {
    en: { home: 'Home', compare: 'Compare Apps', institute: 'Dating Institute', promoters: 'Promoters', app: 'Open App', menu: 'Menu' },
    es: { home: 'Inicio', compare: 'Comparar apps', institute: 'Instituto de Citas', promoters: 'Promotores', app: 'Abrir app', menu: 'Menu' },
    zh: { home: '首页', compare: '应用对比', institute: 'Dating Institute', promoters: '推广者', app: '打开应用', menu: '菜单' },
    ar: { home: 'الرئيسية', compare: 'مقارنة التطبيقات', institute: 'معهد المواعدة', promoters: 'المروجون', app: 'افتح التطبيق', menu: 'القائمة' },
    vi: { home: 'Trang chủ', compare: 'So sánh ứng dụng', institute: 'Dating Institute', promoters: 'Người quảng bá', app: 'Mở ứng dụng', menu: 'Menu' },
  };
  const translatedPages = new Set(['index.html', 'privacy.html', 'terms.html', 'promoters.html']);

  function normalizePath(pathname) {
    let path = pathname.replace(/^\/+/, '');
    if (path === '') return 'index.html';
    const parts = path.split('/');
    if (languages[parts[0]] && parts[0] !== 'en') {
      parts.shift();
      path = parts.join('/') || 'index.html';
    }
    if (path.endsWith('/')) path += 'index.html';
    return path;
  }

  function languageFromPath(pathname) {
    const first = pathname.split('/').filter(Boolean)[0];
    return languages[first] ? first : null;
  }

  function requestedLanguage() {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('lang');
    if (languages[fromQuery]) return fromQuery;
    const fromPath = languageFromPath(window.location.pathname);
    if (fromPath) return fromPath;
    const saved = localStorage.getItem('hf_language');
    return languages[saved] ? saved : 'en';
  }

  function querySuffix(params) {
    const query = params.toString();
    return query ? `?${query}` : '';
  }

  function localizedHref(lang, pagePath, hash, search) {
    const suffix = hash || '';
    const params = new URLSearchParams(search || '');
    params.delete('lang');
    const publicPath = pagePath === 'index.html'
      ? ''
      : pagePath.endsWith('/index.html')
        ? pagePath.slice(0, -'index.html'.length)
        : pagePath;
    if (lang === 'en') {
      return '/' + publicPath + querySuffix(params) + suffix;
    }

    if (translatedPages.has(pagePath)) {
      return pagePath === 'index.html'
        ? `/${lang}/${querySuffix(params)}${suffix}`
        : `/${lang}/${pagePath}${querySuffix(params)}${suffix}`;
    }

    params.set('lang', lang);
    return `/${publicPath}${querySuffix(params)}${suffix}`;
  }

  function rewriteInternalLinks(lang) {
    document.querySelectorAll('a[href]').forEach((anchor) => {
      if (anchor.closest('.hf-language-menu')) return;
      if (anchor.closest('.hf-site-mobile-languages')) return;
      const raw = anchor.getAttribute('href');
      if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('javascript:')) return;

      let url;
      try {
        url = new URL(raw, window.location.href);
      } catch (_) {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const pagePath = normalizePath(url.pathname);
      const href = localizedHref(lang, pagePath, url.hash, url.search);
      anchor.setAttribute('href', href);
    });
  }

  function buildLanguageMenu(lang, pagePath, search) {
    const current = languages[lang] || languages.en;
    const details = document.createElement('details');
    details.className = 'hf-language-menu';
    details.innerHTML = `
      <summary><span>${current.flag}</span><span>${current.name}</span></summary>
      <div class="hf-language-list">
        ${Object.entries(languages).map(([code, item]) => {
          const active = code === lang ? ' class="active"' : '';
          return `<a${active} data-lang="${code}" href="${localizedHref(code, pagePath, '', search)}"><span>${item.flag}</span><span>${item.name}</span></a>`;
        }).join('')}
      </div>
    `;
    details.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-lang]');
      if (link) localStorage.setItem('hf_language', link.dataset.lang);
    });
    return details;
  }

  function labelsFor(lang) {
    return navLabels[lang] || navLabels.en;
  }

  function navLinks(lang, search) {
    const label = labelsFor(lang);
    return [
      { key: 'home', label: label.home, href: localizedHref(lang, 'index.html', '', search), paths: ['index.html'] },
      { key: 'compare', label: label.compare, href: localizedHref(lang, 'why-heartfull.html', '', search), paths: ['why-heartfull.html', 'compare/'] },
      { key: 'institute', label: label.institute, href: localizedHref(lang, 'dating-institute/index.html', '', search), paths: ['dating-institute/'] },
      { key: 'promoters', label: label.promoters, href: localizedHref(lang, 'promoters.html', '', search), paths: ['promoters.html'] },
    ];
  }

  function activeNavLink(pagePath, link) {
    return link.paths.some((path) => (
      path.endsWith('/') ? pagePath.startsWith(path) : pagePath === path
    ));
  }

  function heartMark() {
    return `
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs><linearGradient id="hf-site-nav-heart" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FF5870"/><stop offset="100%" stop-color="#FF8A9A"/></linearGradient></defs>
        <path d="M16 28C15.6 27.6 3 18.8 3 11C3 6.6 6.2 3 10.2 3C12.7 3 14.9 4.3 16 6.3C17.1 4.3 19.3 3 21.8 3C25.8 3 29 6.6 29 11C29 18.8 16.4 27.6 16 28Z" fill="url(#hf-site-nav-heart)"/>
      </svg>
    `;
  }

  function buildDesktopNav(lang, pagePath, search) {
    const wrap = document.createElement('div');
    wrap.className = 'hf-site-nav';
    navLinks(lang, search).forEach((link) => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.label;
      if (activeNavLink(pagePath, link)) anchor.className = 'active';
      wrap.appendChild(anchor);
    });
    wrap.appendChild(buildLanguageMenu(lang, pagePath, search));
    const app = document.createElement('a');
    app.className = 'hf-site-app';
    app.href = 'https://heartfull.online';
    app.target = '_blank';
    app.rel = 'noopener noreferrer';
    app.textContent = labelsFor(lang).app;
    wrap.appendChild(app);
    return wrap;
  }

  function buildMobileNav(lang, pagePath, search) {
    const menu = document.createElement('details');
    menu.className = 'hf-site-mobile';
    const links = navLinks(lang, search).map((link) => {
      const active = activeNavLink(pagePath, link) ? ' class="active"' : '';
      return `<a${active} href="${link.href}">${link.label}</a>`;
    }).join('');
    const languageLinks = Object.entries(languages).map(([code, item]) => {
      const active = code === lang ? ' class="active"' : '';
      return `<a${active} data-lang="${code}" href="${localizedHref(code, pagePath, '', search)}"><span>${item.flag}</span><span>${item.name}</span></a>`;
    }).join('');
    menu.innerHTML = `
      <summary>${labelsFor(lang).menu}</summary>
      <div class="hf-site-mobile-panel">
        ${links}
        <a href="https://heartfull.online" target="_blank" rel="noopener noreferrer">${labelsFor(lang).app}</a>
        <div class="hf-site-mobile-languages">${languageLinks}</div>
      </div>
    `;
    menu.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-lang]');
      if (link) localStorage.setItem('hf_language', link.dataset.lang);
    });
    return menu;
  }

  function buildBrand(lang) {
    const brand = document.createElement('a');
    brand.href = localizedHref(lang, 'index.html');
    brand.className = 'hf-site-brand';
    brand.innerHTML = `${heartMark()}<span>HeartFull</span>`;
    return brand;
  }

  function buildNavShell(lang, pagePath, search) {
    const nav = document.createElement('nav');
    nav.className = 'hf-site-shell';
    nav.innerHTML = '<div class="hf-site-shell-inner"><div class="hf-site-row"></div></div>';
    const row = nav.querySelector('.hf-site-row');
    row.appendChild(buildBrand(lang));
    row.appendChild(buildDesktopNav(lang, pagePath, search));
    row.appendChild(buildMobileNav(lang, pagePath, search));
    return nav;
  }

  function enhanceSiteNavigation(lang, pagePath, search) {
    const nav = document.querySelector('nav');
    const isHomeWithCustomNav = pagePath === 'index.html' && nav;
    if (isHomeWithCustomNav) return;

    if (!nav) {
      document.body.prepend(buildNavShell(lang, pagePath, search));
      return;
    }

    if (nav.classList.contains('hf-site-shell')) return;
    nav.classList.add('hf-site-shell');
    const row = nav.querySelector('.flex.justify-between.items-center') || nav.querySelector('.hf-site-row');
    if (!row) return;

    const brand = row.querySelector('a.flex.items-center, .hf-site-brand, a:first-child');
    row.replaceChildren();
    if (brand) {
      brand.classList.add('hf-site-brand');
      const brandText = brand.querySelector('span');
      if (brandText) brandText.textContent = 'HeartFull';
      row.appendChild(brand);
    } else {
      row.appendChild(buildBrand(lang));
    }
    row.classList.add('hf-site-row');
    row.appendChild(buildDesktopNav(lang, pagePath, search));
    row.appendChild(buildMobileNav(lang, pagePath, search));
  }

  function installStyles() {
    if (document.getElementById('hf-language-style')) return;
    const style = document.createElement('style');
    style.id = 'hf-language-style';
    style.textContent = `
      .hf-language-menu { position: relative; display: inline-block; z-index: 100; }
      .hf-language-menu summary {
        list-style: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.4rem 0.65rem;
        border-radius: 999px;
        border: 1px solid var(--border, #E4DDD8);
        background: var(--surface-elevated, #fff);
        color: var(--ink, #1E1916);
        font-size: 0.85rem;
        font-weight: 700;
        white-space: nowrap;
      }
      .hf-language-menu summary::-webkit-details-marker { display: none; }
      .hf-language-menu summary::after { content: "▾"; font-size: 0.7rem; opacity: 0.75; }
      .hf-language-list {
        position: absolute;
        right: 0;
        top: calc(100% + 0.5rem);
        min-width: 12.5rem;
        padding: 0.4rem;
        background: var(--surface-elevated, #fff);
        border: 1px solid var(--border, #E4DDD8);
        border-radius: 12px;
        box-shadow: 0 12px 28px rgba(30,25,22,0.14);
        display: grid;
        gap: 0.15rem;
      }
      .hf-language-list a {
        display: flex;
        align-items: center;
        gap: 0.55rem;
        padding: 0.55rem 0.7rem;
        border-radius: 8px;
        color: var(--ink-secondary, #6B5E57);
        text-decoration: none;
        white-space: nowrap;
      }
      .hf-language-list a:hover { background: var(--coral-subtle, #FFF0F2); color: var(--coral, #FF5870); text-decoration: none; }
      .hf-language-list .active { color: var(--ink, #1E1916); font-weight: 800; }
      .hf-language-floating { position: fixed; right: 1rem; top: 1rem; z-index: 90; }
      .hf-site-shell {
        background: rgba(250,247,245,0.95);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--border, #E4DDD8);
        position: sticky;
        top: 0;
        z-index: 80;
      }
      .hf-site-shell-inner {
        width: min(100% - 2rem, 72rem);
        margin: 0 auto;
      }
      .hf-site-row {
        min-height: 4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
      .hf-site-brand {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--coral, #FF5870);
        text-decoration: none;
        font-family: Fraunces, serif;
        font-size: 1.25rem;
        font-weight: 800;
        white-space: nowrap;
      }
      .hf-site-brand:hover { text-decoration: none; }
      .hf-site-brand svg { width: 2rem; height: 2rem; flex: 0 0 auto; }
      .hf-site-nav {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1.15rem;
        margin-left: auto;
      }
      .hf-site-nav > a {
        color: var(--ink-secondary, #6B5E57);
        text-decoration: none;
        font-size: 0.92rem;
        font-weight: 700;
        white-space: nowrap;
      }
      .hf-site-nav > a:hover,
      .hf-site-nav > a.active { color: var(--coral, #FF5870); text-decoration: none; }
      .hf-site-app {
        color: white !important;
        background: var(--coral, #FF5870);
        border-radius: 12px;
        padding: 0.55rem 1rem;
      }
      .hf-site-mobile { display: none; position: relative; margin-left: auto; }
      .hf-site-mobile summary {
        list-style: none;
        cursor: pointer;
        border: 1px solid var(--border, #E4DDD8);
        border-radius: 999px;
        background: var(--surface-elevated, #fff);
        color: var(--ink, #1E1916);
        font-size: 0.9rem;
        font-weight: 800;
        padding: 0.5rem 0.8rem;
      }
      .hf-site-mobile summary::-webkit-details-marker { display: none; }
      .hf-site-mobile summary::after { content: "▾"; margin-left: 0.35rem; font-size: 0.75rem; opacity: 0.75; }
      .hf-site-mobile-panel {
        position: absolute;
        right: 0;
        top: calc(100% + 0.6rem);
        width: min(18rem, calc(100vw - 2rem));
        display: grid;
        gap: 0.15rem;
        padding: 0.5rem;
        border: 1px solid var(--border, #E4DDD8);
        border-radius: 12px;
        background: var(--surface-elevated, #fff);
        box-shadow: 0 16px 40px rgba(30,25,22,0.16);
      }
      .hf-site-mobile-panel a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--ink-secondary, #6B5E57);
        text-decoration: none;
        border-radius: 8px;
        padding: 0.7rem 0.8rem;
        font-weight: 750;
      }
      .hf-site-mobile-panel a:hover,
      .hf-site-mobile-panel a.active {
        color: var(--coral, #FF5870);
        background: var(--coral-subtle, #FFF0F2);
        text-decoration: none;
      }
      .hf-site-mobile-languages {
        border-top: 1px solid var(--border, #E4DDD8);
        margin-top: 0.3rem;
        padding-top: 0.3rem;
        display: grid;
        gap: 0.15rem;
      }
      @media (max-width: 900px) {
        .hf-site-nav { display: none; }
        .hf-site-mobile { display: block; }
      }
    `;
    document.head.appendChild(style);
  }

  function replaceOldLanguageSelectors(lang, pagePath, search) {
    document.querySelectorAll('.lang-switcher, .language-menu').forEach((oldMenu) => {
      oldMenu.replaceWith(buildLanguageMenu(lang, pagePath, search));
    });
  }

  function insertMissingMenu(lang, pagePath, search) {
    if (document.querySelector('.hf-language-menu')) return;
    const navCluster = document.querySelector('nav .hidden.md\\:flex, nav .hidden.md\\:block')?.parentElement;
    if (navCluster) {
      navCluster.appendChild(buildLanguageMenu(lang, pagePath, search));
      return;
    }
    const floating = document.createElement('div');
    floating.className = 'hf-language-floating';
    floating.appendChild(buildLanguageMenu(lang, pagePath, search));
    document.body.appendChild(floating);
  }

  function closeMenusOnOutsideClick() {
    document.addEventListener('click', (event) => {
      document.querySelectorAll('.hf-language-menu[open]').forEach((menu) => {
        if (!menu.contains(event.target)) menu.removeAttribute('open');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const lang = requestedLanguage();
    const pagePath = normalizePath(window.location.pathname);
    const search = window.location.search;
    localStorage.setItem('hf_language', lang);
    installStyles();
    enhanceSiteNavigation(lang, pagePath, search);
    replaceOldLanguageSelectors(lang, pagePath, search);
    insertMissingMenu(lang, pagePath, search);
    rewriteInternalLinks(lang);
    closeMenusOnOutsideClick();
  });
})();
