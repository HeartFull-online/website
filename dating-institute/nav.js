/**
 * Dating Institute — Shared Navigation
 *
 * Single source of truth for the nav across all institute pages.
 * Include this script on every page:
 *   <script src="/dating-institute/nav.js"></script>
 *
 * The script:
 * 1. Replaces <nav> content with the canonical navigation
 * 2. Adjusts relative paths based on page depth
 * 3. Highlights the active category tab
 * 4. Auto-scrolls the active tab into view on mobile
 */
(function () {
  var depth = 0;
  var path = location.pathname;

  // Determine depth relative to /dating-institute/
  if (path.includes('/countries/') || path.includes('/advice/')) {
    depth = 1;
  }

  var prefix = depth === 1 ? '../' : '';
  var rootPrefix = depth === 1 ? '../../' : '../';

  // Category tabs
  var tabs = [
    { label: 'Apps', href: prefix + 'app-directory.html' },
    { label: 'Industry', href: prefix + 'industry-critique.html' },
    { label: 'Pricing', href: prefix + 'competitor-pricing.html' },
    { label: 'By Country', href: prefix + 'countries/' },
    { label: 'Advice', href: prefix + 'advice/' },
    { label: 'Community', href: prefix + 'community.html' },
  ];

  // Build tabs HTML
  var tabsHtml = tabs.map(function (t) {
    return '<a href="' + t.href + '" class="di-cat">' + t.label + '</a>';
  }).join('\n                ');

  // Heart SVG
  var heartSvg = '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:28px;height:28px;">' +
    '<defs><linearGradient id="hf-n" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0%" stop-color="#FF5870"/><stop offset="100%" stop-color="#FF8A9A"/>' +
    '</linearGradient></defs>' +
    '<path d="M16 28C15.6 27.6 3 18.8 3 11C3 6.6 6.2 3 10.2 3C12.7 3 14.9 4.3 16 6.3C17.1 4.3 19.3 3 21.8 3C25.8 3 29 6.6 29 11C29 18.8 16.4 27.6 16 28Z" fill="url(#hf-n)"/></svg>';

  // Full nav HTML
  var navHtml = '<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">' +
    '<div class="flex justify-between items-center py-3">' +
    '<a href="/dating-institute/" class="flex items-center space-x-2" style="text-decoration:none;">' +
    heartSvg +
    '<span class="text-lg font-bold" style="font-family:\'Fraunces\',serif; color:var(--coral);">Dating Institute</span>' +
    '</a>' +
    '<a href="/" class="text-sm font-medium" style="color:var(--ink-tertiary); text-decoration:none;">heartfull.online</a>' +
    '</div>' +
    '<div style="display:flex; gap:4px; padding-bottom:8px; overflow-x:auto; -webkit-overflow-scrolling:touch;" class="di-cats">' +
    tabsHtml +
    '</div></div>';

  // Replace nav content
  var nav = document.querySelector('nav');
  if (nav) {
    nav.innerHTML = navHtml;
  }

  // Highlight active tab + auto-scroll
  document.querySelectorAll('.di-cat').forEach(function (a) {
    var href = a.getAttribute('href');
    // Match: exact file match OR directory match
    if (path.endsWith(href) ||
        (href.endsWith('/') && path.includes(href.replace('../', '').replace('./', '')))) {
      a.style.background = 'var(--coral)';
      a.style.color = 'white';
      a.style.fontWeight = '600';
      setTimeout(function() {
        a.scrollIntoView({ inline: 'center', block: 'nearest' });
      }, 50);
    }
  });
})();
