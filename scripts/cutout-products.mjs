/**
 * Removes backgrounds from product photos → transparent PNGs for floating stage cards.
 */
import { removeBackground } from "@imgly/background-removal-node";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images", "cutouts");

const PRODUCTS = [
  "product-ceremonial",
  "product-daily",
  "product-latte",
  "product-kit",
];

await mkdir(outDir, { recursive: true });

for (const name of PRODUCTS) {
  const src = path.join(root, "public", "images", `${name}.webp`);
  const dest = path.join(outDir, `${name}.png`);
  console.log(`Removing background: ${name}…`);
  const input = await readFile(src);
  const blob = new Blob([input], { type: "image/webp" });
  const result = await removeBackground(blob, {
    output: { format: "image/png", quality: 1 },
  });
  const buffer = Buffer.from(await result.arrayBuffer());
  await writeFile(dest, buffer);
  console.log(`  → ${dest}`);
}

console.log("Done.");
