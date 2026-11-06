import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

function createPng(width, height, isMaskable = false) {
  // RGBA buffer: for each scanline: 1 byte filter type (0) + width * 4 bytes
  const rowLength = 1 + width * 4;
  const rawData = Buffer.alloc(rowLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const maxR = width / 2;
  // If maskable, icon must stay within 80% circle (10-15% margin)
  const scale = isMaskable ? 0.72 : 0.88;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLength;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;

      // Distance from center
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Base background: #071525 (R: 7, G: 21, B: 37)
      let r = 7;
      let g = 21;
      let b = 37;
      let a = 255;

      // Subtle radial glow from center #0B2A4A
      const glowFactor = Math.max(0, 1 - dist / (maxR * 1.1));
      r = Math.min(255, Math.round(r + glowFactor * 25));
      g = Math.min(255, Math.round(g + glowFactor * 65));
      b = Math.min(255, Math.round(b + glowFactor * 120));

      // Circular glowing border ring
      const ringR = maxR * scale * 0.95;
      const ringDist = Math.abs(dist - ringR);
      if (ringDist < width * 0.035) {
        const ringAlpha = Math.max(0, 1 - ringDist / (width * 0.035));
        // Cyan-Blue #50A8FF (R: 80, G: 168, B: 255)
        r = Math.round(r * (1 - ringAlpha) + 80 * ringAlpha);
        g = Math.round(g * (1 - ringAlpha) + 168 * ringAlpha);
        b = Math.round(b * (1 - ringAlpha) + 255 * ringAlpha);
      }

      // Normalized coordinates (-1 to 1) relative to scaled icon box
      const nx = (x - cx) / (cx * scale);
      const ny = (y - cy) / (cy * scale);

      // Render sleek sports car silhouette
      // Roof curve: ny approx -0.3 + (nx*0.8)^2 ...
      // Let's draw an aerodynamic coupe profile
      // Car body envelope: nx between -0.75 and 0.75, ny between -0.45 and 0.45
      if (nx >= -0.75 && nx <= 0.75 && ny >= -0.45 && ny <= 0.45) {
        // Roofline
        const roofY = -0.35 + Math.pow(nx * 1.25, 2) * 0.5;
        // Beltline / rocker
        const rockerY = 0.22;
        const groundY = 0.28;

        // Roofline stroke
        if (Math.abs(ny - roofY) < 0.06 && nx > -0.65 && nx < 0.65) {
          const intensity = Math.max(0, 1 - Math.abs(ny - roofY) / 0.06);
          r = Math.round(r * (1 - intensity) + 80 * intensity);
          g = Math.round(g * (1 - intensity) + 168 * intensity);
          b = Math.round(b * (1 - intensity) + 255 * intensity);
        }

        // Window fill
        if (ny > roofY + 0.05 && ny < 0.05 && nx > -0.45 && nx < 0.35) {
          r = Math.round(r * 0.4 + 35 * 0.6);
          g = Math.round(g * 0.4 + 123 * 0.6);
          b = Math.round(b * 0.4 + 255 * 0.6);
        }

        // Headlight beam (front right nx: 0.55 to 0.75)
        if (nx > 0.5 && ny > 0.05 && ny < 0.25) {
          const beam = Math.max(0, 1 - Math.abs(ny - 0.14) / 0.1);
          r = Math.round(r * (1 - beam) + 120 * beam);
          g = Math.round(g * (1 - beam) + 210 * beam);
          b = Math.round(b * (1 - beam) + 255 * beam);
        }

        // Taillight accent (rear left nx: -0.7 to -0.55)
        if (nx < -0.52 && ny > 0.06 && ny < 0.22) {
          const tail = Math.max(0, 1 - Math.abs(ny - 0.14) / 0.08);
          r = Math.round(r * (1 - tail) + 255 * tail);
          g = Math.round(g * (1 - tail) + 60 * tail);
          b = Math.round(b * (1 - tail) + 80 * tail);
        }

        // Rocker line stroke
        if (Math.abs(ny - rockerY) < 0.035 && nx > -0.72 && nx < 0.72) {
          const intensity = Math.max(0, 1 - Math.abs(ny - rockerY) / 0.035);
          r = Math.round(r * (1 - intensity) + 35 * intensity);
          g = Math.round(g * (1 - intensity) + 123 * intensity);
          b = Math.round(b * (1 - intensity) + 255 * intensity);
        }
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  // Compress with deflate
  const compressedData = zlib.deflateSync(rawData);

  // PNG chunks
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth 8
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(4 + 4 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);

  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// CRC32 implementation
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = c ^ buf[i];
    for (let j = 0; j < 8; j++) {
      c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate pwa-192x192.png
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, false));
console.log('Created pwa-192x192.png');

// 2. Generate pwa-512x512.png
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, false));
console.log('Created pwa-512x512.png');

// 3. Generate pwa-maskable-512x512.png (with Android safe zone padding)
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, true));
console.log('Created pwa-maskable-512x512.png');

// 4. Generate apple-touch-icon.png (180x180)
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, false));
console.log('Created apple-touch-icon.png');

// 5. Generate high-resolution SVG icon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#102943" />
      <stop offset="100%" stop-color="#071525" />
    </radialGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#bgGrad)" />
  <circle cx="256" cy="256" r="210" fill="none" stroke="rgba(80, 168, 255, 0.25)" stroke-width="4" />
  <circle cx="256" cy="256" r="185" fill="none" stroke="#237BFF" stroke-width="2" stroke-dasharray="8 6" opacity="0.6" />
  <g transform="translate(106, 170) scale(3)" filter="url(#glow)">
    <path d="M 12 36 C 24 35, 30 22, 42 16 C 54 10, 68 10, 78 18 C 84 23, 90 32, 94 36" stroke="#50A8FF" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M 38 24 C 46 17, 60 16, 72 23 C 65 24, 48 24, 38 24 Z" fill="rgba(80, 168, 255, 0.35)" stroke="#50A8FF" stroke-width="1.2" />
    <path d="M 6 42 C 28 42, 72 42, 94 42" stroke="rgba(80, 168, 255, 0.4)" stroke-width="1.8" stroke-linecap="round" />
    <path d="M 12 36 C 8 36, 4 39, 4 41" stroke="#237BFF" stroke-width="2.5" stroke-linecap="round" />
    <path d="M 94 36 C 97 37, 98 40, 96 42" stroke="#50A8FF" stroke-width="2.5" stroke-linecap="round" />
  </g>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
console.log('Created icon.svg');
