/**
 * CLICKS DCAC — COMPETITION TRACKER DATA
 * All competition history and upcoming recommendations.
 * Current as of October 2026.
 */

export interface CompetitionRecord {
  id: string;
  competition: string;
  institution: string;
  year: string;
  result: '1st' | '2nd' | '3rd' | 'Won' | 'Finalist' | 'Participated';
  resultLabel: string;
  students: string[]; // actual student names from roster
  notes: string;
  category: 'inter-college' | 'national' | 'intra-college' | 'online';
}

export interface UpcomingCompetition {
  id: string;
  name: string;
  organizer: string;
  theme?: string;
  deadline: string;
  resultDate?: string;
  prizePool?: string;
  submissionFormat: string; // 'online' | 'physical' | 'on-spot'
  eligibility: string;
  link?: string;
  tags: string[];
  status: 'open' | 'closing-soon' | 'announced' | 'ongoing';
}

/* =====================================================================
 * COMPETITION HISTORY — KNOWN RESULTS
 * ===================================================================== */
export const COMPETITION_HISTORY: CompetitionRecord[] = [
  {
    id: 'comp-lsr-prakirti',
    competition: 'Prakirti Photography Competition',
    institution: 'Lady Shri Ram College (LSR)',
    year: '[PLACEHOLDER: Year]',
    result: '2nd',
    resultLabel: '2nd Place',
    students: ['[PLACEHOLDER: Winning Student Name]'],
    notes: '2nd position at Prakirti, one of Delhi University\'s most prestigious inter-college fest competitions.',
    category: 'inter-college',
  },
  {
    id: 'comp-mlnc-spoton',
    competition: 'Spot On Photography Competition',
    institution: 'Motilal Nehru College (MLNC)',
    year: '[PLACEHOLDER: Year]',
    result: '1st',
    resultLabel: '1st Place',
    students: ['[PLACEHOLDER: Winning Student Name]'],
    notes: 'Gold at MLNC\'s on-the-spot photography clash. First place in competitive field.',
    category: 'inter-college',
  },
  {
    id: 'comp-ipcw',
    competition: 'Photography Competition',
    institution: 'IP College for Women (IPCW)',
    year: '[PLACEHOLDER: Year]',
    result: '2nd',
    resultLabel: '2nd Place',
    students: ['[PLACEHOLDER: Winning Student Name]'],
    notes: 'Silver position at IPCW inter-college photography event.',
    category: 'inter-college',
  },
  {
    id: 'comp-dcac-dharohar',
    competition: 'Dharohar College Photography Competition',
    institution: 'DCAC (Intra-College)',
    year: '[PLACEHOLDER: Year]',
    result: '1st',
    resultLabel: '1st Place',
    students: ['[PLACEHOLDER: Winning Student Name]'],
    notes: 'Won DCAC\'s own flagship photography competition Dharohar. Highest honour in intra-college circuit.',
    category: 'intra-college',
  },
  {
    id: 'comp-iitk',
    competition: 'Photography Competition',
    institution: 'IIT Kanpur',
    year: '[PLACEHOLDER: Year]',
    result: 'Won',
    resultLabel: 'Won',
    students: ['[PLACEHOLDER: Winning Student Name]'],
    notes: 'Competed and won at the national level IIT Kanpur photography competition against top technical institutes.',
    category: 'national',
  },
];

/* =====================================================================
 * UPCOMING / LIVE COMPETITIONS — 2026/2027 CIRCUIT
 * All competitions are India-based and open to college students.
 * ===================================================================== */
export const UPCOMING_COMPETITIONS: UpcomingCompetition[] = [
  {
    id: 'up-ipf-portrait-2026',
    name: 'Indian Photo Festival (IPF) — National Portrait Prize 2026',
    organizer: 'India Photo Festival, Hyderabad',
    theme: 'Portrait — Essence of a Person, Culture or Time',
    deadline: 'November 20, 2026',
    resultDate: 'December 2026 (Exhibition Opens)',
    prizePool: '₹50,000 + Camera Gear + National Exhibition Feature',
    submissionFormat: 'online',
    eligibility: 'Open to all photographers in the Indian subcontinent, 18+',
    link: 'https://www.indianphotofestival.in',
    tags: ['National', 'Cash Prize', 'Exhibition', 'Portrait', 'Hyderabad'],
    status: 'closing-soon',
  },
  {
    id: 'up-drishya-iim-rohtak-2026',
    name: 'Drishya — National Photography Competition 2026',
    organizer: 'ExploR Club, IIM Rohtak',
    theme: 'Street Photography — India\'s Visual Landscape',
    deadline: 'December 15, 2026',
    prizePool: 'Cash prizes ₹25,000 + National Certificates',
    submissionFormat: 'online',
    eligibility: 'Open to all college students across India',
    link: 'https://unstop.com',
    tags: ['National', 'IIM', 'Street Photography', 'Unstop'],
    status: 'open',
  },
  {
    id: 'up-indiLens-miranda-2026',
    name: 'IN-DI-LENS Photography Competition 2026',
    organizer: 'Miranda House, University of Delhi',
    theme: 'India\'s Past, Present & Future — Capture the Convergence',
    deadline: 'November 28, 2026',
    prizePool: 'Trophies + Certificates + ₹15,000 Cash Pool',
    submissionFormat: 'online',
    eligibility: 'College students across India (DU students eligible)',
    link: 'https://unstop.com',
    tags: ['Delhi University', 'Inter-College', 'National Identity', 'Unstop'],
    status: 'open',
  },
  {
    id: 'up-fip-quarterly-2026',
    name: 'Federation of Indian Photography (FIP) — National Salon 2026',
    organizer: 'Federation of Indian Photography (FIP)',
    theme: 'Open Theme — Nature, Wildlife, Portrait, Street',
    deadline: 'December 31, 2026',
    resultDate: 'January 2027',
    prizePool: 'FIP Gold / Silver / Bronze medals + FIAP international patronage',
    submissionFormat: 'online',
    eligibility: 'Open to all photographers in India. Student division included.',
    link: 'https://www.fip.org.in',
    tags: ['National', 'FIAP Accredited', 'Multiple Categories', 'Medals'],
    status: 'open',
  },
  {
    id: 'up-du-annual-flower-show-2027',
    name: 'DU Annual Flower Show — On-the-Spot Photography 2027',
    organizer: 'University of Delhi (Culture Council)',
    theme: 'Flora & Biodiversity of Delhi — On the Spot',
    deadline: 'February 2027 (Registration at Gautam Buddha Garden, North Campus)',
    prizePool: 'Vice-Chancellor Trophy + University Certificates',
    submissionFormat: 'on-spot',
    eligibility: 'DU Community Category (DU students/staff) + General Open Category',
    link: 'https://culturecouncil.du.ac.in',
    tags: ['Delhi University', 'On-Spot', 'DU Exclusive', 'Nature'],
    status: 'announced',
  },
  {
    id: 'up-dusf-npc-2026',
    name: 'National Photography Competition (NPC) 2026',
    organizer: 'DU Sustainability Forum, Shaheed Bhagat Singh College',
    theme: 'Resilient India — Indigenous Wisdom & Sustainable Practices',
    deadline: 'November 30, 2026',
    prizePool: 'Cash Prizes + Featured in Annual DU Exhibition',
    submissionFormat: 'online',
    eligibility: 'Open to undergraduate and postgraduate students across India',
    link: 'https://unstop.com',
    tags: ['Delhi University', 'National', 'Sustainability', 'Unstop'],
    status: 'open',
  },
  {
    id: 'up-wpo-student-2027',
    name: 'Sony World Photography Awards — Student Competition 2027',
    organizer: 'World Photography Organisation (WPO)',
    theme: 'In a Changing World — Student Photo Story',
    deadline: 'January 10, 2027',
    resultDate: 'April 2027',
    prizePool: 'Top Sony digital imaging kit for college + London exhibition feature',
    submissionFormat: 'online',
    eligibility: 'Students aged 18–30 enrolled in any college/university program. 100% Free.',
    link: 'https://www.worldphoto.org/sony-world-photography-awards/student',
    tags: ['International', 'Free Entry', 'Sony Imaging Kit', 'Students Only'],
    status: 'announced',
  },
];
