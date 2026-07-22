/**
 * Remove backgrounds from generated studio tin renders → transparent PNGs.
 */
import { removeBackground } from "@imgly/background-removal-node";
import { mkdir, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require(
  require.resolve("sharp", { paths: ["node_modules/@imgly/background-removal-node"] })
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const SRC_DIR = path.join(
  root,
  "..",
  ".cursor",
  "projects",
  "c-Users-Gerald-Luciano-Tienda-de-matcha",
  "assets"
);
const OUT_DIR = path.join(root, "public", "images", "cutouts", "solae-ceremonial");

const ORDER = [
  "solae-tin-front.png",
  "solae-tin-hero.png",
  "solae-tin-angle-left.png",
  "solae-tin-angle-right.png",
  "solae-tin-high.png",
  "solae-tin-side.png",
  "solae-tin-profile.png",
];

await mkdir(OUT_DIR, { recursive: true });

const available = new Set(await readdir(SRC_DIR));
const files = ORDER.filter((f) => available.has(f));
console.log(`Processing ${files.length} studio renders…`);

const paths = [];
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const outName = `view-${String(i + 1).padStart(2, "0")}.png`;
  const outPath = path.join(OUT_DIR, outName);
  console.log(`${file} → ${outName}`);

  const input = await readFile(path.join(SRC_DIR, file));
  const result = await removeBackground(new Blob([input], { type: "image/png" }), {
    output: { format: "image/png", quality: 1 },
  });
  const buf = Buffer.from(await result.arrayBuffer());

  await sharp(buf)
    .trim({ threshold: 8 })
    .resize({
      width: 1200,
      height: 1200,
      fit: "inside",
      withoutEnlargement: false,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(outPath + ".tmp");

  const meta = await sharp(outPath + ".tmp").metadata();
  const side = 1200;
  const padX = Math.max(0, Math.floor((side - (meta.width ?? 0)) / 2));
  const padY = Math.max(0, Math.floor((side - (meta.height ?? 0)) / 2));
  await sharp(outPath + ".tmp")
    .extend({
      top: padY,
      bottom: side - (meta.height ?? 0) - padY,
      left: padX,
      right: side - (meta.width ?? 0) - padX,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 8 })
    .toFile(outPath);

  await import("node:fs/promises").then((fs) => fs.unlink(outPath + ".tmp"));
  paths.push(`/images/cutouts/solae-ceremonial/${outName}`);
  console.log(`  ✓`);
}

console.log("Done.", paths);
