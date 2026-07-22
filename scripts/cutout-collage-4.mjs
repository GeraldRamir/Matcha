/**
 * Split the 2×2 product collage → 4 transparent cutouts for the carousel.
 */
import { removeBackground } from "@imgly/background-removal-node";
import { mkdir, readdir, unlink, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require(
  require.resolve("sharp", { paths: ["node_modules/@imgly/background-removal-node"] })
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const COLLAGE = path.join(
  root,
  "..",
  ".cursor",
  "projects",
  "c-Users-Gerald-Luciano-Tienda-de-matcha",
  "assets",
  "c__Users_Gerald_Luciano_AppData_Roaming_Cursor_User_workspaceStorage_2589bc60a2e7900e4c344c73fcd320cb_images_image-f438e372-89df-4371-b61d-bed85c246d82.png"
);
const OUT_DIR = path.join(root, "public", "images", "cutouts", "solae-ceremonial");

await mkdir(OUT_DIR, { recursive: true });

// Clear previous cutouts
for (const f of await readdir(OUT_DIR)) {
  if (/\.(png|jpe?g|webp)$/i.test(f)) {
    await unlink(path.join(OUT_DIR, f));
  }
}

const meta = await sharp(COLLAGE).metadata();
const W = meta.width ?? 575;
const H = meta.height ?? 1024;
const cellW = Math.floor(W / 2);
const cellH = Math.floor(H / 2);

const cells = [
  { name: "view-01.png", left: 0, top: 0 }, // front
  { name: "view-02.png", left: cellW, top: 0 }, // 3/4 high
  { name: "view-03.png", left: 0, top: cellH }, // side script
  { name: "view-04.png", left: cellW, top: cellH }, // base
];

console.log(`Collage ${W}×${H} → cells ${cellW}×${cellH}`);

for (const cell of cells) {
  console.log(`Extracting ${cell.name}…`);
  const crop = await sharp(COLLAGE)
    .extract({
      left: cell.left,
      top: cell.top,
      width: cellW,
      height: cellH,
    })
    .png()
    .toBuffer();

  // Upscale for cleaner rembg edges
  const up = await sharp(crop)
    .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: false })
    .png()
    .toBuffer();

  const result = await removeBackground(new Blob([up], { type: "image/png" }), {
    output: { format: "image/png", quality: 1 },
  });
  const cut = Buffer.from(await result.arrayBuffer());

  const tmp = path.join(OUT_DIR, `${cell.name}.tmp.png`);
  await sharp(cut)
    .trim({ threshold: 10 })
    .resize({
      width: 1000,
      height: 1000,
      fit: "inside",
      withoutEnlargement: false,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(tmp);

  const m = await sharp(tmp).metadata();
  const side = 1200;
  const padX = Math.max(0, Math.floor((side - (m.width ?? 0)) / 2));
  const padY = Math.max(0, Math.floor((side - (m.height ?? 0)) / 2));
  await sharp(tmp)
    .extend({
      top: padY,
      bottom: side - (m.height ?? 0) - padY,
      left: padX,
      right: side - (m.width ?? 0) - padX,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 8 })
    .toFile(path.join(OUT_DIR, cell.name));
  await unlink(tmp);
  console.log(`  ✓ ${cell.name}`);
}

console.log("Done. 4 angles ready.");
