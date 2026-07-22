/**
 * Process the 4 unique product angles (individual uploads) → transparent PNGs.
 * Skips the duplicate front; crops the better base from the double-base sheet.
 */
import { removeBackground } from "@imgly/background-removal-node";
import { mkdir, readdir, unlink } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require(
  require.resolve("sharp", { paths: ["node_modules/@imgly/background-removal-node"] })
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const ASSETS = path.join(
  root,
  "..",
  ".cursor",
  "projects",
  "c-Users-Gerald-Luciano-Tienda-de-matcha",
  "assets"
);
const OUT_DIR = path.join(root, "public", "images", "cutouts", "solae-ceremonial");
const PREFIX =
  "c__Users_Gerald_Luciano_AppData_Roaming_Cursor_User_workspaceStorage_2589bc60a2e7900e4c344c73fcd320cb_images_";

const JOBS = [
  {
    out: "view-01.png",
    file: `${PREFIX}image-80250ae7-fb3b-497b-bc6b-3df3f7a2c0a8.png`,
    label: "frente",
  },
  {
    out: "view-02.png",
    file: `${PREFIX}image-023b3d77-8a97-48e2-b652-6c82dc45b27e.png`,
    label: "¾ superior",
  },
  {
    out: "view-03.png",
    file: `${PREFIX}image-1a66c9b0-7125-4cb0-8342-babaefd9421e.png`,
    label: "lateral",
  },
  {
    out: "view-04.png",
    file: `${PREFIX}image-e6b54537-838d-4666-a2fa-b6bd5fb18225.png`,
    label: "base",
    // Sheet has two bases stacked — take the upper half
    cropTopHalf: true,
  },
];

async function toCutout(inputBuf, outPath) {
  const up = await sharp(inputBuf)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: false })
    .png()
    .toBuffer();

  const result = await removeBackground(new Blob([up], { type: "image/png" }), {
    output: { format: "image/png", quality: 1 },
  });
  const cut = Buffer.from(await result.arrayBuffer());

  const tmp = outPath + ".tmp.png";
  await sharp(cut)
    .trim({ threshold: 12 })
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
    .toFile(outPath);
  await unlink(tmp);
}

await mkdir(OUT_DIR, { recursive: true });
for (const f of await readdir(OUT_DIR)) {
  if (/\.(png|jpe?g|webp)$/i.test(f)) await unlink(path.join(OUT_DIR, f));
}

for (const job of JOBS) {
  console.log(`${job.label} → ${job.out}`);
  const src = path.join(ASSETS, job.file);
  let buf;
  if (job.cropTopHalf) {
    const meta = await sharp(src).metadata();
    const w = meta.width ?? 575;
    const h = meta.height ?? 1024;
    buf = await sharp(src)
      .extract({ left: 0, top: 0, width: w, height: Math.floor(h * 0.55) })
      .png()
      .toBuffer();
  } else {
    buf = await sharp(src).png().toBuffer();
  }
  await toCutout(buf, path.join(OUT_DIR, job.out));
  console.log(`  ✓`);
}

console.log("Done. 4 carousel angles ready.");
