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

test('no link wraps a button (interactive content inside an anchor)', () => {
  for (const { file, html } of pages) {
    for (const [anchor] of html.matchAll(/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<\/a>/g)) {
      assert.doesNotMatch(anchor, /<button\b/, `${file}: ${anchor.slice(0, 160)}`);
    }
  }
});

test('every page has a meta description', () => {
  for (const { file, html } of pages) {
    assert.match(html, /<meta name="description" content="[^"]+"/, file);
  }
});

test('every page has a canonical link to its own URL', () => {
  const base = 'https://about.heartfull.online';
  for (const { file, html } of pages) {
    const match = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.ok(match, `${file} has no canonical link`);
    // index.html -> /, dir/index.html -> /dir/, anything else keeps its file name.
    const expected = file === 'index.html'
      ? `${base}/`
      : file.endsWith('/index.html') ? `${base}/${file.slice(0, -'index.html'.length)}` : `${base}/${file}`;
    assert.equal(match[1], expected, file);
  }
});

test('every page has an og:image share image', () => {
  for (const { file, html } of pages) {
    assert.match(html, /<meta property="og:image" content="https:\/\/[^"]+"/, file);
  }
});

test('home page local images declare intrinsic dimensions', () => {
  const { html } = pages.find(({ file }) => file === 'index.html');
  for (const [tag] of html.matchAll(/<img\b[^>]*src="illustrations\/[^"]+"[^>]*>/g)) {
    assert.match(tag, /width="\d+"/, tag);
    assert.match(tag, /height="\d+"/, tag);
  }
});
