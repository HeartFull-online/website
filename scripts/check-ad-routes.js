// Live, signed-out check of every destination in the Google Ads pack.
// Run on the day the destination set is frozen: npm run check:ad-routes
const { readPack, destinations } = require('./ads-pack');

// Text each page must contain (raw HTML, case-insensitive) for the pack's
// claims about it to hold. Every pack destination needs an entry here.
const MARKERS = {
  'https://heartfull.online/': [/<title>HeartFull/i],
  'https://heartfull.online/advertising-standards/': [/aged 18 and over/i, /report and block/i],
  'https://heartfull.online/terms/': [/at least 18/i],
  'https://heartfull.online/privacy/': [/18 and over/i],
  'https://heartfull.online/child-safety/': [/18 and older/i, /report/i, /block/i],
  'https://heartfull.online/delete-account/': [/delete/i],
  'https://about.heartfull.online/advertising-standards.html': [/aged 18 and over/i, /href="\/support\.html"/],
  'https://about.heartfull.online/support.html': [/How do I report a user/, /How do I block someone/],
};

async function check({ url }) {
  const markers = MARKERS[url];
  if (!markers) return { url, ok: false, detail: 'no markers defined in scripts/check-ad-routes.js' };
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'cache-control': 'no-cache' } });
    const html = await res.text();
    const missing = markers.filter((m) => !m.test(html)).map(String);
    const ok = res.status === 200 && missing.length === 0;
    const detail = [`HTTP ${res.status}`, res.url !== url && `→ ${res.url}`, missing.length && `missing ${missing.join(', ')}`]
      .filter(Boolean)
      .join(' ');
    return { url, ok, detail };
  } catch (err) {
    return { url, ok: false, detail: err.message };
  }
}

async function main() {
  const results = await Promise.all(destinations(readPack()).map(check));
  for (const r of results) console.log(`  ${r.ok ? '✓' : '✗'} ${r.url} — ${r.detail}`);
  const failed = results.filter((r) => !r.ok).length;
  console.log(failed ? `\n✗ ${failed} of ${results.length} destinations failed` : `\n✓ All ${results.length} destinations passed (${new Date().toISOString()})`);
  process.exitCode = failed ? 1 : 0;
}

if (require.main === module) main();

module.exports = { MARKERS };
