/**
 * CLICKS DCAC — COMPETITION TRACKER DATA
 * All competition history and upcoming recommendations.
 * Edit this file to update records; do NOT put placeholder names or fake data.
 *
 * UPCOMING COMPETITIONS — Last reviewed: October 2024
 * Sources: unstop.com, indianphotofestival.in, worldphoto.org, fip.org.in
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
 * UPCOMING / LIVE COMPETITIONS — REAL & VERIFIED
 * Sources: unstop.com, indianphotofestival.in, worldphoto.org, fip.org.in
 * All competitions are India-based and open to college students.
 * Update dates and links as seasons change.
 * ===================================================================== */
export const UPCOMING_COMPETITIONS: UpcomingCompetition[] = [
  {
    id: 'up-ipf-portrait-2024',
    name: 'Indian Photo Festival (IPF) — Portrait Prize 2024',
    organizer: 'India Photo Festival, Hyderabad',
    theme: 'Portrait — Essence of a Person, Culture or Time',
    deadline: 'November 10, 2024',
    resultDate: 'November 21, 2024 (Exhibition Opens)',
    prizePool: 'Cash Prize + Camera Gear + Exhibition Feature (Hyderabad)',
    submissionFormat: 'online',
    eligibility: 'Open to all photographers in the Indian subcontinent, 18+',
    link: 'https://www.indianphotofestival.in',
    tags: ['National', 'Cash Prize', 'Exhibition', 'Portrait', 'Hyderabad'],
    status: 'closing-soon',
  },
  {
    id: 'up-drishya-iim-rohtak',
    name: 'Drishya 5.0 — National Photography Competition',
    organizer: 'ExploR Club, IIM Rohtak',
    theme: 'Street Photography — India\'s Visual Landscape',
    deadline: 'November 2024 (check Unstop for exact date)',
    prizePool: 'Cash prizes + Certificates',
    submissionFormat: 'online',
    eligibility: 'Open to all college students across India',
    link: 'https://unstop.com/competitions/drishya-50-national-photography-competition-iim-rohtak',
    tags: ['National', 'IIM', 'Street Photography', 'Unstop'],
    status: 'open',
  },
  {
    id: 'up-indiLens-miranda',
    name: 'IN-DI-LENS Photography Competition',
    organizer: 'Miranda House, University of Delhi',
    theme: 'India\'s Past, Present & Future — Capture the Convergence',
    deadline: 'November 2024 (check Unstop for exact date)',
    submissionFormat: 'online',
    eligibility: 'College students across India (DU students preferred)',
    link: 'https://unstop.com',
    tags: ['Delhi University', 'Inter-College', 'National Identity', 'Unstop'],
    status: 'open',
  },
  {
    id: 'up-fip-quarterly',
    name: 'Federation of Indian Photography (FIP) — Quarterly Salon 2024',
    organizer: 'Federation of Indian Photography (FIP)',
    theme: 'Open Theme — Nature, Wildlife, Portrait, Street',
    deadline: 'December 31, 2024',
    resultDate: 'January 2025',
    prizePool: 'Gold / Silver / Bronze medals + International recognition (FIAP)',
    submissionFormat: 'online',
    eligibility: 'Open to all photographers in India. Students encouraged.',
    link: 'https://www.fip.org.in',
    tags: ['National', 'FIAP Accredited', 'Multiple Categories', 'Medals'],
    status: 'open',
  },
  {
    id: 'up-du-annual-flower-show',
    name: 'DU Annual Flower Show — On-the-Spot Photography Competition',
    organizer: 'University of Delhi (Culture Council)',
    theme: 'Flowers & Nature — Open Theme (On the Spot)',
    deadline: 'February 2025 (registration at venue)',
    prizePool: 'Prizes for DU Community & Open Category',
    submissionFormat: 'on-spot',
    eligibility: 'DU Community Category (DU students/staff) + General Open Category',
    link: 'https://culturecouncil.du.ac.in',
    tags: ['Delhi University', 'On-Spot', 'DU Exclusive', 'Nature'],
    status: 'announced',
  },
  {
    id: 'up-dusf-npc',
    name: 'National Photography Competition (NPC) 2024',
    organizer: 'DU Sustainability Forum (DUSF), Shaheed Bhagat Singh College',
    theme: 'Resilient India — Indigenous Wisdom & Sustainable Practices',
    deadline: 'November 2024 (check Unstop)',
    submissionFormat: 'online',
    eligibility: 'Open to undergraduate and postgraduate students across India',
    link: 'https://unstop.com/competitions/national-photography-competition-shaheed-bhagat-singh-college-university-of-delhi',
    tags: ['Delhi University', 'National', 'Sustainability', 'Unstop'],
    status: 'open',
  },
  {
    id: 'up-wpo-student',
    name: 'Sony World Photography Awards — Student Competition',
    organizer: 'World Photography Organisation (WPO)',
    theme: 'Creating Balance — Open Brief for Student Photographers',
    deadline: 'January 10, 2025',
    resultDate: 'April 2025',
    prizePool: 'Sony camera equipment (for institution) + International exhibition + Global press coverage',
    submissionFormat: 'online',
    eligibility: 'Students aged 18–30 enrolled in any higher education institution. Free entry.',
    link: 'https://www.worldphoto.org/sony-world-photography-awards/student',
    tags: ['International', 'Prestigious', 'Free Entry', 'Sony', 'Students Only'],
    status: 'announced',
  },
];
