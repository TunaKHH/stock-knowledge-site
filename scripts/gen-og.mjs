// 產生全站預設分享圖 public/og-default.png(1200x630)。
// 用 SVG 漸層(不依賴系統字型,確保跨機器一致),交給 sharp 轉 PNG。
// 之後要換成有文字/品牌的版本,改這裡的 SVG 再 `node scripts/gen-og.mjs` 即可。
import sharp from 'sharp';

const W = 1200;
const H = 630;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1220"/>
      <stop offset="100%" stop-color="#16263f"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${W}" height="8" fill="#4f8cff"/>
  <rect x="96" y="500" width="220" height="6" rx="3" fill="#4f8cff"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og-default.png');
console.log('wrote public/og-default.png');
