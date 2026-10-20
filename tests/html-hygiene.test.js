const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const ROOT = path.join(__dirname, '..');
const SKIP = new Set(['node_modules', '.git']);

function htmlFiles(dir = ROOT) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (SKIP.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

const pages = htmlFiles().map((file) => ({ file: path.relative(ROOT, file), html: fs.readFileSync(file, 'utf8') }));

test('external links that open a new tab do not expose window.opener', () => {
  for (const { file, html } of pages) {
    for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
      assert.match(tag, /rel="[^"]*noopener/, `${file}: ${tag}`);
    }
  }
});

test('every page has a meta description', () => {
  for (const { file, html } of pages) {
    assert.match(html, /<meta name="description" content="[^"]+"/, file);
  }
});

test('home page local images declare intrinsic dimensions', () => {
  const { html } = pages.find(({ file }) => file === 'index.html');
  for (const [tag] of html.matchAll(/<img\b[^>]*src="illustrations\/[^"]+"[^>]*>/g)) {
    assert.match(tag, /width="\d+"/, tag);
    assert.match(tag, /height="\d+"/, tag);
  }
});
