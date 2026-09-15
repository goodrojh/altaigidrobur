import sharp from 'sharp';
import fs from 'fs';
const dir = 'public/media';
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.png')) continue;
  const name = f.replace('.png','');
  const img = sharp(`${dir}/${f}`);
  const meta = await img.metadata();
  const w = Math.min(meta.width, 1920);
  await img.resize({ width: w }).webp({ quality: 82 }).toFile(`${dir}/${name}.webp`);
  fs.unlinkSync(`${dir}/${f}`);
  console.log(name, meta.width, meta.height);
}
