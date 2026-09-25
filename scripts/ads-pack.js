// Parses the Google Ads website-traffic pack so its destinations and copy
// can be checked by tests/google-ads-pack.test.js and check-ad-routes.js.
const fs = require('node:fs');
const path = require('node:path');

const PACK_PATH = path.join(__dirname, '..', 'docs', 'google-ads-website-traffic-pack-2026-09-23.md');

// Google Ads limits for the asset types used in the pack.
const LIMITS = { Headline: 30, Description: 90, 'Business name': 25 };

function section(markdown, heading) {
  const start = markdown.indexOf(`\n## ${heading}\n`);
  if (start === -1) throw new Error(`Pack is missing "## ${heading}"`);
  const end = markdown.indexOf('\n## ', start + 1);
  return markdown.slice(start, end === -1 ? undefined : end);
}

// Rows of the "Proposed paid-ad destination" table: [{ use, url, status }].
function destinations(markdown) {
  return section(markdown, 'Proposed paid-ad destination')
    .split('\n')
    .map((line) => line.match(/^\| ([^|]+) \| `(https:\/\/[^`]+)` \| ([^|]+) \|/))
    .filter(Boolean)
    .map(([, use, url, status]) => ({ use: use.trim(), url, status: status.trim() }));
}

// Every copy asset in "Draft ad copy": [{ text, limit, label }].
// Handles "- Headline: `x`", "- Long headline (≤90 characters): `x`", and
// bullet lists under a "(≤N characters):" heading line.
function copyAssets(markdown) {
  const assets = [];
  let listLimit = null;
  for (const line of section(markdown, 'Draft ad copy').split('\n')) {
    const inline = line.match(/^- ([^:`]+?)(?: \(≤(\d+) characters\))?: `([^`]+)`/);
    const heading = line.match(/^- [^`]*\(≤(\d+) characters\):\s*$/);
    const bullet = line.match(/^ {2}- `([^`]+)`/);
    if (inline) {
      const [, label, explicit, text] = inline;
      const limit = explicit ? Number(explicit) : LIMITS[label];
      if (!limit) throw new Error(`No character limit known for "${label}"`);
      assets.push({ text, limit, label });
      listLimit = null;
    } else if (heading) {
      listLimit = Number(heading[1]);
    } else if (bullet && listLimit) {
      assets.push({ text: bullet[1], limit: listLimit, label: `list ≤${listLimit}` });
    } else if (line.trim() && !bullet) {
      listLimit = null;
    }
  }
  return assets;
}

function readPack() {
  return fs.readFileSync(PACK_PATH, 'utf8');
}

module.exports = { PACK_PATH, readPack, destinations, copyAssets };
