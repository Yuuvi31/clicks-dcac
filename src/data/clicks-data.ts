/**
 * =====================================================================
 * CLICKS — PHOTOGRAPHY SOCIETY OF DCAC, UNIVERSITY OF DELHI
 * MASTER DATA REGISTRY (SINGLE SOURCE OF TRUTH)
 * =====================================================================
 * All text, metadata, photographers, achievements, council members,
 * events, contact links, and image paths live in this single file.
 * To update content or replace placeholders, edit ONLY this file.
 * The layout and components consume these typed structures directly.
 */

export interface PhotoItem {
  id: string;
  file: string;
  title: string;
  photographer: string;
  photographerHandle?: string;
  location: string;
  coordinates: string;
  timeDate: string;
  category: 'street' | 'portrait' | 'documentary' | 'architecture' | 'people' | 'culture' | 'experimental';
  cameraLens: string;
  shutter: string;
  aperture: string;
  iso: string;
  focalLength: string;
  featuredInSelectedWork?: boolean;
  featuredInHero?: boolean;
  heroOrientation?: 'landscape' | 'portrait';
  story?: string;
}

export interface CouncilMember {
  id: string;
  name: string;
  position: string;
  year: string;
  speciality: string;
  description: string;
  instagram: string;
  portrait: string;
}

export interface FeaturedPhotographer {
  id: string;
  name: string;
  favouriteGenre: string;
  camera: string;
  focalLength: string;
  quote: string;
  portrait: string;
  instagram: string;
}

export interface AchievementItem {
  id: string;
  rank: string;
  rankBadge: '1st' | '2nd' | 'Won' | 'Finalist';
  competition: string;
  institution: string;
  year: string;
  winningPhotographer: string;
  winningPhotoTitle: string;
  proofImage: string;
  story: string;
}

export interface EventItem {
  id: string;
  date: string;
  title: string;
  location: string;
  category: 'photowalk' | 'workshop' | 'exhibition' | 'competition' | 'talk';
  coverPhoto: string;
  description: string;
  galleryCount: number;
  highlight: string;
}

export interface InstagramPost {
  id: string;
  title: string;
  image: string;
  likes: string;
  date: string;
  caption: string;
  permalink: string;
}

export interface SiteMeta {
  societyName: string;
  collegeName: string;
  university: string;
  established: string;
  instagramUrl: string;
  instagramHandle: string;
  contactEmail: string;
  coordinates: string;
  heroLine: string;
  manifestoLine: string;
  joinFormUrl: string;
  applicationDeadline: string;
}

/* =====================================================================
 * 1. SITE METADATA & BRAND COPY
 * ===================================================================== */
export const SITE_META: SiteMeta = {
  societyName: "CLICKS",
  collegeName: "Delhi College of Arts & Commerce",
  university: "University of Delhi",
  established: "2011",
  instagramUrl: "https://www.instagram.com/clicks.dcac/",
  instagramHandle: "@clicks.dcac",
  contactEmail: "[PLACEHOLDER: official.clicks.dcac@gmail.com]",
  coordinates: "28.6139° N / 77.2090° E",
  heroLine: "We don't just take pictures. We notice.",
  manifestoLine: "Photography is the art of noticing.",
  joinFormUrl: "[PLACEHOLDER: https://forms.gle/clicks-dcac-recruitment-2026]",
  applicationDeadline: "[PLACEHOLDER: Applications open for Session 2026-27]",
};

/* =====================================================================
 * 2. COUNCIL MEMBERS (Extracted from society credentials)
 * ===================================================================== */
export const COUNCIL_MEMBERS: CouncilMember[] = [
  {
    id: "artika-mimi-jain",
    name: "Artika Mimi Jain",
    position: "President",
    year: "[PLACEHOLDER: 3rd Year / 2024-25]",
    speciality: "Documentary & Visual Direction",
    description: "Leading visual culture and lens curation across the society's active expeditions.",
    instagram: "https://www.instagram.com/clicks.dcac/",
    portrait: "/council/artika-mimi-jain.jpg",
  },
  {
    id: "jose-asin-v",
    name: "Jose Asin V.",
    position: "Vice President",
    year: "[PLACEHOLDER: 3rd Year / 2024-25]",
    speciality: "Street Photography & Film Frames",
    description: "Capturing candid kinetic moments across Old Delhi and metropolitan transit.",
    instagram: "https://www.instagram.com/clicks.dcac/",
    portrait: "/council/jose-asin-v.png",
  },
  {
    id: "zidan-jidan-ahmad",
    name: "Zidan (Jidan) Ahmad",
    position: "General Secretary",
    year: "[PLACEHOLDER: 2nd Year / 2024-25]",
    speciality: "Light Architecture & Monochromes",
    description: "Orchestrating workshops, archival logistics, and society photo-walks.",
    instagram: "https://www.instagram.com/clicks.dcac/",
    portrait: "/council/zidan-jidan-ahmad.png",
  },
  {
    id: "vrinda-tayal",
    name: "Vrinda Tayal",
    position: "General Secretary",
    year: "[PLACEHOLDER: 2nd Year / 2024-25]",
    speciality: "Portraiture & Human Geography",
    description: "Coordinating inter-college circuits and exhibition curation.",
    instagram: "https://www.instagram.com/clicks.dcac/",
    portrait: "/council/vrinda-tayal.png",
  },
  {
    id: "satyam-chhayakaar",
    name: "Abey Chhayakaar Satyam",
    position: "Social Media Head",
    year: "[PLACEHOLDER: 2nd Year / 2024-25]",
    speciality: "Narrative Curation & Visual Reach",
    description: "Directing the digital voice and street archives across Instagram and print zines.",
    instagram: "https://www.instagram.com/clicks.dcac/",
    portrait: "/council/satyam-chhayakaar.png",
  },
  {
    id: "laqshya-saxena",
    name: "Laqshya (Lickshey) Saxena",
    position: "Treasurer",
    year: "[PLACEHOLDER: 2nd Year / 2024-25]",
    speciality: "Minimalism & Shadow Play",
    description: "Managing operational resources, photowalk production, and equipment logistics.",
    instagram: "https://www.instagram.com/clicks.dcac/",
    portrait: "/council/laqshya-saxena.png",
  },
  {
    id: "pratya-major",
    name: "Pratya (Major Minoxidil)",
    position: "Core Executive",
    year: "[PLACEHOLDER: 2nd Year / 2024-25]",
    speciality: "Experimental & Color Theory",
    description: "Driving ground coverage during photowalks and festival competitions.",
    instagram: "https://www.instagram.com/clicks.dcac/",
    portrait: "/council/pratya.png",
  },
];

/* =====================================================================
 * 3. FEATURED PHOTOGRAPHERS
 * ===================================================================== */
export const FEATURED_PHOTOGRAPHERS: FeaturedPhotographer[] = [
  {
    id: "photog-1",
    name: "Artika Mimi Jain",
    favouriteGenre: "Street Documentary",
    camera: "Fujifilm X-T4",
    focalLength: "35mm Prime",
    quote: "A photograph isn't taken when the finger presses the shutter, but when the eyes notice what everyone walked past.",
    portrait: "/council/artika-mimi-jain.jpg",
    instagram: "https://www.instagram.com/clicks.dcac/",
  },
  {
    id: "photog-2",
    name: "Jose Asin V.",
    favouriteGenre: "Transit Monochromes",
    camera: "Sony α7 III",
    focalLength: "28mm ƒ/2.0",
    quote: "Old Delhi is a darkroom where sunlight prints the daily struggles of a billion souls onto dust.",
    portrait: "/council/jose-asin-v.png",
    instagram: "https://www.instagram.com/clicks.dcac/",
  },
  {
    id: "photog-3",
    name: "Zidan Ahmad",
    favouriteGenre: "Architectural Shadows",
    camera: "Canon EOS R6",
    focalLength: "50mm ƒ/1.4",
    quote: "The geometric arches of Delhi were built centuries ago to cast shadows for photographers today.",
    portrait: "/council/zidan-jidan-ahmad.png",
    instagram: "https://www.instagram.com/clicks.dcac/",
  },
  {
    id: "photog-4",
    name: "Vrinda Tayal",
    favouriteGenre: "Intimate Portraits",
    camera: "Nikon Z6 II",
    focalLength: "85mm ƒ/1.8",
    quote: "Every portrait is a confession shared between two strangers for 1/250th of a second.",
    portrait: "/council/vrinda-tayal.png",
    instagram: "https://www.instagram.com/clicks.dcac/",
  },
];

/* =====================================================================
 * 4. ACHIEVEMENTS (Fully Data-Driven / "On Record")
 * ===================================================================== */
export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "achieve-lsr",
    rank: "2nd PRIZE",
    rankBadge: "2nd",
    competition: "Photography Competition, Prakirti",
    institution: "Lady Shri Ram College for Women (LSR)",
    year: "[PLACEHOLDER: 2024]",
    winningPhotographer: "[PLACEHOLDER: Winning Photographer]",
    winningPhotoTitle: "Morning Prayers at Yamuna Ghat",
    proofImage: "/achievements/proof-lsr.jpg",
    story: "Awarded 2nd position among 120+ entries across premier DU colleges for documentary realism.",
  },
  {
    id: "achieve-mlnc",
    rank: "1st PRIZE",
    rankBadge: "1st",
    competition: "Spot On Competition",
    institution: "Motilal Nehru College (MLNC)",
    year: "[PLACEHOLDER: 2024]",
    winningPhotographer: "[PLACEHOLDER: Winning Photographer]",
    winningPhotoTitle: "The Alleys of Chawri",
    proofImage: "/achievements/proof-mlnc.jpg",
    story: "Clinched the gold trophy in on-the-spot street photography challenge under strict 60-minute time cap.",
  },
  {
    id: "achieve-ipcw",
    rank: "2nd PRIZE",
    rankBadge: "2nd",
    competition: "Annual Photography Competition",
    institution: "Indraprastha College for Women (IPCW)",
    year: "[PLACEHOLDER: 2023]",
    winningPhotographer: "[PLACEHOLDER: Winning Photographer]",
    winningPhotoTitle: "Shadows in the Colonnade",
    proofImage: "/achievements/proof-ipcw.jpg",
    story: "Celebrated for architectural geometry and dynamic range in the inter-college fest category.",
  },
  {
    id: "achieve-dcac",
    rank: "1st PRIZE",
    rankBadge: "1st",
    competition: "Dharohar College Photography Competition",
    institution: "Delhi College of Arts & Commerce (DCAC)",
    year: "[PLACEHOLDER: 2024]",
    winningPhotographer: "[PLACEHOLDER: Winning Photographer]",
    winningPhotoTitle: "The Weaver of Majnu Ka Tila",
    proofImage: "/achievements/proof-dcac.jpg",
    story: "Secured 1st place in the flagship institutional showcase, capturing cultural preservation.",
  },
  {
    id: "achieve-iitk",
    rank: "WINNER",
    rankBadge: "Won",
    competition: "National Photography Showcase",
    institution: "IIT Kanpur",
    year: "[PLACEHOLDER: 2023]",
    winningPhotographer: "[PLACEHOLDER: Winning Photographer]",
    winningPhotoTitle: "Pulse Rate 120 (Long Exposure)",
    proofImage: "/achievements/proof-iitk.jpg",
    story: "Recognized on the national circuit competing against top technical institutes across India.",
  },
];

/* =====================================================================
 * 5. EVENTS & EXPEDITIONS
 * ===================================================================== */
export const EVENTS: EventItem[] = [
  {
    id: "ev-chandni-photowalk",
    date: "[PLACEHOLDER: Oct 18, 2025 // 05:30 IST]",
    title: "Chandni Chowk Dawn Expedition",
    location: "Kashmere Gate to Chawri Bazaar",
    category: "photowalk",
    coverPhoto: "/events/event-chandni-photowalk.jpg",
    description: "Annual photowalk tracing the waking rhythms of the Walled City before tourist traffic awakens.",
    galleryCount: 42,
    highlight: "35 photowalkers • 420 frames archived",
  },
  {
    id: "ev-darkroom-masterclass",
    date: "[PLACEHOLDER: Nov 04, 2025 // 14:00 IST]",
    title: "Monochrome & Exposure Masterclass",
    location: "Studio 4, DCAC Campus",
    category: "workshop",
    coverPhoto: "/events/event-monochrome-darkroom.jpg",
    description: "Deep dive into analog exposure latitude, zone system meter readings, and high-contrast street editing.",
    galleryCount: 18,
    highlight: "Guest Lecture by Senior Photojournalist",
  },
  {
    id: "ev-drishti-annual",
    date: "[PLACEHOLDER: Feb 12–14, 2026]",
    title: "Drishti: Annual Print Exhibition",
    location: "India Habitat Centre / DCAC Auditorium",
    category: "exhibition",
    coverPhoto: "/events/event-annual-exhibition.jpg",
    description: "Curated 3-day public gallery display showcasing 60 printed silver-gelatin & archival prints.",
    galleryCount: 60,
    highlight: "800+ attendees over 3 days",
  },
  {
    id: "ev-dharohar-clash",
    date: "[PLACEHOLDER: Mar 21, 2026]",
    title: "Dharohar 2026 Inter-College Clash",
    location: "Delhi College of Arts & Commerce",
    category: "competition",
    coverPhoto: "/events/event-dharohar-clash.jpg",
    description: "Flagship on-the-spot lens competition hosting 28 college photography societies across Delhi NCR.",
    galleryCount: 30,
    highlight: "Cash prize pool & Gold Trophies",
  },
];

/* =====================================================================
 * 6. PHOTOGRAPHS ARCHIVE (12 Curated Plates)
 * ===================================================================== */
export const PHOTO_ARCHIVE: PhotoItem[] = [
  {
    id: "jama-masjid-eid-night",
    file: "/photos/jama-masjid-eid-night.jpg",
    title: "Night of a Thousand Prayers",
    photographer: "CLICKS DCAC Member",
    photographerHandle: "@clicks.dcac",
    location: "Jama Masjid Courtyard, Old Delhi",
    coordinates: "28.6507° N, 77.2334° E",
    timeDate: "20:45 IST, Annual Festival",
    category: "culture",
    cameraLens: "Leica SL2 • 35mm Prime",
    shutter: "1/125s",
    aperture: "ƒ/1.4",
    iso: "ISO 3200",
    focalLength: "35mm",
    featuredInSelectedWork: true,
    featuredInHero: true,
    heroOrientation: "landscape",
    story: "Thousands gathered under twilight illumination, illuminated domes standing quiet guard above a vast sea of worshippers.",
  },
  {
    id: "delhi-children-smile",
    file: "/photos/delhi-children-smile.png",
    title: "Smiles of Sadar",
    photographer: "CLICKS DCAC Member",
    photographerHandle: "@clicks.dcac",
    location: "Sadar Bazaar Alleys, Delhi",
    coordinates: "28.6568° N, 77.2140° E",
    timeDate: "16:20 IST, Winter Expedition",
    category: "people",
    cameraLens: "Fujifilm X-Pro3 • 23mm ƒ/1.4",
    shutter: "1/500s",
    aperture: "ƒ/2.8",
    iso: "ISO 400",
    focalLength: "23mm",
    featuredInSelectedWork: true,
    featuredInHero: true,
    heroOrientation: "landscape",
    story: "Spontaneous laughter breaking out in the narrowest lanes of Old Delhi, capturing pure unfiltered kinetic joy.",
  },
  {
    id: "qutub-sandstone-arches",
    file: "/photos/qutub-sandstone-arches.jpg",
    title: "Arches of Time",
    photographer: "CLICKS DCAC Member",
    photographerHandle: "@clicks.dcac",
    location: "Mehrauli Archaeological Complex",
    coordinates: "28.5245° N, 77.1855° E",
    timeDate: "15:30 IST, Golden Hour",
    category: "architecture",
    cameraLens: "Sony α7 IV • 24-70mm GM",
    shutter: "1/320s",
    aperture: "ƒ/4.0",
    iso: "ISO 200",
    focalLength: "35mm",
    featuredInSelectedWork: true,
    featuredInHero: true,
    heroOrientation: "landscape",
    story: "Centuries of carved calligraphy across layered sandstone arches framing a solitary green courtyard doorway.",
  },
  {
    id: "child-curiosity-monochrome",
    file: "/photos/child-curiosity-monochrome.png",
    title: "Behind the Wicker",
    photographer: "CLICKS DCAC Member",
    photographerHandle: "@clicks.dcac",
    location: "Dilli Haat Craft Alleys",
    coordinates: "28.5731° N, 77.2075° E",
    timeDate: "17:15 IST, Documentary Series",
    category: "portrait",
    cameraLens: "Nikon Zf • 50mm Prime",
    shutter: "1/250s",
    aperture: "ƒ/1.8",
    iso: "ISO 800",
    focalLength: "50mm",
    featuredInSelectedWork: true,
    featuredInHero: false,
    story: "Tender curiosity in high contrast monochrome — a child peeking from behind woven wicker cane chairs.",
  },
  {
    id: "jaali-window-geometric",
    file: "/photos/jaali-window-geometric.jpg",
    title: "The Geometric Gaze",
    photographer: "CLICKS DCAC Member",
    photographerHandle: "@clicks.dcac",
    location: "Ramparts & Bastions, Delhi Circuit",
    coordinates: "28.6562° N, 77.2410° E",
    timeDate: "11:45 IST, Sunlight Study",
    category: "documentary",
    cameraLens: "Canon EOS R5 • 85mm Prime",
    shutter: "1/800s",
    aperture: "ƒ/5.6",
    iso: "ISO 100",
    focalLength: "85mm",
    featuredInSelectedWork: true,
    featuredInHero: false,
    story: "Intricate pierced stone honeycomb screen casting silent geometric shadows toward the valley below.",
  },
  {
    id: "yamuna-ghat-dawn",
    file: "/photos/yamuna-ghat-dawn.jpg",
    title: "Silence on the Yamuna",
    photographer: "[PLACEHOLDER: Council Member / Photographer]",
    photographerHandle: "@clicks.dcac",
    location: "Yamuna Ghat, Kashmere Gate",
    coordinates: "28.6692° N, 77.2319° E",
    timeDate: "05:42 IST, Oct 2024",
    category: "documentary",
    cameraLens: "Fujifilm X-T4 • 35mm Prime",
    shutter: "1/500s",
    aperture: "ƒ/2.8",
    iso: "ISO 400",
    focalLength: "35mm",
    featuredInSelectedWork: true,
    featuredInHero: true,
    heroOrientation: "landscape",
    story: "Migratory Siberian seagulls circling above the early morning fog on the Yamuna banks.",
  },
  {
    id: "chandni-chowk-alley",
    file: "/photos/chandni-chowk-alley.jpg",
    title: "The Narrow Passage",
    photographer: "[PLACEHOLDER: Council Member / Photographer]",
    photographerHandle: "@clicks.dcac",
    location: "Ballimaran, Chandni Chowk",
    coordinates: "28.6506° N, 77.2303° E",
    timeDate: "16:15 IST, Nov 2024",
    category: "street",
    cameraLens: "Sony α7 III • 28mm",
    shutter: "1/250s",
    aperture: "ƒ/2.0",
    iso: "ISO 800",
    focalLength: "28mm",
    featuredInSelectedWork: true,
    featuredInHero: false,
    story: "Shafts of golden autumn dust cutting through centuries-old tangled overhead electricity wires.",
  },
  {
    id: "hauz-khas-solitude",
    file: "/photos/hauz-khas-solitude.jpg",
    title: "Memory of an Arch",
    photographer: "[PLACEHOLDER: Council Member / Photographer]",
    photographerHandle: "@clicks.dcac",
    location: "Hauz Khas Complex Ruins",
    coordinates: "28.5535° N, 77.1942° E",
    timeDate: "11:20 IST, Dec 2024",
    category: "architecture",
    cameraLens: "Canon EOS R6 • 50mm",
    shutter: "1/1000s",
    aperture: "ƒ/4.0",
    iso: "ISO 200",
    focalLength: "50mm",
    featuredInSelectedWork: true,
    featuredInHero: true,
    heroOrientation: "portrait",
    story: "Medieval stone Madrasa window framing the reservoir below amidst Delhi winter chill.",
  },
  {
    id: "nizamuddin-qawwali",
    file: "/photos/nizamuddin-qawwali.jpg",
    title: "Ecstasy in Monochrome",
    photographer: "[PLACEHOLDER: Council Member / Photographer]",
    photographerHandle: "@clicks.dcac",
    location: "Dargah Hazrat Nizamuddin",
    coordinates: "28.5912° N, 77.2415° E",
    timeDate: "19:40 IST, Jan 2025",
    category: "culture",
    cameraLens: "Nikon Z6 II • 85mm",
    shutter: "1/160s",
    aperture: "ƒ/1.4",
    iso: "ISO 1600",
    focalLength: "85mm",
    featuredInSelectedWork: true,
    featuredInHero: false,
    story: "Hands lifted toward the night sky in unison as devotional Sufi poetry reverberates in the courtyard.",
  },
  {
    id: "delhi-metro-transit",
    file: "/photos/delhi-metro-transit.jpg",
    title: "Yellow Line Apparition",
    photographer: "[PLACEHOLDER: Council Member / Photographer]",
    photographerHandle: "@clicks.dcac",
    location: "Rajiv Chowk Platform 2",
    coordinates: "28.6328° N, 77.2195° E",
    timeDate: "18:25 IST, Feb 2025",
    category: "street",
    cameraLens: "Fujifilm X100V • 23mm",
    shutter: "1/60s",
    aperture: "ƒ/2.8",
    iso: "ISO 640",
    focalLength: "23mm",
    featuredInSelectedWork: true,
    featuredInHero: false,
    story: "Commuter silhouettes smeared across glass panels by high-speed deceleration.",
  },
  {
    id: "lodhi-shadows",
    file: "/photos/lodhi-shadows.jpg",
    title: "Murals in the Rain",
    photographer: "[PLACEHOLDER: Council Member / Photographer]",
    photographerHandle: "@clicks.dcac",
    location: "Lodhi Art District Block 14",
    coordinates: "28.5861° N, 77.2268° E",
    timeDate: "14:10 IST, Jul 2024",
    category: "people",
    cameraLens: "Sony α6400 • 35mm",
    shutter: "1/400s",
    aperture: "ƒ/2.2",
    iso: "ISO 320",
    focalLength: "35mm",
    featuredInSelectedWork: false,
    featuredInHero: false,
    story: "A lone umbrella bearer crossing before massive typographic street murals in monsoon drizzle.",
  },
  {
    id: "chai-stall-steam",
    file: "/photos/chai-stall-steam.jpg",
    title: "First Chai Before Dawn",
    photographer: "[PLACEHOLDER: Council Member / Photographer]",
    photographerHandle: "@clicks.dcac",
    location: "Chawri Bazaar Intersection",
    coordinates: "28.6501° N, 77.2260° E",
    timeDate: "05:10 IST, Dec 2024",
    category: "culture",
    cameraLens: "Leica Q2 • 28mm",
    shutter: "1/200s",
    aperture: "ƒ/1.8",
    iso: "ISO 800",
    focalLength: "28mm",
    featuredInSelectedWork: true,
    featuredInHero: false,
    story: "Boiling brass vessel steam illuminated by a single tungsten halogen bulb.",
  },
  {
    id: "jama-masjid-flight",
    file: "/photos/jama-masjid-flight.jpg",
    title: "The Flock at Midday",
    photographer: "[PLACEHOLDER: Council Member / Photographer]",
    photographerHandle: "@clicks.dcac",
    location: "Jama Masjid Courtyard",
    coordinates: "28.6507° N, 77.2334° E",
    timeDate: "12:15 IST, Jan 2025",
    category: "documentary",
    cameraLens: "Canon 5D Mk IV • 70-200mm",
    shutter: "1/2000s",
    aperture: "ƒ/5.6",
    iso: "ISO 100",
    focalLength: "135mm",
    featuredInSelectedWork: true,
    featuredInHero: true,
    heroOrientation: "landscape",
    story: "Dozens of pigeons taking flight simultaneously in front of red sandstone domes.",
  },
  {
    id: "sadar-bazaar-chaos",
    file: "/photos/sadar-bazaar-chaos.jpg",
    title: "Pulse of the Market",
    photographer: "[PLACEHOLDER: Council Member / Photographer]",
    photographerHandle: "@clicks.dcac",
    location: "Sadar Bazaar Wholesale Market",
    coordinates: "28.6568° N, 77.2140° E",
    timeDate: "15:45 IST, Feb 2025",
    category: "street",
    cameraLens: "Ricoh GR III • 28mm",
    shutter: "1/800s",
    aperture: "ƒ/3.5",
    iso: "ISO 400",
    focalLength: "28mm",
    featuredInSelectedWork: false,
    featuredInHero: false,
    story: "Human porters balancing heavy cargo sacks over bicycle rickshaw congestions.",
  },
  {
    id: "connaught-colonnade",
    file: "/photos/connaught-colonnade.jpg",
    title: "Circular Geometry",
    photographer: "[PLACEHOLDER: Council Member / Photographer]",
    photographerHandle: "@clicks.dcac",
    location: "Connaught Place Inner Circle",
    coordinates: "28.6315° N, 77.2167° E",
    timeDate: "17:05 IST, Mar 2025",
    category: "architecture",
    cameraLens: "Sony α7 IV • 16-35mm",
    shutter: "1/250s",
    aperture: "ƒ/8.0",
    iso: "ISO 160",
    focalLength: "16mm",
    featuredInSelectedWork: false,
    featuredInHero: false,
    story: "Concentric white Georgian colonnades throwing elongated diagonal afternoon shadows.",
  },
  {
    id: "dharohar-winning-shot",
    file: "/photos/dharohar-winning-shot.jpg",
    title: "The Weaver of Majnu Ka Tila",
    photographer: "[PLACEHOLDER: Winning Photographer]",
    photographerHandle: "@clicks.dcac",
    location: "Tibetan Colony, New Delhi",
    coordinates: "28.7011° N, 77.2285° E",
    timeDate: "10:30 IST, Nov 2024",
    category: "portrait",
    cameraLens: "Nikon D850 • 50mm",
    shutter: "1/320s",
    aperture: "ƒ/1.4",
    iso: "ISO 500",
    focalLength: "50mm",
    featuredInSelectedWork: true,
    featuredInHero: true,
    heroOrientation: "portrait",
    story: "First place award-winning portrait capturing the weathered fingers of an elder master weaver.",
  },
  {
    id: "experimental-light-trails",
    file: "/photos/experimental-light-trails.jpg",
    title: "Pulse Rate 120 (Long Exposure)",
    photographer: "[PLACEHOLDER: Council Member / Photographer]",
    photographerHandle: "@clicks.dcac",
    location: "Barakhamba Road Flyover",
    coordinates: "28.6290° N, 77.2260° E",
    timeDate: "21:10 IST, Jan 2025",
    category: "experimental",
    cameraLens: "Fujifilm X-T5 • 24mm",
    shutter: "15.0s",
    aperture: "ƒ/11.0",
    iso: "ISO 50",
    focalLength: "24mm",
    featuredInSelectedWork: true,
    featuredInHero: false,
    story: "Fifteen-second shutter exposure transforming Delhi midnight traffic into streaks of pure neon crimson.",
  },
];

/* =====================================================================
 * 7. INSTAGRAM FEED (Recent Curated Frames)
 * ===================================================================== */
export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig-1",
    title: "Eid Eve at Jama Masjid",
    image: "/photos/jama-masjid-eid-night.jpg",
    likes: "1,248",
    date: "2d ago",
    caption: "Twilight illumination across the vast courtyard. The grand domes keeping watch over thousands.",
    permalink: "https://www.instagram.com/clicks.dcac/",
  },
  {
    id: "ig-2",
    title: "Smiles of Sadar",
    image: "/photos/delhi-children-smile.png",
    likes: "986",
    date: "5d ago",
    caption: "Pure kinetic joy in the narrowest lanes. A fraction of a second that preserves a lifetime of light.",
    permalink: "https://www.instagram.com/clicks.dcac/",
  },
  {
    id: "ig-3",
    title: "Ancient Calligraphy Arches",
    image: "/photos/qutub-sandstone-arches.jpg",
    likes: "754",
    date: "1w ago",
    caption: "Layered sandstone arches and Islamic inscriptions framing the green doorway beyond. Mehrauli expedition.",
    permalink: "https://www.instagram.com/clicks.dcac/",
  },
  {
    id: "ig-4",
    title: "Curiosity Behind Wicker",
    image: "/photos/child-curiosity-monochrome.png",
    likes: "892",
    date: "2w ago",
    caption: "High contrast monochrome study. When the subject and the lens share a quiet secret.",
    permalink: "https://www.instagram.com/clicks.dcac/",
  },
  {
    id: "ig-5",
    title: "The Geometric Gaze",
    image: "/photos/jaali-window-geometric.jpg",
    likes: "640",
    date: "3w ago",
    caption: "Pierced stone jaali lattice overlooking the mountain slopes. Optical geometry in harsh noon light.",
    permalink: "https://www.instagram.com/clicks.dcac/",
  },
  {
    id: "ig-6",
    title: "Yamuna Ghat Sunrise",
    image: "/photos/yamuna-ghat-dawn.jpg",
    likes: "512",
    date: "1m ago",
    caption: "The river doesn't ask for permission to turn into mist. October photowalk highlights.",
    permalink: "https://www.instagram.com/clicks.dcac/",
  },
];
