#!/bin/bash
# HeartFull website pre-publish checks
# Run: npm test  or  bash scripts/check.sh

set -e
cd "$(dirname "$0")/.."

ERRORS=0
WARNINGS=0

echo "============================================"
echo "  HeartFull Website — Pre-Publish Checks"
echo "============================================"
echo ""

# 1. HTML Validation
echo "--- HTML Validation ---"
if npx html-validate "*.html" "dating-institute/*.html" 2>&1; then
  echo "✓ HTML valid"
else
  echo "✗ HTML validation failed"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# 2. Check for broken internal links
echo "--- Internal Link Check ---"
BROKEN_LINKS=0
for file in *.html dating-institute/*.html; do
  # Extract href values that are internal (not http/mailto/tel/#)
  hrefs=$(grep -oP 'href="(?!https?://|mailto:|tel:|#|javascript:)[^"]*"' "$file" 2>/dev/null | sed 's/href="//;s/"$//' || true)
  for href in $hrefs; do
    # Strip query params and anchors for file check
    target=$(echo "$href" | sed 's/[?#].*//')
    # Resolve relative paths
    dir=$(dirname "$file")
    if [ "$dir" = "." ]; then
      resolved="$target"
    else
      resolved="$dir/$target"
    fi
    # Check if target exists (allow directory paths ending in /)
    if [ ! -f "$resolved" ] && [ ! -f "${resolved}index.html" ] && [ ! -d "${resolved%/}" ]; then
      echo "  ✗ $file → $href (not found: $resolved)"
      BROKEN_LINKS=$((BROKEN_LINKS + 1))
    fi
  done
done
if [ $BROKEN_LINKS -eq 0 ]; then
  echo "  ✓ All internal links valid"
else
  echo "  ✗ $BROKEN_LINKS broken links found"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# 3. Div balance check for index.html (prevent carousel-breaking bugs)
echo "--- Div Balance Check (index.html) ---"
OPENS=$(grep -c '<div' index.html)
CLOSES=$(grep -c '</div>' index.html)
if [ "$OPENS" -eq "$CLOSES" ]; then
  echo "  ✓ Div tags balanced ($OPENS opens, $CLOSES closes)"
else
  echo "  ✗ Div tag mismatch: $OPENS opens, $CLOSES closes (diff: $((OPENS - CLOSES)))"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# 4. Check Tailwind CSS is up to date
echo "--- Tailwind CSS Check ---"
CURRENT_HASH=$(md5 -q style.css 2>/dev/null || md5sum style.css | cut -d' ' -f1)
npx tailwindcss -i src/input.css -o /tmp/heartfull-tw-check.css --minify 2>/dev/null
NEW_HASH=$(md5 -q /tmp/heartfull-tw-check.css 2>/dev/null || md5sum /tmp/heartfull-tw-check.css | cut -d' ' -f1)
rm -f /tmp/heartfull-tw-check.css
if [ "$CURRENT_HASH" = "$NEW_HASH" ]; then
  echo "  ✓ style.css is up to date"
else
  echo "  ✗ style.css is stale — run: npx tailwindcss -i src/input.css -o style.css --minify"
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

# 5. Asset size check
echo "--- Asset Size Check ---"
MAX_IMG_KB=500
for img in *.png *.jpg *.svg; do
  [ -f "$img" ] || continue
  SIZE_KB=$(( $(wc -c < "$img") / 1024 ))
  if [ $SIZE_KB -gt $MAX_IMG_KB ]; then
    echo "  ⚠ $img is ${SIZE_KB}KB (max ${MAX_IMG_KB}KB)"
    WARNINGS=$((WARNINGS + 1))
  fi
done
INDEX_KB=$(( $(wc -c < index.html) / 1024 ))
if [ $INDEX_KB -gt 200 ]; then
  echo "  ⚠ index.html is ${INDEX_KB}KB (consider splitting if >200KB)"
  WARNINGS=$((WARNINGS + 1))
fi
echo "  ✓ Asset check done"
echo ""

# 6. Check for common content issues
echo "--- Content Checks ---"
if grep -q 'free forever' index.html; then
  echo "  ⚠ Found 'free forever' — should be 'connections never paywalled'"
  WARNINGS=$((WARNINGS + 1))
fi
if grep -q '100% free' index.html; then
  echo "  ⚠ Found '100% free' — messaging has changed"
  WARNINGS=$((WARNINGS + 1))
fi
if grep -q '/research/' index.html; then
  echo "  ✗ Found '/research/' link — should be '/dating-institute/'"
  ERRORS=$((ERRORS + 1))
fi
echo "  ✓ Content checks done"
echo ""

# Summary
echo "============================================"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo "  ✅ All checks passed — safe to publish"
elif [ $ERRORS -eq 0 ]; then
  echo "  ⚠️  $WARNINGS warnings — review before publishing"
else
  echo "  ❌ $ERRORS errors, $WARNINGS warnings — DO NOT publish"
  exit 1
fi
echo "============================================"
