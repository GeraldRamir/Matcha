/**
 * Removes backgrounds from Productos folder → transparent PNGs for gallery.
 * Skips non-product files (e.g. bank receipts).
 */
import { removeBackground } from "@imgly/background-removal-node";
import { readdir, mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const SRC_DIR = path.join(root, "public", "images", "Productos");
const OUT_DIR = path.join(root, "public", "images", "cutouts", "solae-ceremonial");

const SKIP = new Set(["WhatsApp Image 2026-07-21 at 3.00.58 PM.jpeg"]);

async function processOne(file, index) {
  const inputPath = path.join(SRC_DIR, file);
  const outName = `view-${String(index + 1).padStart(2, "0")}.png`;
  const outPath = path.join(OUT_DIR, outName);

  console.log(`Processing ${file} → ${outName}…`);
  const input = await readFile(inputPath);
  const blob = new Blob([input], { type: "image/jpeg" });
  const result = await removeBackground(blob, {
    output: { format: "image/png", quality: 1 },
  });
  const buffer = Buffer.from(await result.arrayBuffer());
  await writeFile(outPath, buffer);
  console.log(`  ✓ ${outName}`);
  return `/images/cutouts/solae-ceremonial/${outName}`;
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

console.log("\nDone. Paths:");
console.log(JSON.stringify(paths, null, 2));
