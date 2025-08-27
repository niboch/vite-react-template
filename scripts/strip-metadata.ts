import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, "..", "public", "imgs");
const destDir = path.join(srcDir, "stripped");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

fs.readdirSync(srcDir).forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return; // skip non-image files

    const inputPath = path.join(srcDir, file);
    const outputPath = path.join(destDir, file);

    sharp(inputPath)
        .toBuffer()
        .then(buffer => sharp(buffer).toFile(outputPath))
        .then(() => console.log(`Stripped metadata from ${file}`))
        .catch(err => console.error(`Error processing ${file}:`, err));
});
