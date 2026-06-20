(function () {
  const languages = {
    en: { flag: '🇺🇸', name: 'English', dir: '' },
    es: { flag: '🇪🇸', name: 'Español', dir: 'es' },
    zh: { flag: '🇨🇳', name: '中文', dir: 'zh' },
    ar: { flag: '🇸🇦', name: 'العربية', dir: 'ar' },
    vi: { flag: '🇻🇳', name: 'Tiếng Việt', dir: 'vi' },
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
    replaceOldLanguageSelectors(lang, pagePath, search);
    insertMissingMenu(lang, pagePath, search);
    rewriteInternalLinks(lang);
    closeMenusOnOutsideClick();
  });
})();
