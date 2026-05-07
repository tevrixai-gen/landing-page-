import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public');

const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_HEIGHT = 340;
const BG_COLOR = '#0a0a0a';

async function generate() {
  const logoBuffer = await sharp(resolve(publicDir, 'logo.png'))
    .resize({ height: LOGO_HEIGHT, fit: 'inside' })
    .flatten({ background: BG_COLOR })
    .toBuffer();
  const { width: logoW, height: logoH } = await sharp(logoBuffer).metadata();

  const left = Math.round((WIDTH - logoW) / 2);
  const top = Math.round((HEIGHT - logoH) / 2);

  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 3,
      background: BG_COLOR,
    },
  })
    .composite([{ input: logoBuffer, left, top }])
    .png()
    .toFile(resolve(publicDir, 'og-image.png'));

  console.log('  ✓ og-image.png  (1200×630)');
}

generate().catch((err) => {
  console.error('og-image generation failed:', err.message);
  process.exit(1);
});
