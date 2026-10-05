import { readFile } from "node:fs/promises";
import sharp from "sharp";

// A native SVG layout embeds the existing screenshot without changing its content.
const screenshot = await readFile(new URL("../public/apps/solemate-run/en/results.png", import.meta.url));
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow"><stop stop-color="#d5f537" stop-opacity=".16"/><stop offset="1" stop-color="#080b08" stop-opacity="0"/></radialGradient>
    <clipPath id="screen"><rect x="827" y="32" width="261" height="566" rx="20"/></clipPath>
  </defs>
  <rect width="1200" height="630" fill="#080b08"/>
  <ellipse cx="985" cy="340" rx="470" ry="390" fill="url(#glow)"/>
  <g fill="none" stroke="#c9ed34" stroke-opacity=".10">
    <path d="M720 630 Q540 370 900 0"/><path d="M785 630 Q605 370 965 0"/><path d="M850 630 Q670 370 1030 0"/>
  </g>
  <rect x="64" y="65" width="6" height="38" rx="3" fill="#ddfa35"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="87" y="94" fill="#f8f9f1" font-size="30" font-weight="700" letter-spacing="1">SOLEMATE <tspan fill="#ddfa35">RUN</tspan></text>
    <text x="64" y="230" fill="#f8f9f1" font-size="64" font-weight="700" letter-spacing="-2">Your next run.</text>
    <text x="64" y="305" fill="#ddfa35" font-size="64" font-weight="700" letter-spacing="-2">The right pair.</text>
    <text x="67" y="365" fill="#bfc6b8" font-size="25">Find running shoes that fit your profile.</text>
    <text x="67" y="403" fill="#bfc6b8" font-size="25">A few questions. A smarter shortlist.</text>
    <rect x="64" y="467" width="316" height="57" rx="28.5" fill="#ddfa35"/>
    <text x="222" y="503" text-anchor="middle" fill="#11170b" font-size="22" font-weight="700">Free on iOS &amp; Android</text>
    <text x="67" y="579" fill="#7f8c77" font-size="18" letter-spacing="1">OVER TECH APPS</text>
  </g>
  <rect x="819" y="24" width="277" height="582" rx="27" fill="#10150e" stroke="#d1ef38" stroke-opacity=".3"/>
  <image x="827" y="32" width="261" height="566" clip-path="url(#screen)" href="data:image/png;base64,${screenshot.toString("base64")}"/>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(new URL("../public/apps/solemate-run/social-preview-v1.png", import.meta.url).pathname);
