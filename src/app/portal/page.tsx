'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  ExternalLink,
  Trash2,
  LogOut,
  Camera,
  ChevronRight,
  MessageCircle,
  FileSpreadsheet,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { Applicant, CouncilRole, ApplicationStatus, ROLE_PERMISSIONS } from '@/types/backend';
import { playMechanicalClick, playShutterSnap } from '@/lib/sound';

interface CurrentUser {
  userId: string;
  email: string;
  name: string;
  role: CouncilRole;
  permissions: typeof ROLE_PERMISSIONS[CouncilRole];
}

interface DashboardStats {
  total: number;
  pending: number;
  shortlisted: number;
  selected: number;
  rejected: number;
  male: number;
  female: number;
  otherGender: number;
  dslrCount: number;
  filmCount: number;
  phoneCount: number;
  noGearCount: number;
}

export default function CouncilPortal() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Applicants & Dashboard state
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [gearFilter, setGearFilter] = useState<string>('ALL');

  // Selected dossier for modal
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [editingRating, setEditingRating] = useState<number>(0);
  const [editingStatus, setEditingStatus] = useState<ApplicationStatus>('PENDING');
  const [isSavingDossier, setIsSavingDossier] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Check auth session
  const checkSession = useCallback(async () => {
    try {
      setLoadingAuth(true);
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.authenticated && data.user) {
        setCurrentUser(data.user);
      } else {
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    } finally {
      setLoadingAuth(false);
    }
  }, []);

  // Fetch applicants
  const fetchApplicants = useCallback(async () => {
    if (!currentUser) return;
    try {
      setLoadingData(true);
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      if (gearFilter !== 'ALL') params.set('gear', gearFilter);

      const res = await fetch(`/api/portal/applicants?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setApplicants(data.applicants || []);
        setStats(data.stats || null);
      }
    } catch (err) {
      console.error('Fetch applicants error:', err);
    } finally {
      setLoadingData(false);
    }
  }, [currentUser, searchQuery, statusFilter, gearFilter]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (currentUser) {
      fetchApplicants();
    }
  }, [currentUser, fetchApplicants]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    playMechanicalClick();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication rejected.');
      }

      playShutterSnap();
      setCurrentUser(data.user);
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Quick fill demo credentials
  const fillCredentials = (email: string, pw: string) => {
    playMechanicalClick();
    setLoginEmail(email);
    setLoginPassword(pw);
  };

  // Handle Logout
  const handleLogout = async () => {
    playMechanicalClick();
    await fetch('/api/auth/logout', { method: 'POST' });
    setCurrentUser(null);
    setSelectedApplicant(null);
  };

  // Open applicant dossier modal
  const openDossier = (applicant: Applicant) => {
    playMechanicalClick();
    setSelectedApplicant(applicant);
    setEditingNotes(applicant.internalNotes || '');
    setEditingRating(applicant.rating || 0);
    setEditingStatus(applicant.status);
  };

  // Save changes to dossier
  const handleSaveDossier = async () => {
    if (!selectedApplicant || !currentUser) return;
    playMechanicalClick();
    setIsSavingDossier(true);

    try {
      const payload: Record<string, unknown> = {
        id: selectedApplicant.id,
        internalNotes: editingNotes,
        rating: editingRating || null,
      };

      if (currentUser.permissions.canChangeStatus) {
        payload.status = editingStatus;
      }

      const res = await fetch('/api/portal/applicants', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed.');

      playShutterSnap();
      setSelectedApplicant(data.applicant);
      fetchApplicants();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error updating dossier.');
    } finally {
      setIsSavingDossier(false);
    }
  };

  // Delete applicant (President only)
  const handleDeleteApplicant = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete ${name}'s application? This action cannot be undone.`)) {
      return;
    }
    playMechanicalClick();

    try {
      const res = await fetch(`/api/portal/applicants?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed.');

      playShutterSnap();
      setSelectedApplicant(null);
      fetchApplicants();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error deleting applicant.');
    }
  };

  // Export to Excel
  const handleExportExcel = async () => {
    playMechanicalClick();
    setIsExporting(true);
    try {
      const res = await fetch('/api/portal/export-excel');
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Export failed');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CLICKS_DCAC_Recruitment_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      playShutterSnap();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to export Excel.');
    } finally {
      setIsExporting(false);
    }
  };

  const statusBadges: Record<ApplicationStatus, { label: string; color: string; icon: React.ReactNode }> = {
    PENDING: { label: 'PENDING', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30', icon: <Clock size={11} /> },
    SHORTLISTED: { label: 'SHORTLISTED', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30', icon: <Sparkles size={11} /> },
    SELECTED: { label: 'SELECTED', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', icon: <CheckCircle size={11} /> },
    REJECTED: { label: 'REJECTED', color: 'bg-red-500/10 text-red-400 border-red-500/30', icon: <XCircle size={11} /> },
  };

  // If loading session
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center font-mono text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-[#B3141B] animate-pulse" />
          <span className="tracking-widest">AUTHENTICATING COUNCIL DISPATCH...</span>
        </div>
      </div>
    );
  }

  // 1. LOGIN SCREEN IF NOT AUTHENTICATED
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f4f1ea] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
        {/* Ambient Darkroom Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B3141B]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Header */}
        <div className="flex justify-between items-center z-10 border-b border-[#1c1c1c] pb-4">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-[#B3141B]" />
            <span className="font-mono text-xs tracking-[0.25em] text-white uppercase font-bold">
              CLICKS // COUNCIL DISPATCH PORTAL
            </span>
          </div>
          <Link
            href="/"
            className="font-mono text-[10px] text-[#777] hover:text-white transition-colors tracking-widest"
          >
            ← RETURN TO HOMEPAGE
          </Link>
        </div>

        {/* Central Terminal Form */}
        <div className="max-w-md w-full mx-auto my-12 z-10 bg-[#0c0c0c] border border-[#242424] p-8 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-[#202020] pb-4 mb-6">
            <div className="flex items-center space-x-2">
              <Shield size={16} className="text-[#B3141B]" />
              <h1 className="font-mono text-xs tracking-[0.2em] uppercase text-white font-bold">
                COUNCIL AUTHORIZATION
              </h1>
            </div>
            <span className="font-mono text-[9px] text-[#555]">SECURITY GATE</span>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-[#B3141B]/15 border border-[#B3141B] text-[#ff8085] font-mono text-xs flex items-center space-x-2">
              <AlertTriangle size={14} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="block font-mono text-[10px] uppercase text-[#777] tracking-wider">
                Council Official Email
              </label>
              <input
                type="email"
                required
                placeholder="role@clicks-dcac.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-[#121212] border border-[#282828] focus:border-[#B3141B] text-white px-3 py-2.5 font-mono text-xs focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-[10px] uppercase text-[#777] tracking-wider">
                Council Password Key
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-[#121212] border border-[#282828] focus:border-[#B3141B] text-white px-3 py-2.5 font-mono text-xs focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-[#B3141B] hover:bg-[#c91820] text-white font-mono text-xs tracking-[0.2em] uppercase font-bold transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
            >
              <Lock size={13} />
              <span>{isLoggingIn ? 'AUTHENTICATING...' : 'ENTER DISPATCH TERMINAL'}</span>
            </button>
          </form>

          {/* Hierarchy Quick Credentials (For instant evaluation) */}
          <div className="mt-8 pt-6 border-t border-[#1c1c1c] space-y-3">
            <div className="flex justify-between items-center font-mono text-[9px] text-[#666]">
              <span className="uppercase tracking-widest">TEST COUNCIL ROLES:</span>
              <span>1-CLICK AUTOFILL</span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
              <button
                type="button"
                onClick={() => fillCredentials('president@clicks-dcac.com', 'clicks2026!president')}
                className="p-2 bg-[#121212] border border-[#242424] hover:border-[#B3141B] text-left transition-colors"
              >
                <div className="text-white font-bold">President</div>
                <div className="text-[8px] text-[#B3141B]">Full Control</div>
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('vp@clicks-dcac.com', 'clicks2026!vp')}
                className="p-2 bg-[#121212] border border-[#242424] hover:border-[#B3141B] text-left transition-colors"
              >
                <div className="text-white font-bold">Vice President</div>
                <div className="text-[8px] text-[#888]">Elevated Access</div>
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('gensec@clicks-dcac.com', 'clicks2026!gensec')}
                className="p-2 bg-[#121212] border border-[#242424] hover:border-[#B3141B] text-left transition-colors"
              >
                <div className="text-white font-bold">Gen Secretary</div>
                <div className="text-[8px] text-[#888]">Elevated Access</div>
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('core@clicks-dcac.com', 'clicks2026!core')}
                className="p-2 bg-[#121212] border border-[#242424] hover:border-[#B3141B] text-left transition-colors"
              >
                <div className="text-white font-bold">Core Executive</div>
                <div className="text-[8px] text-[#555]">Reviewer Only</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#1a1a1a] pt-4 flex justify-between items-center font-mono text-[10px] text-[#555] z-10">
          <div>DELHI COLLEGE OF ARTS &amp; COMMERCE • EST. 2011</div>
          <div>RECRUITMENT DATA DISPATCH v2.0</div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED COUNCIL DASHBOARD
  return (
    <div className="min-h-screen bg-[#080808] text-[#f4f1ea] pb-24">
      {/* Top Fixed Security Banner */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1f1f1f] px-4 sm:px-8 py-3.5 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="w-2.5 h-2.5 bg-[#B3141B] group-hover:scale-125 transition-transform" />
            <span className="font-mono text-xs tracking-[0.2em] text-white font-bold">
              CLICKS DCAC // COUNCIL PORTAL
            </span>
          </Link>
          <span className="text-[#333] hidden sm:inline">|</span>
          <span className={`px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider font-bold ${currentUser.permissions.badgeColor}`}>
            {currentUser.permissions.label}
          </span>
        </div>

        <div className="flex items-center space-x-4 font-mono text-xs">
          <span className="text-[#888] hidden md:inline">
            Active: <span className="text-white">{currentUser.name}</span>
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-2.5 py-1 bg-[#141414] border border-[#2a2a2a] hover:border-[#B3141B] text-[#aaa] hover:text-white transition-colors text-[10px] uppercase tracking-wider"
          >
            <LogOut size={12} />
            <span>SIGN OUT</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Overview Stats Bar */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="p-4 bg-[#0e0e0e] border border-[#222]">
              <span className="font-mono text-[9px] text-[#777] uppercase tracking-wider block">Total Registered</span>
              <span className="font-display text-3xl text-white mt-1 block">{stats.total}</span>
            </div>
            <div className="p-4 bg-[#0e0e0e] border border-[#222]">
              <span className="font-mono text-[9px] text-yellow-500 uppercase tracking-wider block">Pending Review</span>
              <span className="font-display text-3xl text-yellow-400 mt-1 block">{stats.pending}</span>
            </div>
            <div className="p-4 bg-[#0e0e0e] border border-[#222]">
              <span className="font-mono text-[9px] text-blue-400 uppercase tracking-wider block">Shortlisted</span>
              <span className="font-display text-3xl text-blue-400 mt-1 block">{stats.shortlisted}</span>
            </div>
            <div className="p-4 bg-[#0e0e0e] border border-[#222]">
              <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-wider block">Selected Core</span>
              <span className="font-display text-3xl text-emerald-400 mt-1 block">{stats.selected}</span>
            </div>
            <div className="p-4 bg-[#0e0e0e] border border-[#222]">
              <span className="font-mono text-[9px] text-[#888] uppercase tracking-wider block">Gender Distribution</span>
              <div className="font-mono text-xs text-[#aaa] mt-1 space-x-2">
                <span>M: {stats.male}</span>
                <span>F: {stats.female}</span>
              </div>
            </div>
            <div className="p-4 bg-[#0e0e0e] border border-[#222]">
              <span className="font-mono text-[9px] text-[#888] uppercase tracking-wider block">Gear Breakdown</span>
              <div className="font-mono text-[10px] text-[#aaa] mt-1 truncate">
                DSLR: {stats.dslrCount} • Film: {stats.filmCount}
              </div>
            </div>
          </div>
        )}

        {/* Action Controls & Excel Export Bar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-[#0c0c0c] border border-[#202020] p-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
            <input
              type="text"
              placeholder="Search candidate by name, email, roll number, course, or camera kit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141414] border border-[#262626] focus:border-[#B3141B] pl-9 pr-4 py-2 font-mono text-xs text-white focus:outline-none transition-colors"
            />
          </div>

          {/* Filter Status */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none font-mono text-[10px]">
            <span className="text-[#555] uppercase tracking-wider shrink-0">STATUS:</span>
            {['ALL', 'PENDING', 'SHORTLISTED', 'SELECTED', 'REJECTED'].map((st) => (
              <button
                key={st}
                onClick={() => {
                  playMechanicalClick();
                  setStatusFilter(st);
                }}
                className={`px-2.5 py-1.5 uppercase transition-colors shrink-0 border ${
                  statusFilter === st
                    ? 'bg-[#B3141B] text-white border-[#B3141B] font-bold'
                    : 'bg-[#141414] text-[#888] border-[#222] hover:border-[#444]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Gear Filter Dropdown */}
          <div className="flex items-center space-x-1.5 font-mono text-[10px]">
            <span className="text-[#555] uppercase tracking-wider shrink-0">GEAR:</span>
            <select
              value={gearFilter}
              onChange={(e) => {
                playMechanicalClick();
                setGearFilter(e.target.value);
              }}
              className="bg-[#141414] border border-[#222] text-[#aaa] px-2 py-1.5 focus:outline-none focus:border-[#B3141B]"
            >
              <option value="ALL">ALL GEAR</option>
              <option value="DSLR / Mirrorless">DSLR / Mirrorless</option>
              <option value="35mm Analog Film">35mm Film</option>
              <option value="Smartphone (Manual/Pro)">Smartphone</option>
              <option value="No Gear (Eager to Learn)">No Gear</option>
            </select>
          </div>

          {/* Export to Excel Action */}
          {currentUser.permissions.canExportExcel ? (
            <button
              onClick={handleExportExcel}
              disabled={isExporting}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-emerald-200 border border-emerald-500/40 font-mono text-xs uppercase tracking-wider font-bold transition-all disabled:opacity-50"
              title="Download formatted Excel (.xlsx) file"
            >
              <FileSpreadsheet size={15} />
              <span>{isExporting ? 'GENERATING XLSX...' : 'EXPORT EXCEL'}</span>
            </button>
          ) : (
            <div className="font-mono text-[10px] text-[#555] px-3 py-1.5 border border-[#1e1e1e] flex items-center space-x-1">
              <Lock size={11} />
              <span>EXCEL EXPORT (PRESIDENT/VP ONLY)</span>
            </div>
          )}
        </div>

        {/* Applicant Dossier Table */}
        <div className="bg-[#0c0c0c] border border-[#202020] overflow-hidden">
          <div className="p-4 border-b border-[#1c1c1c] flex justify-between items-center font-mono text-xs text-[#777]">
            <span>
              SHOWING {applicants.length} STUDENT DOSSIERS
            </span>
            <span className="text-[10px] text-[#555]">
              CLICK ANY ROW TO OPEN DEEP INSPECTION &amp; EVALUATION
            </span>
          </div>

          {loadingData ? (
            <div className="py-20 text-center font-mono text-xs text-[#666]">
              LOADING CANDIDATE RECORDS...
            </div>
          ) : applicants.length === 0 ? (
            <div className="py-20 text-center font-mono text-xs text-[#666] space-y-2">
              <Camera size={24} className="mx-auto text-[#444]" />
              <p>No matching candidate dossiers found for this filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#1c1c1c] text-[#666] text-[10px] uppercase tracking-wider bg-[#0e0e0e]">
                    <th className="py-3 px-4">Dossier ID</th>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Gender</th>
                    <th className="py-3 px-4">Course &amp; Year</th>
                    <th className="py-3 px-4">Camera Equipment</th>
                    <th className="py-3 px-4">Genre</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#181818]">
                  {applicants.map((app) => {
                    const badge = statusBadges[app.status];
                    return (
                      <tr
                        key={app.id}
                        onClick={() => openDossier(app)}
                        className="hover:bg-[#121212] cursor-pointer transition-colors group"
                      >
                        <td className="py-3.5 px-4 font-bold text-[#f70012]">
                          {app.applicationNo}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white group-hover:text-[#B3141B] transition-colors">
                            {app.fullName}
                          </div>
                          <div className="text-[10px] text-[#666]">{app.email}</div>
                        </td>
                        <td className="py-3.5 px-4 text-[#888]">{app.gender}</td>
                        <td className="py-3.5 px-4 text-[#aaa]">{app.courseYear}</td>
                        <td className="py-3.5 px-4">
                          <span className="text-white block truncate max-w-[200px]">{app.cameraGear}</span>
                          <span className="text-[9px] text-[#555] block">{app.gearCategory}</span>
                        </td>
                        <td className="py-3.5 px-4 text-[#aaa]">{app.primaryGenre}</td>
                        <td className="py-3.5 px-4">
                          {app.rating ? (
                            <div className="flex items-center text-yellow-400">
                              <Star size={11} className="fill-yellow-400 mr-1" />
                              <span>{app.rating}/5</span>
                            </div>
                          ) : (
                            <span className="text-[#444]">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center space-x-1 px-2 py-0.5 border text-[9px] font-bold ${badge.color}`}>
                            {badge.icon}
                            <span>{badge.label}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right text-[#666] group-hover:text-white transition-colors">
                          <ChevronRight size={15} className="ml-auto" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* =====================================================================
       * DEEP INSPECTION CANDIDATE DOSSIER MODAL
       * ===================================================================== */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e0e0e] border border-[#2a2a2a] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 my-8">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-[#222] pb-4">
              <div>
                <span className="font-mono text-[10px] text-[#B3141B] tracking-widest font-bold">
                  DOSSIER // {selectedApplicant.applicationNo}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-white uppercase mt-0.5">
                  {selectedApplicant.fullName}
                </h2>
                <p className="font-mono text-xs text-[#888]">
                  {selectedApplicant.courseYear} {selectedApplicant.rollNo ? `• Roll: ${selectedApplicant.rollNo}` : ''}
                </p>
              </div>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="p-1.5 border border-[#333] hover:border-white text-[#888] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Quick Contact & Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3 bg-[#121212] border border-[#222] space-y-1">
                <span className="text-[9px] text-[#555] uppercase block">Direct WhatsApp</span>
                <a
                  href={`https://wa.me/${selectedApplicant.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-emerald-400 hover:underline font-bold"
                >
                  <MessageCircle size={13} />
                  <span>{selectedApplicant.phone}</span>
                </a>
              </div>

              <div className="p-3 bg-[#121212] border border-[#222] space-y-1">
                <span className="text-[9px] text-[#555] uppercase block">Candidate Email</span>
                <a href={`mailto:${selectedApplicant.email}`} className="text-white hover:underline truncate block">
                  {selectedApplicant.email}
                </a>
              </div>

              <div className="p-3 bg-[#121212] border border-[#222] space-y-1 sm:col-span-2">
                <span className="text-[9px] text-[#555] uppercase block">Portfolio / Social Proof Link</span>
                {selectedApplicant.portfolioUrl ? (
                  <a
                    href={selectedApplicant.portfolioUrl.startsWith('http') ? selectedApplicant.portfolioUrl : `https://${selectedApplicant.portfolioUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 text-[#B3141B] hover:text-white transition-colors truncate"
                  >
                    <ExternalLink size={13} />
                    <span className="truncate">{selectedApplicant.portfolioUrl}</span>
                  </a>
                ) : (
                  <span className="text-[#666]">No external portfolio provided</span>
                )}
              </div>
            </div>

            {/* Camera Gear & Statement */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#121212] border border-[#222]">
                <span className="text-[9px] text-[#555] uppercase block mb-1">Equipment Kit</span>
                <p className="text-white font-bold">{selectedApplicant.cameraGear}</p>
                <span className="text-[10px] text-[#777]">{selectedApplicant.gearCategory} • Genre: {selectedApplicant.primaryGenre}</span>
              </div>

              <div className="p-4 bg-[#121212] border border-[#222]">
                <span className="text-[9px] text-[#555] uppercase block mb-1">
                  Candidate Statement (&ldquo;What Noticing Means to You&rdquo;)
                </span>
                <p className="font-editorial text-base text-[#ccc] italic leading-relaxed">
                  &ldquo;{selectedApplicant.statement}&rdquo;
                </p>
              </div>
            </div>

            {/* Evaluation & Status Controls */}
            <div className="pt-4 border-t border-[#222] space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Status Selector */}
                <div>
                  <label className="block text-[10px] uppercase text-[#777] mb-1">
                    Application Status
                  </label>
                  {currentUser.permissions.canChangeStatus ? (
                    <select
                      value={editingStatus}
                      onChange={(e) => setEditingStatus(e.target.value as ApplicationStatus)}
                      className="w-full bg-[#141414] border border-[#2e2e2e] focus:border-[#B3141B] text-white p-2 font-mono text-xs focus:outline-none"
                    >
                      <option value="PENDING">PENDING REVIEW</option>
                      <option value="SHORTLISTED">SHORTLISTED (Photowalk Round)</option>
                      <option value="SELECTED">SELECTED (Council &amp; Society Core)</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  ) : (
                    <div className="p-2 bg-[#121212] border border-[#222] text-[#888] flex items-center justify-between">
                      <span>{selectedApplicant.status}</span>
                      <span className="text-[9px] text-[#555]">[REQUIRES VP/PRESIDENT]</span>
                    </div>
                  )}
                </div>

                {/* Rating Selector */}
                <div>
                  <label className="block text-[10px] uppercase text-[#777] mb-1">
                    Internal Rating (1 to 5 Stars)
                  </label>
                  <div className="flex items-center space-x-2 p-1.5 bg-[#141414] border border-[#2e2e2e]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          playMechanicalClick();
                          setEditingRating(star);
                        }}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star
                          size={16}
                          className={star <= editingRating ? 'text-yellow-400 fill-yellow-400' : 'text-[#444]'}
                        />
                      </button>
                    ))}
                    <span className="text-[10px] text-[#888] ml-2">
                      {editingRating > 0 ? `${editingRating}/5` : 'Unrated'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Internal Council Notes */}
              <div>
                <label className="block text-[10px] uppercase text-[#777] mb-1">
                  Council Notes / Interview Feedback
                </label>
                <textarea
                  rows={3}
                  placeholder="Add private evaluation notes visible only to council members..."
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  className="w-full bg-[#141414] border border-[#2e2e2e] focus:border-[#B3141B] text-white p-2.5 font-mono text-xs focus:outline-none resize-none"
                />
                {selectedApplicant.reviewedBy && (
                  <span className="text-[9px] text-[#555] block mt-1">
                    Last modified by: {selectedApplicant.reviewedBy}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-[#222]">
              {currentUser.permissions.canDeleteApplicant ? (
                <button
                  type="button"
                  onClick={() => handleDeleteApplicant(selectedApplicant.id, selectedApplicant.fullName)}
                  className="flex items-center space-x-1.5 text-red-500 hover:text-red-400 font-mono text-xs uppercase"
                >
                  <Trash2 size={13} />
                  <span>DELETE DOSSIER</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedApplicant(null)}
                  className="px-4 py-2 border border-[#333] hover:border-white font-mono text-xs text-[#888] hover:text-white transition-colors"
                >
                  CLOSE
                </button>
                <button
                  type="button"
                  disabled={isSavingDossier}
                  onClick={handleSaveDossier}
                  className="px-5 py-2 bg-[#B3141B] hover:bg-[#c91820] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg disabled:opacity-50"
                >
                  {isSavingDossier ? 'SAVING...' : 'SAVE EVALUATION'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
