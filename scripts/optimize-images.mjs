import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const IMAGES_DIR = join(import.meta.dirname, "../src/assets/images");
const MAX_WIDTH = 800;
const QUALITY = 80;

const files = (await readdir(IMAGES_DIR)).filter((f) => f.endsWith(".jpg"));

console.log(`Optimizing ${files.length} images (max ${MAX_WIDTH}px, quality ${QUALITY})…\n`);

for (const file of files) {
  const filePath = join(IMAGES_DIR, file);
  const originalSize = (await stat(filePath)).size;
  const buffer = await sharp(filePath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY })
    .toBuffer();

  await sharp(buffer).toFile(filePath);

  const saved = originalSize - buffer.length;
  const pct = ((saved / originalSize) * 100).toFixed(1);
  console.log(
    `  ${file}: ${(originalSize / 1024).toFixed(0)}KB → ${(buffer.length / 1024).toFixed(0)}KB (−${pct}%)`
  );
}

console.log("\nDone.");
