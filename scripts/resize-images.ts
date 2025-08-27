import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, "..", "public", "imgs");
const destDir = path.join(srcDir, "thumbnails");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

fs.readdirSync(srcDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return; // skip non-image files

  const inputPath = path.join(srcDir, file);
  const outputPath = path.join(destDir, file);

  sharp(inputPath)
    .resize({ width: 512 })
    .toFile(outputPath)
    .then(() => console.log(`Resized ${file}`))
    .catch(err => console.error(`Error resizing ${file}:`, err));
});
