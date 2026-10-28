const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.resolve(__dirname, '../public');
const photosDir = path.join(publicDir, 'photos');
const eventsDir = path.join(publicDir, 'events');
const achieveDir = path.join(publicDir, 'achievements');

[photosDir, eventsDir, achieveDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Atmospheric curated photographic plates representing Delhi street photography
const photoPlates = [
  {
    id: 'yamuna-ghat-dawn',
    title: 'SILENCE ON THE YAMUNA',
    location: 'YAMUNA GHAT, KASHMERE GATE',
    coords: '28.6692° N, 77.2319° E',
    category: 'Documentary',
    iso: 'ISO 400',
    exif: '35mm • ƒ/2.8 • 1/500s',
    tone1: '#2c3338', tone2: '#0d1114', accent: '#f70012',
    silhouette: 'boat'
  },
  {
    id: 'chandni-chowk-alley',
    title: 'THE NARROW PASSAGE',
    location: 'CHANDNI CHOWK, OLD DELHI',
    coords: '28.6506° N, 77.2303° E',
    category: 'Street',
    iso: 'ISO 800',
    exif: '28mm • ƒ/2.0 • 1/250s',
    tone1: '#3d2e24', tone2: '#120d0a', accent: '#d4883b',
    silhouette: 'wires'
  },
  {
    id: 'hauz-khas-solitude',
    title: 'MEMORY OF AN ARCH',
    location: 'HAUZ KHAS COMPLEX',
    coords: '28.5535° N, 77.1942° E',
    category: 'Architecture',
    iso: 'ISO 200',
    exif: '50mm • ƒ/4.0 • 1/1000s',
    tone1: '#323631', tone2: '#111410', accent: '#a4b39b',
    silhouette: 'arch'
  },
  {
    id: 'nizamuddin-qawwali',
    title: 'ECSTASY IN MONOCHROME',
    location: 'NIZAMUDDIN DARGAH',
    coords: '28.5912° N, 77.2415° E',
    category: 'Culture',
    iso: 'ISO 1600',
    exif: '85mm • ƒ/1.4 • 1/160s',
    tone1: '#262222', tone2: '#0a0909', accent: '#f70012',
    silhouette: 'hands'
  },
  {
    id: 'delhi-metro-transit',
    title: 'YELLOW LINE APPARITION',
    location: 'RAJIV CHOWK PLATFORM 2',
    coords: '28.6328° N, 77.2195° E',
    category: 'Street',
    iso: 'ISO 640',
    exif: '24mm • ƒ/2.8 • 1/60s',
    tone1: '#1b2d3b', tone2: '#081017', accent: '#e6b800',
    silhouette: 'metro'
  },
  {
    id: 'lodhi-shadows',
    title: 'MURALS IN THE RAIN',
    location: 'LODHI ART DISTRICT',
    coords: '28.5861° N, 77.2268° E',
    category: 'People',
    iso: 'ISO 320',
    exif: '35mm • ƒ/2.2 • 1/400s',
    tone1: '#332938', tone2: '#120b17', accent: '#9d4edd',
    silhouette: 'umbrella'
  },
  {
    id: 'chai-stall-steam',
    title: 'FIRST CHAI BEFORE DAWN',
    location: 'CHAWRIC BAZAAR',
    coords: '28.6501° N, 77.2260° E',
    category: 'Culture',
    iso: 'ISO 800',
    exif: '50mm • ƒ/1.8 • 1/200s',
    tone1: '#36281e', tone2: '#0f0a07', accent: '#f70012',
    silhouette: 'kettle'
  },
  {
    id: 'jama-masjid-flight',
    title: 'THE FLOCK AT MIDDAY',
    location: 'JAMA MASJID COURTYARD',
    coords: '28.6507° N, 77.2334° E',
    category: 'Documentary',
    iso: 'ISO 100',
    exif: '70mm • ƒ/5.6 • 1/2000s',
    tone1: '#3a3430', tone2: '#14110e', accent: '#e0a96d',
    silhouette: 'birds'
  },
  {
    id: 'sadar-bazaar-chaos',
    title: 'PULSE OF THE MARKET',
    location: 'SADAR BAZAAR',
    coords: '28.6568° N, 77.2140° E',
    category: 'Street',
    iso: 'ISO 400',
    exif: '28mm • ƒ/3.5 • 1/800s',
    tone1: '#2c2c2c', tone2: '#0d0d0d', accent: '#f70012',
    silhouette: 'crowd'
  },
  {
    id: 'connaught-colonnade',
    title: 'CIRCULAR GEOMETRY',
    location: 'CONNAUGHT PLACE INNER CIRCLE',
    coords: '28.6315° N, 77.2167° E',
    category: 'Architecture',
    iso: 'ISO 160',
    exif: '16mm • ƒ/8.0 • 1/250s',
    tone1: '#303030', tone2: '#101010', accent: '#ffffff',
    silhouette: 'pillars'
  },
  {
    id: 'dharohar-winning-shot',
    title: 'THE WEAVER OF MAJNU KA TILA',
    location: 'TIBETAN COLONY, NEW DELHI',
    coords: '28.7011° N, 77.2285° E',
    category: 'Portrait',
    iso: 'ISO 500',
    exif: '50mm • ƒ/1.4 • 1/320s',
    tone1: '#2b231f', tone2: '#0e0b09', accent: '#f70012',
    silhouette: 'loom'
  },
  {
    id: 'experimental-light-trails',
    title: 'PULSE RATE 120 (LONG EXPOSURE)',
    location: 'BARAKHAMBA ROAD',
    coords: '28.6290° N, 77.2260° E',
    category: 'Experimental',
    iso: 'ISO 50',
    exif: '24mm • ƒ/11.0 • 15.0s',
    tone1: '#1f1325', tone2: '#08040d', accent: '#f70012',
    silhouette: 'trails'
  }
];

function buildSvg(item, width = 1200, height = 800) {
  return `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${item.tone1}"/>
        <stop offset="60%" stop-color="${item.tone2}"/>
        <stop offset="100%" stop-color="#050505"/>
      </linearGradient>
      <pattern id="grain-${item.id}" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="1" height="1" fill="#ffffff" opacity="0.04"/>
        <rect x="2" y="2" width="1" height="1" fill="#000000" opacity="0.08"/>
      </pattern>
      <filter id="softGlow">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Background Plate -->
    <rect width="100%" height="100%" fill="url(#grad-${item.id})"/>
    <rect width="100%" height="100%" fill="url(#grain-${item.id})"/>

    <!-- Film Sprocket Margin Left and Right -->
    <rect x="0" y="0" width="36" height="${height}" fill="#0a0a0a"/>
    <rect x="${width - 36}" y="0" width="36" height="${height}" fill="#0a0a0a"/>

    <!-- Sprocket holes -->
    ${Array.from({ length: 10 }).map((_, i) => {
      const y = 30 + i * 75;
      return `
        <rect x="10" y="${y}" width="16" height="24" rx="3" fill="#181818" stroke="#222" stroke-width="1"/>
        <rect x="${width - 26}" y="${y}" width="16" height="24" rx="3" fill="#181818" stroke="#222" stroke-width="1"/>
      `;
    }).join('')}

    <!-- Analog Film Edge Text -->
    <text x="20" y="24" fill="#666666" font-family="monospace" font-size="9" transform="rotate(-90 20 24)" letter-spacing="2">KODAK TRI-X 400 • SAFETY FILM</text>
    <text x="${width - 15}" y="24" fill="#666666" font-family="monospace" font-size="9" transform="rotate(-90 ${width - 15} 24)" letter-spacing="2">CLICKS DCAC // FRAME [${item.id.slice(0, 8)}]</text>

    <!-- Inner Frame / Viewfinder -->
    <rect x="60" y="40" width="${width - 120}" height="${height - 80}" fill="none" stroke="#2a2a2a" stroke-width="1"/>

    <!-- Viewfinder Focus Crosshairs & Grid -->
    <circle cx="${width/2}" cy="${height/2}" r="64" fill="none" stroke="${item.accent}" stroke-width="1" opacity="0.4"/>
    <circle cx="${width/2}" cy="${height/2}" r="3" fill="${item.accent}" opacity="0.8"/>
    <line x1="${width/2 - 24}" y1="${height/2}" x2="${width/2 + 24}" y2="${height/2}" stroke="${item.accent}" stroke-width="1" opacity="0.5"/>
    <line x1="${width/2}" y1="${height/2 - 24}" x2="${width/2}" y2="${height/2 + 24}" stroke="${item.accent}" stroke-width="1" opacity="0.5"/>

    <!-- Rule of thirds subtle grid -->
    <line x1="${width * 0.35}" y1="40" x2="${width * 0.35}" y2="${height - 40}" stroke="#ffffff" stroke-width="1" stroke-dasharray="4 8" opacity="0.08"/>
    <line x1="${width * 0.65}" y1="40" x2="${width * 0.65}" y2="${height - 40}" stroke="#ffffff" stroke-width="1" stroke-dasharray="4 8" opacity="0.08"/>
    <line x1="60" y1="${height * 0.38}" x2="${width - 60}" y2="${height * 0.38}" stroke="#ffffff" stroke-width="1" stroke-dasharray="4 8" opacity="0.08"/>
    <line x1="60" y1="${height * 0.68}" x2="${width - 60}" y2="${height * 0.68}" stroke="#ffffff" stroke-width="1" stroke-dasharray="4 8" opacity="0.08"/>

    <!-- Geometric Silhouette Atmospheric Art -->
    <g opacity="0.25">
      <path d="M 120,${height - 120} Q 300,${height - 350} 600,${height - 200} T ${width - 120},${height - 180} L ${width - 120},${height - 60} L 120,${height - 60} Z" fill="#000000"/>
      <circle cx="${width * 0.72}" cy="180" r="90" fill="${item.accent}" opacity="0.15" filter="url(#softGlow)"/>
    </g>

    <!-- Corner Crop Marks -->
    <path d="M 70 50 L 90 50 M 70 50 L 70 70" stroke="#f70012" stroke-width="2"/>
    <path d="M ${width - 70} 50 L ${width - 90} 50 M ${width - 70} 50 L ${width - 70} 70" stroke="#f70012" stroke-width="2"/>
    <path d="M 70 ${height - 50} L 90 ${height - 50} M 70 ${height - 50} L 70 ${height - 70}" stroke="#f70012" stroke-width="2"/>
    <path d="M ${width - 70} ${height - 50} L ${width - 90} ${height - 50} M ${width - 70} ${height - 50} L ${width - 70} ${height - 70}" stroke="#f70012" stroke-width="2"/>

    <!-- Metadata Stamps -->
    <text x="80" y="80" fill="${item.accent}" font-family="monospace" font-size="11" letter-spacing="3" font-weight="bold">CLICKS // ARCHIVE</text>
    <text x="80" y="100" fill="#888888" font-family="monospace" font-size="10" letter-spacing="1">${item.category.toUpperCase()} • ${item.iso}</text>
    <text x="80" y="120" fill="#666666" font-family="monospace" font-size="10">${item.coords}</text>

    <!-- Main Title & Location (Magazine editorial typography) -->
    <text x="80" y="${height - 140}" fill="#ffffff" font-family="'Impact', 'Arial Black', sans-serif" font-size="52" letter-spacing="1">${item.title}</text>
    <text x="80" y="${height - 100}" fill="#b0b0b0" font-family="serif" font-size="20" font-style="italic">${item.location}</text>
    <text x="80" y="${height - 70}" fill="#777777" font-family="monospace" font-size="12" letter-spacing="2">${item.exif}</text>

    <!-- Exposure Gauge / Frame Stamp on Right -->
    <text x="${width - 80}" y="80" fill="#666666" font-family="monospace" font-size="11" text-anchor="end" letter-spacing="2">EXPOSURE 00.3</text>
    <rect x="${width - 150}" y="95" width="70" height="3" fill="#333333"/>
    <rect x="${width - 150}" y="95" width="42" height="3" fill="${item.accent}"/>
    <text x="${width - 80}" y="${height - 70}" fill="#888888" font-family="monospace" font-size="12" text-anchor="end" letter-spacing="2">DELHI COLLEGE OF ARTS &amp; COMMERCE</text>
  </svg>
  `;
}

async function run() {
  console.log('Generating curated photographic assets...');
  for (const plate of photoPlates) {
    const svgStr = buildSvg(plate, 1200, 800);
    const dest = path.join(photosDir, `${plate.id}.jpg`);
    await sharp(Buffer.from(svgStr)).jpeg({ quality: 92 }).toFile(dest);
    console.log(`Saved photo: ${plate.id}.jpg`);
  }

  // Also generate 4 event plates
  const events = [
    { id: 'event-chandni-photowalk', title: 'CHANDNI CHOWK AT DAWN', tag: 'PHOTOWALK // 05:30 IST' },
    { id: 'event-monochrome-darkroom', title: 'SILVER HALIDE &amp; SHADOWS', tag: 'WORKSHOP // ANALOG' },
    { id: 'event-annual-exhibition', title: 'DRISHTI: ANNUAL SHOWCASE', tag: 'EXHIBITION // KASHMERE GATE' },
    { id: 'event-dharohar-clash', title: 'DHAROHAR COMPETITION 2025', tag: 'COMPETITION // GOLD MEDAL' }
  ];

  for (const ev of events) {
    const plate = {
      id: ev.id,
      title: ev.title,
      location: 'DELHI CAMPUS &amp; STREETS',
      coords: '28.6139° N, 77.2090° E',
      category: 'Event',
      iso: 'ISO 400',
      exif: ev.tag,
      tone1: '#262220',
      tone2: '#0d0c0b',
      accent: '#f70012'
    };
    const dest = path.join(eventsDir, `${ev.id}.jpg`);
    await sharp(Buffer.from(buildSvg(plate, 1200, 750))).jpeg({ quality: 90 }).toFile(dest);
    console.log(`Saved event: ${ev.id}.jpg`);
  }

  // Also generate 5 achievements proof plates
  const achievements = [
    { id: 'proof-lsr', title: 'PRAKIRTI • LADY SHRI RAM COLLEGE', tag: '2ND PRIZE // PHOTOGRAPHY' },
    { id: 'proof-mlnc', title: 'SPOT ON • MOTILAL NEHRU COLLEGE', tag: '1ST PRIZE // GOLD MEDAL' },
    { id: 'proof-ipcw', title: 'ANNUAL FEST • INDRAPRASTHA COLLEGE', tag: '2ND PRIZE // DOCUMENTARY' },
    { id: 'proof-dcac', title: 'DHAROHAR • DCAC INTER-COLLEGE', tag: '1ST PRIZE // OVERALL CHAMPIONS' },
    { id: 'proof-iitk', title: 'PHOTOPALETTE • IIT KANPUR', tag: 'NATIONAL RECOGNITION // WINNER' }
  ];

  for (const ach of achievements) {
    const plate = {
      id: ach.id,
      title: ach.title,
      location: 'RECORD OF EXCELLENCE',
      coords: 'DELHI UNIVERSITY CIRCUIT',
      category: 'Honor',
      iso: 'EXCELLENCE',
      exif: ach.tag,
      tone1: '#2b1b1c',
      tone2: '#0f0808',
      accent: '#f70012'
    };
    const dest = path.join(achieveDir, `${ach.id}.jpg`);
    await sharp(Buffer.from(buildSvg(plate, 1000, 700))).jpeg({ quality: 90 }).toFile(dest);
    console.log(`Saved achievement proof: ${ach.id}.jpg`);
  }

  console.log('All graphic plates generated successfully!');
}

run().catch(console.error);
