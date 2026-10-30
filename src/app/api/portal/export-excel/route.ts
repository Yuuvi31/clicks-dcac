import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as XLSX from 'xlsx';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';
import { getAllApplicants } from '@/lib/db';
import { ROLE_PERMISSIONS } from '@/types/backend';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token =
      cookieStore.get(COOKIE_NAME)?.value ||
      request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const permissions = ROLE_PERMISSIONS[session.role];
    if (!permissions.canExportExcel) {
      return NextResponse.json(
        { error: 'Permission denied: Core Executives cannot export society dossiers to Excel.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const rosterType = searchParams.get('roster') || 'ALL';
    const status = searchParams.get('status') || 'ALL';

    let applicants = await getAllApplicants();

    if (rosterType === 'MEMBERS') {
      applicants = applicants.filter((a) => a.applicationNo.startsWith('CLK-MEM-'));
    } else if (rosterType === 'RECRUITS') {
      applicants = applicants.filter((a) => !a.applicationNo.startsWith('CLK-MEM-'));
    } else if (rosterType === '1st') {
      applicants = applicants.filter((a) => a.courseYear.includes('1st') || a.courseYear.includes('1 '));
    } else if (rosterType === '2nd') {
      applicants = applicants.filter((a) => a.courseYear.includes('2nd') || a.courseYear.includes('2 '));
    } else if (rosterType === '3rd') {
      applicants = applicants.filter((a) => a.courseYear.includes('3rd') || a.courseYear.includes('3 '));
    }

    if (status !== 'ALL') {
      applicants = applicants.filter((a) => a.status === status);
    }

    // Transform applicants to formatted Excel rows
    const rows = applicants.map((a, index) => {
      const dateObj = new Date(a.createdAt);
      const formattedDate = dateObj.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const isMember = a.applicationNo.startsWith('CLK-MEM-');

      return {
        'S.No': index + 1,
        'Record Category': isMember ? 'Active Society Member' : 'New Web Applicant',
        'Application / Member ID': a.applicationNo,
        'Registered On (IST)': formattedDate,
        'Current Status': a.status,
        'Full Name': a.fullName,
        'Gender': a.gender,
        'Email Address': a.email,
        'WhatsApp Contact': a.phone,
        'Course & Year': a.courseYear,
        'College Roll No': a.rollNo || 'N/A',
        'Camera Equipment': a.cameraGear,
        'Equipment Category': a.gearCategory,
        'Primary Genre': a.primaryGenre,
        'Portfolio / Drive Link': a.portfolioUrl,
        'Candidate Statement': a.statement,
        'Internal Rating (1-5)': a.rating ? `${a.rating} / 5` : 'Not Rated',
        'Council Notes': a.internalNotes || '',
        'Reviewed By': a.reviewedBy || 'Pending Review',
      };
    });

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Set custom column widths for readability in Excel
    worksheet['!cols'] = [
      { wch: 6 },  // S.No
      { wch: 18 }, // App No
      { wch: 22 }, // Date
      { wch: 15 }, // Status
      { wch: 24 }, // Name
      { wch: 14 }, // Gender
      { wch: 28 }, // Email
      { wch: 18 }, // WhatsApp
      { wch: 28 }, // Course & Year
      { wch: 16 }, // Roll No
      { wch: 32 }, // Camera Gear
      { wch: 24 }, // Gear Category
      { wch: 22 }, // Genre
      { wch: 35 }, // Portfolio
      { wch: 45 }, // Statement
      { wch: 20 }, // Rating
      { wch: 35 }, // Notes
      { wch: 28 }, // Reviewed By
    ];

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'CLICKS Registrations');

    // Generate binary buffer
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const now = new Date();
    const dateStamp = now.toISOString().split('T')[0];
    const filename = `CLICKS_DCAC_Recruitment_${dateStamp}.xlsx`;

    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Excel Export Error:', error);
    return NextResponse.json({ error: 'Failed to generate Excel sheet.' }, { status: 500 });
  }
}
