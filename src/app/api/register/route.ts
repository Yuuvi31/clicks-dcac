import { NextResponse } from 'next/server';
import { createApplicant } from '@/lib/db';
import { Gender, GearCategory } from '@/types/backend';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      gender,
      courseYear,
      rollNo,
      cameraGear,
      gearCategory,
      primaryGenre,
      portfolioUrl,
      statement,
    } = body;

    // Validation
    if (!fullName || !email || !phone || !courseYear || !statement) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (Name, Email, WhatsApp, Course, and Statement).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const applicant = await createApplicant({
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      gender: (gender as Gender) || 'Prefer not to say',
      courseYear: String(courseYear).trim(),
      rollNo: rollNo ? String(rollNo).trim() : undefined,
      cameraGear: cameraGear ? String(cameraGear).trim() : 'Smartphone / Mobile Camera',
      gearCategory: (gearCategory as GearCategory) || 'Smartphone (Manual/Pro)',
      primaryGenre: primaryGenre ? String(primaryGenre).trim() : 'Street',
      portfolioUrl: portfolioUrl ? String(portfolioUrl).trim() : '',
      statement: String(statement).trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your registration dossier has been formally recorded.',
        application: {
          applicationNo: applicant.applicationNo,
          fullName: applicant.fullName,
          createdAt: applicant.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration API Error:', error);
    return NextResponse.json(
      { error: 'Internal system error recording frame dossier. Please try again.' },
      { status: 500 }
    );
  }
}
