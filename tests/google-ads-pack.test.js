const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const { readPack, destinations, copyAssets } = require('../scripts/ads-pack');
const { MARKERS } = require('../scripts/check-ad-routes');

const pack = readPack();
const read = (file) => fs.readFileSync(file, 'utf8');

// Dating aggregator/comparison content and the marketing home page (which
// links to it) must never be a General Dating ad destination.
const EXCLUDED = [/\/dating-institute\//, /\/compare\//, /\/why-heartfull/, /^https:\/\/about\.heartfull\.online\/?$/];

test('pack lists destinations only on HeartFull domains, excluding aggregator pages', () => {
  const rows = destinations(pack);
  assert.ok(rows.length >= 6, `expected the destination table to parse, got ${rows.length} rows`);
  for (const { url } of rows) {
    assert.match(url, /^https:\/\/(about\.)?heartfull\.online\//, url);
    for (const pattern of EXCLUDED) assert.doesNotMatch(url, pattern, `${url} is an excluded destination`);
  }
});

test('marketing-site destinations exist in this repository', () => {
  for (const { url } of destinations(pack)) {
    if (!url.startsWith('https://about.heartfull.online/')) continue;
    const file = url.replace('https://about.heartfull.online/', '');
    assert.ok(fs.existsSync(file), `${url} has no ${file}`);
  }
});

test('every pack destination has a live route check', () => {
  for (const { url } of destinations(pack)) assert.ok(MARKERS[url], `add ${url} to MARKERS in scripts/check-ad-routes.js`);
});

test('ad copy fits Google Ads character limits', () => {
  const assets = copyAssets(pack);
  assert.ok(assets.filter((a) => a.limit === 30).length >= 9, 'expected search and display headlines to parse');
  assert.ok(assets.filter((a) => a.limit === 90).length >= 6, 'expected descriptions and long headline to parse');
  for (const { text, limit } of assets) assert.ok(text.length <= limit, `${text.length}/${limit}: ${text}`);
});

test('ad copy avoids outcome, compensated, and sexual framing', () => {
  const banned = /\b(guarantee\w*|match(es)?|sugar|escort\w*|hook ?ups?|sex\w*|hot|singles near|free forever|100% free)\b/i;
  for (const { text } of copyAssets(pack)) assert.doesNotMatch(text, banned, text);
});

test('readiness doc links the traffic pack', () => {
  assert.match(read('docs/google-ads-certification-readiness-2026-09-22.md'), /\(google-ads-website-traffic-pack-2026-09-23\.md\)/);
});

test('policy, support, and standards pages stay discoverable', () => {
  const links = {
    'index.html': ['/privacy.html', '/terms.html', '/advertising-standards.html', '/support.html'],
    'zh/index.html': ['/privacy.html', '/terms.html', '/advertising-standards.html', '/support.html'],
    'advertising-standards.html': ['/support.html', '/terms.html', '/privacy.html', 'https://heartfull.online/child-safety/'],
    'support.html': ['/advertising-standards.html', '/privacy.html', '/terms.html', 'https://heartfull.online/delete-account/'],
  };
  for (const [file, hrefs] of Object.entries(links)) {
    const html = read(file);
    for (const href of hrefs) assert.ok(html.includes(`href="${href}"`), `${file} must link ${href}`);
  }
});

test('privacy pages describe sign-in and messaging accurately', () => {
  const stale = /for verification|para verificación|للتحقق|用于验证|&#273;&#7875; x&#225;c minh|your matches|tus matches|匹配对象|من تتطابق/;
  for (const lang of ['', 'es/', 'ar/', 'vi/', 'zh/']) assert.doesNotMatch(read(`${lang}privacy.html`), stale, `${lang}privacy.html`);
  assert.match(read('support.html'), /How do I block someone\?/);
});
