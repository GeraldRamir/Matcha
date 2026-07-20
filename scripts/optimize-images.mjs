import sharp from "sharp";
import { readdir, unlink } from "node:fs/promises";
import path from "node:path";

const dir = path.resolve("public/images");
const widths = { hero: 1920, product: 1200, gallery: 1400 };

const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const prefix = file.split("-")[0];
  const width = widths[prefix] ?? 1400;
  const out = path.join(dir, file.replace(/\.png$/, ".webp"));
  const info = await sharp(path.join(dir, file))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  console.log(`${file} -> ${path.basename(out)} (${Math.round(info.size / 1024)} KB)`);
  await unlink(path.join(dir, file));
}
