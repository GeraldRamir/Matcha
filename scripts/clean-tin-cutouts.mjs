/**
 * Isolate Solae tin only: rembg + vertical cylinder mask around the green label.
 * Keeps silver lid above the label; drops strainer/scoop/grass beside/behind.
 */
import { removeBackground } from "@imgly/background-removal-node";
import { readdir, mkdir, readFile, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require(
  require.resolve("sharp", { paths: ["node_modules/@imgly/background-removal-node"] })
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const SRC_DIR = path.join(root, "public", "images", "Productos");
const OUT_DIR = path.join(root, "public", "images", "cutouts", "solae-ceremonial-clean");
const SKIP = new Set(["WhatsApp Image 2026-07-21 at 3.00.58 PM.jpeg"]);

function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : d / max, v: max };
}

function isLabelGreen(r, g, b, a) {
  if (a < 50) return false;
  const { h, s, v } = rgbToHsv(r, g, b);
  return h >= 95 && h <= 170 && s >= 0.22 && v >= 0.1 && v <= 0.52;
}

function isBambooOrWood(r, g, b, a) {
  if (a < 40) return false;
  const { h, s, v } = rgbToHsv(r, g, b);
  return h >= 18 && h <= 52 && s >= 0.22 && v >= 0.38 && r > g + 8;
}

function isBrightGrass(r, g, b, a) {
  if (a < 40) return false;
  const { h, s, v } = rgbToHsv(r, g, b);
  return h >= 75 && h <= 145 && s >= 0.3 && v >= 0.38 && g > r + 20;
}

function cleanRgba(data, w, h) {
  const src = new Uint8ClampedArray(data);
  const n = w * h;

  let minX = w,
    minY = h,
    maxX = 0,
    maxY = 0,
    count = 0,
    sumX = 0;

  for (let i = 0; i < n; i++) {
    const o = i * 4;
    if (!isLabelGreen(src[o], src[o + 1], src[o + 2], src[o + 3])) continue;
    const x = i % w;
    const y = (i / w) | 0;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    sumX += x;
    count++;
  }

  if (count < 60) {
    // opaque fallback bbox
    minX = w;
    minY = h;
    maxX = 0;
    maxY = 0;
    count = 0;
    sumX = 0;
    for (let i = 0; i < n; i++) {
      if (src[i * 4 + 3] < 100) continue;
      const x = i % w;
      const y = (i / w) | 0;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      sumX += x;
      count++;
    }
  }

  if (!count) return Buffer.from(src);

  const labelW = Math.max(1, maxX - minX);
  const labelH = Math.max(1, maxY - minY);
  const cx = sumX / count;
  const halfW = labelW * 0.56;
  const top = minY - labelH * 0.72; // silver lid
  const bottom = maxY + labelH * 0.18;

  const out = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) {
    const o = i * 4;
    const r = src[o];
    const g = src[o + 1];
    const b = src[o + 2];
    const a = src[o + 3];
    out[o] = r;
    out[o + 1] = g;
    out[o + 2] = b;

    if (a < 18) {
      out[o + 3] = 0;
      continue;
    }

    const x = i % w;
    const y = (i / w) | 0;
    const inTin =
      Math.abs(x - cx) <= halfW && y >= top && y <= bottom;

    if (!inTin || isBambooOrWood(r, g, b, a) || isBrightGrass(r, g, b, a)) {
      out[o + 3] = 0;
      continue;
    }

    // Keep rembg coverage; force solid alpha when present
    out[o + 3] = a > 40 ? 255 : 0;
  }

  return out;
}

async function processOne(file, index) {
  const inputPath = path.join(SRC_DIR, file);
  const outName = `view-${String(index + 1).padStart(2, "0")}.png`;
  const outPath = path.join(OUT_DIR, outName);
  const tmpPath = path.join(OUT_DIR, `${outName}.tmp.png`);

  console.log(`Processing ${file} → ${outName}…`);
  const input = await readFile(inputPath);

  const prepped = await sharp(input)
    .rotate()
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: false })
    .jpeg({ quality: 96 })
    .toBuffer();

  const result = await removeBackground(new Blob([prepped], { type: "image/jpeg" }), {
    output: { format: "image/png", quality: 1 },
  });
  const rembgBuf = Buffer.from(await result.arrayBuffer());

  const { data, info } = await sharp(rembgBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cleaned = cleanRgba(data, info.width, info.height);

  await sharp(cleaned, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 0 })
    .png()
    .toFile(tmpPath);

  const meta = await sharp(tmpPath).metadata();
  const side = Math.max(meta.width ?? 1, meta.height ?? 1, 1000);
  const padX = Math.max(0, Math.floor((side - (meta.width ?? 0)) / 2));
  const padY = Math.max(0, Math.floor((side - (meta.height ?? 0)) / 2));

  await sharp(tmpPath)
    .extend({
      top: padY,
      bottom: side - (meta.height ?? 0) - padY,
      left: padX,
      right: side - (meta.width ?? 0) - padX,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(1100, 1100)
    .png({ compressionLevel: 8 })
    .toFile(outPath);

  await unlink(tmpPath).catch(() => {});
  console.log(`  ✓ ${outName} (${meta.width}×${meta.height} → 1100²)`);
  return `/images/cutouts/solae-ceremonial-clean/${outName}`;
}

const files = (await readdir(SRC_DIR))
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !SKIP.has(f))
  .sort();

console.log(`Found ${files.length} product images.`);
await mkdir(OUT_DIR, { recursive: true });

const paths = [];
for (let i = 0; i < files.length; i++) {
  try {
    paths.push(await processOne(files[i], i));
  } catch (err) {
    console.error(`  ✗ ${files[i]}:`, err.message ?? err);
  }
}

console.log("\nDone.");
console.log(JSON.stringify(paths, null, 2));
