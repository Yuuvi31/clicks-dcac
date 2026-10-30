-- =====================================================================
-- CLICKS DCAC — SUPABASE POSTGRESQL SCHEMA FOR BACKEND RECRUITMENT SAAS
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- =====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_no TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  gender TEXT DEFAULT 'Prefer not to say',
  course_year TEXT NOT NULL,
  roll_no TEXT,
  camera_gear TEXT,
  gear_category TEXT DEFAULT 'Smartphone (Manual/Pro)',
  primary_genre TEXT DEFAULT 'Street',
  portfolio_url TEXT,
  statement TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SHORTLISTED', 'SELECTED', 'REJECTED')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  internal_notes TEXT,
  reviewed_by TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Indexes for fast dashboard search & filter
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications(email);

-- 4. Council Users Table
CREATE TABLE IF NOT EXISTS public.council_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('PRESIDENT', 'VICE_PRESIDENT', 'GENERAL_SECRETARY', 'CORE_EXECUTIVE')),
  password_hash TEXT NOT NULL,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 5. Seed default council users
INSERT INTO public.council_users (email, name, role, password_hash)
VALUES
  ('president@clicks-dcac.com', 'Artika Mimi Jain (President)', 'PRESIDENT', 'eaff0ea73fb25efeedb371aa34ecf368e98e3e49b253528d778fcf29c4f11e0d'),
  ('vp@clicks-dcac.com', 'Jose Asin V. (Vice President)', 'VICE_PRESIDENT', 'd1640d3944d5c539d48652200c5faa2bd80ae59f3a58b46ed8b73d3a81251c44'),
  ('gensec@clicks-dcac.com', 'Zidan Ahmad (General Secretary)', 'GENERAL_SECRETARY', '7dcd870bb6ae1b0d61af7825aab4d1df21da573a97381ad4086dc5d44b4c4557'),
  ('core@clicks-dcac.com', 'Pratya (Core Executive)', 'CORE_EXECUTIVE', '70fdc3c3815abc589e7ce37b990de48567db2d49eb8fc848d2271459549937d9')
ON CONFLICT (email) DO NOTHING;

-- 6. Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER auto_update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
