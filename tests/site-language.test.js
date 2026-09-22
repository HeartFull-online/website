const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

function languageHelpers() {
  const source = fs.readFileSync('site-language-v1.js', 'utf8').replace(
    /\n\}\)\(\);\s*$/,
    '\n  globalThis.__siteLanguageTest = { normalizePath, localizedHref };\n})();\n',
  );
  const context = {
    URLSearchParams,
    window: { location: { pathname: '/', search: '' }, localStorage: { getItem() {} } },
    document: { addEventListener() {} },
  };
  context.globalThis = context;
  vm.runInNewContext(source, context);
  return context.__siteLanguageTest;
}

const { normalizePath, localizedHref } = languageHelpers();

test('language links preserve extensionless translated pages', () => {
  assert.equal(normalizePath('/promoters'), 'promoters.html');
  assert.equal(localizedHref('es', normalizePath('/promoters'), '', ''), '/es/promoters.html');
  assert.equal(normalizePath('/es/promoters'), 'promoters.html');
  assert.equal(localizedHref('en', normalizePath('/es/promoters'), '', ''), '/promoters.html');
});

test('language links preserve untranslated extensionless routes', () => {
  const pagePath = normalizePath('/compare/tinder');
  assert.equal(pagePath, 'compare/tinder');
  assert.equal(localizedHref('vi', pagePath, '#pricing', '?source=nav'), '/compare/tinder?source=nav&lang=vi#pricing');
});
