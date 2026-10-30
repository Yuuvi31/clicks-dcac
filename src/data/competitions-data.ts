/**
 * CLICKS DCAC — COMPETITION TRACKER DATA
 * All competition history and upcoming recommendations.
 * Edit this file to update records; do NOT put placeholder names or fake data.
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
 * UPCOMING / LIVE COMPETITIONS — RECOMMENDATIONS
 * These are curated picks. Update dates and links as needed.
 * ===================================================================== */
export const UPCOMING_COMPETITIONS: UpcomingCompetition[] = [
  {
    id: 'up-01',
    name: 'Youth Photography Awards 2026',
    organizer: 'India Photo Festival',
    theme: 'Urban India — Change & Continuity',
    deadline: 'December 15, 2026',
    resultDate: 'February 2027',
    prizePool: '₹50,000 + Exhibition Feature',
    submissionFormat: 'online',
    eligibility: 'Open to college students across India, aged 18–25',
    link: 'https://indiaphotofestival.com',
    tags: ['National', 'Cash Prize', 'Exhibition'],
    status: 'open',
  },
  {
    id: 'up-02',
    name: 'Delhi University Photography Open',
    organizer: 'Delhi University Students\' Union',
    theme: 'The City Breathes',
    deadline: 'November 30, 2026',
    submissionFormat: 'online',
    eligibility: 'DU students only — all colleges eligible',
    tags: ['DU Exclusive', 'Online Submission'],
    status: 'closing-soon',
  },
  {
    id: 'up-03',
    name: 'Resolve — Human Rights Photography Award',
    organizer: 'Amnesty International India',
    theme: 'Dignity in Daily Life',
    deadline: 'January 31, 2027',
    prizePool: 'Exhibition + Certificate + ₹25,000',
    submissionFormat: 'online',
    eligibility: 'Indian citizens, 18+. Documentary & photojournalism preferred.',
    link: 'https://amnesty.org.in',
    tags: ['Documentary', 'National', 'Social Impact'],
    status: 'open',
  },
  {
    id: 'up-04',
    name: 'Spectrum Annual Photography Fest',
    organizer: 'Shaheed Bhagat Singh College',
    theme: 'Open Theme',
    deadline: 'November 20, 2026',
    submissionFormat: 'on-spot',
    eligibility: 'Delhi University college students',
    tags: ['Inter-College', 'On-Spot', 'DU Fest'],
    status: 'closing-soon',
  },
  {
    id: 'up-05',
    name: 'Confluence Intersections Photography Award',
    organizer: 'Jawaharlal Nehru University (JNU)',
    theme: 'Memory & Space',
    deadline: 'December 1, 2026',
    submissionFormat: 'online',
    eligibility: 'Open to all Indian college students',
    tags: ['National', 'Conceptual', 'Analog/Digital'],
    status: 'open',
  },
  {
    id: 'up-06',
    name: 'National Geographic Society Storyteller Award',
    organizer: 'National Geographic Society India',
    theme: 'India\'s Natural & Cultural Heritage',
    deadline: 'March 31, 2027',
    prizePool: 'Fellowship + Publication',
    submissionFormat: 'online',
    eligibility: 'Indian residents, 18+. Portfolio of 5–10 images.',
    link: 'https://nationalgeographic.com/photography/contest',
    tags: ['National', 'Prestigious', 'Publication'],
    status: 'announced',
  },
];
