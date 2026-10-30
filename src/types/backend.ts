export type CouncilRole = 'PRESIDENT' | 'VICE_PRESIDENT' | 'GENERAL_SECRETARY' | 'CORE_EXECUTIVE';

export type ApplicationStatus = 'PENDING' | 'SHORTLISTED' | 'SELECTED' | 'REJECTED';

export type Gender = 'Male' | 'Female' | 'Non-Binary' | 'Prefer not to say';

export type GearCategory =
  | 'DSLR / Mirrorless'
  | '35mm Analog Film'
  | 'Smartphone (Manual/Pro)'
  | 'Point & Shoot'
  | 'No Gear (Eager to Learn)';

export interface Applicant {
  id: string;
  applicationNo: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  courseYear: string;
  rollNo?: string;
  cameraGear: string;
  gearCategory: GearCategory;
  primaryGenre: string;
  portfolioUrl: string;
  statement: string;
  status: ApplicationStatus;
  rating?: number; // 1 to 5
  internalNotes?: string;
  reviewedBy?: string;
  createdAt: string;
  updatedAt: string;
  councilRole?: string; // set only for core team members
}

export interface CouncilUser {
  id: string;
  email: string;
  name: string;
  role: CouncilRole;
  passwordHash: string;
  lastLogin?: string;
}

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  role: CouncilRole;
}

// Role-based capabilities
export const ROLE_PERMISSIONS = {
  PRESIDENT: {
    canViewAll: true,
    canChangeStatus: true,
    canEditNotes: true,
    canAssignRating: true,
    canExportExcel: true,
    canDeleteApplicant: true,
    canManageCouncil: true,
    label: 'President (Full Control)',
    badgeColor: 'bg-[#B3141B] text-white',
  },
  VICE_PRESIDENT: {
    canViewAll: true,
    canChangeStatus: true,
    canEditNotes: true,
    canAssignRating: true,
    canExportExcel: true,
    canDeleteApplicant: false,
    canManageCouncil: false,
    label: 'Vice President',
    badgeColor: 'bg-[#8a1419] text-white',
  },
  GENERAL_SECRETARY: {
    canViewAll: true,
    canChangeStatus: true,
    canEditNotes: true,
    canAssignRating: true,
    canExportExcel: true,
    canDeleteApplicant: false,
    canManageCouncil: false,
    label: 'General Secretary',
    badgeColor: 'bg-[#402022] text-[#ff8085]',
  },
  CORE_EXECUTIVE: {
    canViewAll: true,
    canChangeStatus: false,
    canEditNotes: true,
    canAssignRating: true,
    canExportExcel: false,
    canDeleteApplicant: false,
    canManageCouncil: false,
    label: 'Core Executive (Evaluator)',
    badgeColor: 'bg-[#1e1e1e] text-[#aaa]',
  },
} as const;
