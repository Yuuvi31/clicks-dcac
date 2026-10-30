import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { Applicant, CouncilUser, ApplicationStatus } from '@/types/backend';
import { getRosterAsApplicants } from '@/data/society-members';

// Detect Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!)
  : null;

// Initial Seed Council Users (DCAC Council Executives)
// Credentials: username = prez | viceprez | gensec | core  (password = same as username)
export const INITIAL_COUNCIL_USERS: CouncilUser[] = [
  {
    id: 'user-pres-01',
    email: 'prez',
    name: 'Artika Jain',
    role: 'PRESIDENT',
    passwordHash: 'd44107d93a6796d761373e03d693fd9fa5607d7da73d62c1907cd74b4dbff609', // prez
  },
  {
    id: 'user-vp-01',
    email: 'viceprez',
    name: 'Asin V. Jose',
    role: 'VICE_PRESIDENT',
    passwordHash: '9946d68ea54426cbe97d24818fb4dc81ba4af75c825425b9a158828e83b211d0', // viceprez
  },
  {
    id: 'user-gs-01',
    email: 'gensec',
    name: 'Zidan Ahmad',
    role: 'GENERAL_SECRETARY',
    passwordHash: 'c02152d4fa7fe052e30f4f4923facb577e8b671facc938af43c684585f2d4da6', // gensec
  },
  {
    id: 'user-core-01',
    email: 'core',
    name: 'Core Member',
    role: 'CORE_EXECUTIVE',
    passwordHash: '4c7d6dc64004ccab08df1c43ef417477e1019f74054cf8a60757b5d058e8a03c', // core
  },
];

// Sample seed applicants showing Delhi student diversity, equipment, and genres
const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: 'app-clk-001',
    applicationNo: 'CLK-2026-0001',
    fullName: 'Aarav Mehta',
    email: 'aarav.m@dcac.du.ac.in',
    phone: '+91 98112 34567',
    gender: 'Male',
    courseYear: 'B.A. (Hons) Journalism - 1st Year',
    rollNo: '24/JOU/042',
    cameraGear: 'Fujifilm X-T30 II • 35mm f/2',
    gearCategory: 'DSLR / Mirrorless',
    primaryGenre: 'Street & Documentary',
    portfolioUrl: 'https://instagram.com/aarav.street',
    statement: 'Noticing is freezing the subtle tension in Old Delhi alleys before it dissipates into the dust.',
    status: 'SHORTLISTED',
    rating: 5,
    internalNotes: 'Impressive framing in narrow light shafts. Strong candidate for street photowalk team.',
    reviewedBy: 'Artika Mimi Jain (President)',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'app-clk-002',
    applicationNo: 'CLK-2026-0002',
    fullName: 'Ananya Sharma',
    email: 'ananya.s@dcac.du.ac.in',
    phone: '+91 98710 88219',
    gender: 'Female',
    courseYear: 'B.Com (Hons) - 2nd Year',
    rollNo: '23/BCH/115',
    cameraGear: 'Canon EOS 200D II • 50mm f/1.8',
    gearCategory: 'DSLR / Mirrorless',
    primaryGenre: 'Portraits & Human Geography',
    portfolioUrl: 'https://drive.google.com/drive/folders/sample-ananya',
    statement: 'Every stranger on the metro has a face telling ten unwritten novels. I aim to capture their silence.',
    status: 'SELECTED',
    rating: 5,
    internalNotes: 'Great portrait tone and understanding of natural backlight. Selected for exhibition curation.',
    reviewedBy: 'Jose Asin V. (Vice President)',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'app-clk-003',
    applicationNo: 'CLK-2026-0003',
    fullName: 'Rohan Verma',
    email: 'rohan.v@dcac.du.ac.in',
    phone: '+91 99581 22340',
    gender: 'Male',
    courseYear: 'B.A. Programme - 1st Year',
    rollNo: '24/BAP/204',
    cameraGear: 'iPhone 15 Pro (ProRAW & Halide app)',
    gearCategory: 'Smartphone (Manual/Pro)',
    primaryGenre: 'Architecture & Shadows',
    portfolioUrl: 'https://instagram.com/rohan_frames',
    statement: 'Great photography isn’t about camera price tag, it is about being awake while the world is distracted.',
    status: 'PENDING',
    rating: 4,
    internalNotes: 'Good mobile composition. Call for portfolio walk round.',
    reviewedBy: 'Zidan Ahmad (General Secretary)',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'app-clk-004',
    applicationNo: 'CLK-2026-0004',
    fullName: 'Isha Nair',
    email: 'isha.nair@dcac.du.ac.in',
    phone: '+91 97177 55431',
    gender: 'Female',
    courseYear: 'B.A. (Hons) English - 1st Year',
    rollNo: '24/ENG/018',
    cameraGear: 'Pentax K1000 • 50mm (Analog Film 35mm)',
    gearCategory: '35mm Analog Film',
    primaryGenre: 'Experimental & Film Grain',
    portfolioUrl: 'https://drive.google.com/drive/folders/isha-pentax',
    statement: 'Silver halide film teaches discipline — 36 exposures means you make every shutter press matter.',
    status: 'SHORTLISTED',
    rating: 5,
    internalNotes: 'Genuine darkroom enthusiast. Excellent fit for society analog workshops.',
    reviewedBy: 'Artika Mimi Jain (President)',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: 'app-clk-005',
    applicationNo: 'CLK-2026-0005',
    fullName: 'Karanvir Singh',
    email: 'karanvir.s@dcac.du.ac.in',
    phone: '+91 98990 11223',
    gender: 'Male',
    courseYear: 'B.Com - 1st Year',
    rollNo: '24/BCM/302',
    cameraGear: 'No DSLR yet, Samsung Galaxy S23',
    gearCategory: 'No Gear (Eager to Learn)',
    primaryGenre: 'Culture & Daily Life',
    portfolioUrl: 'https://instagram.com/karan_snaps',
    statement: 'I want to learn camera metering, exposure triangles, and how to compose stories like CLICKS exhibitions.',
    status: 'PENDING',
    rating: 3,
    internalNotes: 'Eager beginner. Invite to orientation photowalk.',
    reviewedBy: 'Pratya (Core Executive)',
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    updatedAt: new Date(Date.now() - 14400000).toISOString(),
  },
];

// Combined initial roster and applicant records
const ALL_SEED_APPLICANTS: Applicant[] = [
  ...getRosterAsApplicants(),
  ...INITIAL_APPLICANTS,
];

// Persistent File Storage Path for Local Dev / Non-Supabase environments
const DATA_DIR = path.resolve(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'applicants.json');
const USERS_FILE = path.join(DATA_DIR, 'council_users.json');

// In-Memory fallback cache
let memoryApplicants: Applicant[] = [...ALL_SEED_APPLICANTS];
let memoryUsers: CouncilUser[] = [...INITIAL_COUNCIL_USERS];

function ensureFileStorage() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      memoryApplicants = [...ALL_SEED_APPLICANTS];
      fs.writeFileSync(DATA_FILE, JSON.stringify(memoryApplicants, null, 2), 'utf-8');
    } else {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const loaded: Applicant[] = JSON.parse(data);
      // Merge in any missing roster students automatically
      const existingIds = new Set(loaded.map((a) => a.id));
      const missing = ALL_SEED_APPLICANTS.filter((a) => !existingIds.has(a.id));
      memoryApplicants = [...loaded, ...missing];
      if (missing.length > 0) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(memoryApplicants, null, 2), 'utf-8');
      }
    }

    if (!fs.existsSync(USERS_FILE)) {
      memoryUsers = [...INITIAL_COUNCIL_USERS];
      fs.writeFileSync(USERS_FILE, JSON.stringify(INITIAL_COUNCIL_USERS, null, 2), 'utf-8');
    } else {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      const loadedUsers: CouncilUser[] = JSON.parse(data);
      const existingEmails = new Set(loadedUsers.map((u) => u.email.toLowerCase()));
      const missingUsers = INITIAL_COUNCIL_USERS.filter((u) => !existingEmails.has(u.email.toLowerCase()));
      memoryUsers = [...loadedUsers, ...missingUsers];
      if (missingUsers.length > 0) {
        fs.writeFileSync(USERS_FILE, JSON.stringify(memoryUsers, null, 2), 'utf-8');
      }
    }
  } catch (err) {
    // In serverless read-only contexts, fallback seamlessly to in-memory
    console.warn('File storage note:', err);
    memoryApplicants = [...ALL_SEED_APPLICANTS];
    memoryUsers = [...INITIAL_COUNCIL_USERS];
  }
}

// Initialize on module load
ensureFileStorage();

function saveLocalApplicants() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(memoryApplicants, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write to local file (serverless memory active):', err);
  }
}

function saveLocalUsers() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(USERS_FILE, JSON.stringify(memoryUsers, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write to local file (serverless memory active):', err);
  }
}

// Convert Supabase DB snake_case row to Applicant
function mapDbToApplicant(row: Record<string, unknown>): Applicant {
  return {
    id: String(row.id),
    applicationNo: String(row.application_no || `CLK-2026-${String(row.id).slice(0, 4)}`),
    fullName: String(row.full_name || ''),
    email: String(row.email || ''),
    phone: String(row.phone || ''),
    gender: (row.gender as Applicant['gender']) || 'Prefer not to say',
    courseYear: String(row.course_year || ''),
    rollNo: row.roll_no ? String(row.roll_no) : undefined,
    cameraGear: String(row.camera_gear || ''),
    gearCategory: (row.gear_category as Applicant['gearCategory']) || 'DSLR / Mirrorless',
    primaryGenre: String(row.primary_genre || 'Street'),
    portfolioUrl: String(row.portfolio_url || ''),
    statement: String(row.statement || ''),
    status: (row.status as ApplicationStatus) || 'PENDING',
    rating: row.rating ? Number(row.rating) : undefined,
    internalNotes: row.internal_notes ? String(row.internal_notes) : undefined,
    reviewedBy: row.reviewed_by ? String(row.reviewed_by) : undefined,
    createdAt: String(row.created_at || new Date().toISOString()),
    updatedAt: String(row.updated_at || new Date().toISOString()),
  };
}

/* =====================================================================
 * PUBLIC DATABASE APIS
 * ===================================================================== */

export async function getAllApplicants(): Promise<Applicant[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(mapDbToApplicant);
      }
    } catch (err) {
      console.error('Supabase query error, falling back to local store:', err);
    }
  }

  return [...memoryApplicants].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createApplicant(
  applicantData: Omit<Applicant, 'id' | 'applicationNo' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<Applicant> {
  const count = memoryApplicants.length + 1;
  const applicationNo = `CLK-2026-${String(count).padStart(4, '0')}`;
  const now = new Date().toISOString();

  const newApplicant: Applicant = {
    ...applicantData,
    id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    applicationNo,
    status: 'PENDING',
    createdAt: now,
    updatedAt: now,
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([
          {
            application_no: applicationNo,
            full_name: newApplicant.fullName,
            email: newApplicant.email,
            phone: newApplicant.phone,
            gender: newApplicant.gender,
            course_year: newApplicant.courseYear,
            roll_no: newApplicant.rollNo || null,
            camera_gear: newApplicant.cameraGear,
            gear_category: newApplicant.gearCategory,
            primary_genre: newApplicant.primaryGenre,
            portfolio_url: newApplicant.portfolioUrl,
            statement: newApplicant.statement,
            status: 'PENDING',
          },
        ])
        .select()
        .single();

      if (!error && data) {
        const created = mapDbToApplicant(data);
        memoryApplicants.unshift(created);
        saveLocalApplicants();
        return created;
      }
    } catch (err) {
      console.error('Supabase insert failed, saving to local store:', err);
    }
  }

  memoryApplicants.unshift(newApplicant);
  saveLocalApplicants();
  return newApplicant;
}

export async function updateApplicant(
  id: string,
  updates: Partial<Pick<Applicant, 'status' | 'rating' | 'internalNotes' | 'reviewedBy'>>
): Promise<Applicant | null> {
  const now = new Date().toISOString();

  if (supabase) {
    try {
      const dbUpdates: Record<string, unknown> = { updated_at: now };
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.rating !== undefined) dbUpdates.rating = updates.rating;
      if (updates.internalNotes !== undefined) dbUpdates.internal_notes = updates.internalNotes;
      if (updates.reviewedBy !== undefined) dbUpdates.reviewed_by = updates.reviewedBy;

      const { data, error } = await supabase
        .from('applications')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const updated = mapDbToApplicant(data);
        const idx = memoryApplicants.findIndex((a) => a.id === id);
        if (idx !== -1) memoryApplicants[idx] = updated;
        saveLocalApplicants();
        return updated;
      }
    } catch (err) {
      console.error('Supabase update failed, updating local store:', err);
    }
  }

  const index = memoryApplicants.findIndex((a) => a.id === id);
  if (index === -1) return null;

  memoryApplicants[index] = {
    ...memoryApplicants[index],
    ...updates,
    updatedAt: now,
  };

  saveLocalApplicants();
  return memoryApplicants[index];
}

export async function deleteApplicant(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('applications').delete().eq('id', id);
      if (!error) {
        memoryApplicants = memoryApplicants.filter((a) => a.id !== id);
        saveLocalApplicants();
        return true;
      }
    } catch (err) {
      console.error('Supabase delete failed, using local store:', err);
    }
  }

  const initialLen = memoryApplicants.length;
  memoryApplicants = memoryApplicants.filter((a) => a.id !== id);
  const deleted = memoryApplicants.length < initialLen;
  if (deleted) saveLocalApplicants();
  return deleted;
}

export async function getCouncilUserByEmail(email: string): Promise<CouncilUser | null> {
  const cleanEmail = email.trim().toLowerCase();
  const user = memoryUsers.find((u) => u.email.toLowerCase() === cleanEmail);
  if (user) {
    user.lastLogin = new Date().toISOString();
    saveLocalUsers();
  }
  return user || null;
}
