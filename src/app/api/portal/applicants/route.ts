import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';
import { getAllApplicants, updateApplicant, deleteApplicant } from '@/lib/db';
import { ROLE_PERMISSIONS } from '@/types/backend';

export const dynamic = 'force-dynamic';

async function getSession(request: Request) {
  const cookieStore = cookies();
  const token =
    cookieStore.get(COOKIE_NAME)?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) return null;
  return await verifySessionToken(token);
}

export async function GET(request: Request) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Council login required.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const status = searchParams.get('status') || 'ALL';
    const gear = searchParams.get('gear') || 'ALL';
    const genre = searchParams.get('genre') || 'ALL';

    const all = await getAllApplicants();

    // Compute live dashboard metrics
    const stats = {
      total: all.length,
      pending: all.filter((a) => a.status === 'PENDING').length,
      shortlisted: all.filter((a) => a.status === 'SHORTLISTED').length,
      selected: all.filter((a) => a.status === 'SELECTED').length,
      rejected: all.filter((a) => a.status === 'REJECTED').length,
      male: all.filter((a) => a.gender === 'Male').length,
      female: all.filter((a) => a.gender === 'Female').length,
      otherGender: all.filter((a) => a.gender !== 'Male' && a.gender !== 'Female').length,
      dslrCount: all.filter((a) => a.gearCategory === 'DSLR / Mirrorless').length,
      filmCount: all.filter((a) => a.gearCategory === '35mm Analog Film').length,
      phoneCount: all.filter((a) => a.gearCategory === 'Smartphone (Manual/Pro)').length,
      noGearCount: all.filter((a) => a.gearCategory === 'No Gear (Eager to Learn)').length,
    };

    // Filter applicants
    const filtered = all.filter((applicant) => {
      if (status !== 'ALL' && applicant.status !== status) return false;
      if (gear !== 'ALL' && applicant.gearCategory !== gear) return false;
      if (genre !== 'ALL' && applicant.primaryGenre.toLowerCase() !== genre.toLowerCase()) return false;
      if (search) {
        const matchesName = applicant.fullName.toLowerCase().includes(search);
        const matchesEmail = applicant.email.toLowerCase().includes(search);
        const matchesPhone = applicant.phone.includes(search);
        const matchesAppNo = applicant.applicationNo.toLowerCase().includes(search);
        const matchesCourse = applicant.courseYear.toLowerCase().includes(search);
        const matchesGear = applicant.cameraGear.toLowerCase().includes(search);
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesAppNo && !matchesCourse && !matchesGear) {
          return false;
        }
      }
      return true;
    });

    return NextResponse.json({
      applicants: filtered,
      stats,
      userRole: session.role,
      permissions: ROLE_PERMISSIONS[session.role],
    });
  } catch (error) {
    console.error('Portal applicants GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch applicants' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const permissions = ROLE_PERMISSIONS[session.role];
    const { id, status, rating, internalNotes } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Applicant ID is required.' }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};

    // Check status change permission
    if (status !== undefined) {
      if (!permissions.canChangeStatus) {
        return NextResponse.json(
          { error: 'Permission denied: Only President, VP, and General Secretary can change candidate status.' },
          { status: 403 }
        );
      }
      updates.status = status;
    }

    // Check rating permission
    if (rating !== undefined) {
      if (!permissions.canAssignRating) {
        return NextResponse.json({ error: 'Permission denied to rate applicants.' }, { status: 403 });
      }
      updates.rating = rating;
    }

    // Check notes permission
    if (internalNotes !== undefined) {
      if (!permissions.canEditNotes) {
        return NextResponse.json({ error: 'Permission denied to add notes.' }, { status: 403 });
      }
      updates.internalNotes = internalNotes;
    }

    // Stamp who reviewed
    updates.reviewedBy = `${session.name}`;

    const updated = await updateApplicant(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Applicant not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, applicant: updated });
  } catch (error) {
    console.error('Portal applicants PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update applicant.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const permissions = ROLE_PERMISSIONS[session.role];
    if (!permissions.canDeleteApplicant) {
      return NextResponse.json(
        { error: 'Strict Permission Error: Only the Society President has authority to delete student dossiers.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Applicant ID is required.' }, { status: 400 });
    }

    const success = await deleteApplicant(id);
    if (!success) {
      return NextResponse.json({ error: 'Applicant not found or could not be removed.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Applicant dossier permanently removed from records.' });
  } catch (error) {
    console.error('Portal applicants DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete applicant.' }, { status: 500 });
  }
}
