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
import { COMPETITION_HISTORY, UPCOMING_COMPETITIONS } from '@/data/competitions-data';

interface CurrentUser {
  userId: string;
  email: string;
  name: string;
  role: CouncilRole;
  permissions: typeof ROLE_PERMISSIONS[CouncilRole];
}

interface DashboardStats {
  total: number;
  council: number;
  activeMembers: number;
  newRecruits: number;
  pending: number;
  shortlisted: number;
  selected: number;
  rejected: number;
  year1: number;
  year2: number;
  year3: number;
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

  // Portal section: 'students' | 'competitions'
  const [portalSection, setPortalSection] = useState<'students' | 'competitions'>('students');

  // Competition tab: 'history' | 'upcoming'
  const [compTab, setCompTab] = useState<'history' | 'upcoming'>('history');

  // Filter & Search — COUNCIL tab added
  const [searchQuery, setSearchQuery] = useState('');
  const [rosterTab, setRosterTab] = useState<'ALL' | 'COUNCIL' | 'MEMBERS' | 'RECRUITS' | '1st' | '2nd' | '3rd'>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

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
      if (rosterTab !== 'ALL') params.set('roster', rosterTab);
      if (statusFilter !== 'ALL') params.set('status', statusFilter);

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
  }, [currentUser, searchQuery, rosterTab, statusFilter]);

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

  // (autofill removed — each council member uses their own private credentials)

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
      const params = new URLSearchParams();
      if (rosterTab !== 'ALL') params.set('roster', rosterTab);
      if (statusFilter !== 'ALL') params.set('status', statusFilter);

      const res = await fetch(`/api/portal/export-excel?${params.toString()}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Export failed');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const scopeLabel = rosterTab === 'ALL' ? 'Complete_Roster' : rosterTab === 'MEMBERS' ? 'Active_Society_Members' : rosterTab === 'RECRUITS' ? 'Web_Recruits' : `Year_${rosterTab}`;
      a.download = `CLICKS_DCAC_${scopeLabel}_${new Date().toISOString().split('T')[0]}.xlsx`;
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
                Council Username
              </label>
              <input
                type="text"
                required
                placeholder="Enter your council username"
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

          {/* Credentials Guide */}
          <div className="mt-8 pt-6 border-t border-[#1c1c1c]">
            <div className="font-mono text-[9px] text-[#555] uppercase tracking-widest mb-3">
              ACCESS CREDENTIALS
            </div>
            <div className="space-y-1.5 font-mono text-[10px] text-[#666]">
              <div className="flex justify-between items-center py-1.5 border-b border-[#181818]">
                <span>President</span>
                <span className="text-[#444] tracking-wider">username: <span className="text-[#666]">prez</span></span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#181818]">
                <span>Vice President</span>
                <span className="text-[#444] tracking-wider">username: <span className="text-[#666]">viceprez</span></span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#181818]">
                <span>General Secretary</span>
                <span className="text-[#444] tracking-wider">username: <span className="text-[#666]">gensec</span></span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span>Core / Treasurer</span>
                <span className="text-[#444] tracking-wider">username: <span className="text-[#666]">core</span></span>
              </div>
            </div>
            <div className="mt-3 font-mono text-[8px] text-[#444] italic">
              Each member&apos;s password is their own private key. Contact President to reset.
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 space-y-6">

        {/* ── PORTAL SECTION SWITCHER ──────────────────────────── */}
        <div className="flex items-center space-x-1 border border-[#222] bg-[#0a0a0a] p-1 font-mono text-xs w-fit">
          <button
            onClick={() => { playMechanicalClick(); setPortalSection('students'); }}
            className={`px-4 py-2 uppercase tracking-widest text-[11px] font-bold transition-all ${portalSection === 'students' ? 'bg-[#B3141B] text-white' : 'text-[#777] hover:text-white'}`}
          >
            Student Database
          </button>
          <button
            onClick={() => { playMechanicalClick(); setPortalSection('competitions'); }}
            className={`px-4 py-2 uppercase tracking-widest text-[11px] font-bold transition-all ${portalSection === 'competitions' ? 'bg-[#B3141B] text-white' : 'text-[#777] hover:text-white'}`}
          >
            Competition Tracker
          </button>
        </div>

        {/* ── STUDENT DATABASE SECTION ─────────────────────────── */}
        {portalSection === 'students' && (<>

        {/* Overview Stats Bar */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 bg-[#0e0e0e] border border-[#222]">
              <span className="font-mono text-[9px] text-[#777] uppercase tracking-wider block">Total Database</span>
              <span className="font-display text-3xl text-white mt-1 block">{stats.total}</span>
            </div>
            <div className="p-4 bg-[#0e0e0e] border border-[#222]">
              <span className="font-mono text-[9px] text-[#B3141B] uppercase tracking-wider block">Core Council</span>
              <span className="font-display text-3xl text-[#ff545b] mt-1 block">{stats.council ?? 5}</span>
            </div>
            <div className="p-4 bg-[#0e0e0e] border border-[#222]">
              <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-wider block">Enrolled Members</span>
              <span className="font-display text-3xl text-emerald-400 mt-1 block">{stats.activeMembers}</span>
            </div>
            <div className="p-4 bg-[#0e0e0e] border border-[#222]">
              <span className="font-mono text-[9px] text-yellow-400 uppercase tracking-wider block">Web Recruits</span>
              <span className="font-display text-3xl text-yellow-400 mt-1 block">{stats.newRecruits}</span>
            </div>
            <div className="p-4 bg-[#0e0e0e] border border-[#222]">
              <span className="font-mono text-[9px] text-[#888] uppercase tracking-wider block">Gender (M/F)</span>
              <div className="font-mono text-sm text-[#ccc] mt-1">
                <span>{stats.male}M</span><span className="text-[#444] mx-1">/</span><span>{stats.female}F</span>
              </div>
            </div>
            <div className="p-4 bg-[#0e0e0e] border border-[#222]">
              <span className="font-mono text-[9px] text-[#888] uppercase tracking-wider block">Year Spread</span>
              <div className="font-mono text-[10px] text-[#aaa] mt-1 space-y-0.5">
                <div>1st: {stats.year1} &nbsp; 2nd: {stats.year2} &nbsp; 3rd: {stats.year3}</div>
              </div>
            </div>
          </div>
        )}

        {/* Cohort tabs — includes COUNCIL */}
        <div className="flex items-center space-x-0.5 overflow-x-auto pb-1 bg-[#0c0c0c] border border-[#1f1f1f] p-1 font-mono text-xs">
          {[
            { id: 'ALL', label: `ALL (${stats?.total || 0})` },
            { id: 'COUNCIL', label: `CORE COUNCIL (${stats?.council ?? 5})` },
            { id: 'MEMBERS', label: `MEMBERS (${stats?.activeMembers || 0})` },
            { id: 'RECRUITS', label: `WEB RECRUITS (${stats?.newRecruits || 0})` },
            { id: '1st', label: `1ST YEAR (${stats?.year1 || 0})` },
            { id: '2nd', label: `2ND YEAR (${stats?.year2 || 0})` },
            { id: '3rd', label: `3RD YEAR (${stats?.year3 || 0})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { playMechanicalClick(); setRosterTab(tab.id as typeof rosterTab); }}
              className={`px-3 py-2 uppercase tracking-wider text-[10px] font-bold transition-all shrink-0 ${
                rosterTab === tab.id
                  ? 'bg-[#B3141B] text-white'
                  : 'text-[#888] hover:text-white hover:bg-[#161616]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search + Status + Export Bar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 bg-[#0c0c0c] border border-[#202020] p-4">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
            <input
              type="text"
              placeholder="Search by name, roll no, course, email or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141414] border border-[#262626] focus:border-[#B3141B] pl-9 pr-4 py-2 font-mono text-xs text-white focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none font-mono text-[10px]">
            <span className="text-[#555] uppercase tracking-wider shrink-0">STATUS:</span>
            {['ALL', 'PENDING', 'SHORTLISTED', 'SELECTED', 'REJECTED'].map((st) => (
              <button
                key={st}
                onClick={() => { playMechanicalClick(); setStatusFilter(st); }}
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

          {currentUser.permissions.canExportExcel ? (
            <button
              onClick={handleExportExcel}
              disabled={isExporting}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-emerald-200 border border-emerald-500/40 font-mono text-xs uppercase tracking-wider font-bold transition-all disabled:opacity-50 shrink-0"
            >
              <FileSpreadsheet size={15} />
              <span>{isExporting ? 'GENERATING...' : 'EXPORT EXCEL'}</span>
            </button>
          ) : (
            <div className="font-mono text-[10px] text-[#555] px-3 py-1.5 border border-[#1e1e1e] flex items-center space-x-1 shrink-0">
              <Lock size={11} />
              <span>EXCEL: PRESIDENT/VP ONLY</span>
            </div>
          )}
        </div>

        {/* Student Table */}
        <div className="bg-[#0c0c0c] border border-[#202020] overflow-hidden">
          <div className="p-4 border-b border-[#1c1c1c] flex flex-wrap justify-between items-center gap-2 font-mono text-xs text-[#777]">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#B3141B]" />
              <span className="text-white font-bold uppercase tracking-wider">
                {rosterTab === 'ALL' ? 'ALL STUDENTS & ROSTER'
                  : rosterTab === 'COUNCIL' ? 'CORE COUNCIL MEMBERS'
                  : rosterTab === 'MEMBERS' ? 'ENROLLED SOCIETY MEMBERS'
                  : rosterTab === 'RECRUITS' ? 'WEB APPLICANTS'
                  : `${rosterTab.toUpperCase()} YEAR`}
              </span>
              <span className="text-[#555]">({applicants.length} records)</span>
            </div>
            <span className="text-[10px] text-[#555]">CLICK ROW TO OPEN DOSSIER</span>
          </div>

          {loadingData ? (
            <div className="py-20 text-center font-mono text-xs text-[#666]">LOADING...</div>
          ) : applicants.length === 0 ? (
            <div className="py-20 text-center font-mono text-xs text-[#666] space-y-2">
              <Camera size={24} className="mx-auto text-[#444]" />
              <p>No records match this filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#1c1c1c] text-[#666] text-[10px] uppercase tracking-wider bg-[#0e0e0e]">
                    <th className="py-3 px-4">Type / ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Course &amp; Roll No</th>
                    <th className="py-3 px-4">WhatsApp</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Open</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#181818]">
                  {applicants.map((app) => {
                    const badge = statusBadges[app.status];
                    const isCouncil = ['clk-001','clk-002','clk-003','clk-004','clk-005','clk-006'].includes(app.id);
                    const isMember = app.applicationNo.startsWith('CLK-MEM-') && !isCouncil;
                    const rawPhone = app.phone ? app.phone.replace(/[^0-9]/g, '') : '';
                    const waNum = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

                    return (
                      <tr
                        key={app.id}
                        onClick={() => openDossier(app)}
                        className={`cursor-pointer transition-colors group ${isCouncil ? 'bg-[#0f0a0a] hover:bg-[#160b0b]' : 'hover:bg-[#121212]'}`}
                      >
                        <td className="py-3.5 px-4 font-bold">
                          {isCouncil ? (
                            <>
                              <span className="text-[#B3141B]">COUNCIL</span>
                              <span className="block text-[8px] text-[#B3141B]/60 uppercase mt-0.5">{app.internalNotes}</span>
                            </>
                          ) : isMember ? (
                            <>
                              <span className="text-emerald-400">{app.applicationNo}</span>
                              <span className="block text-[8px] text-[#555] uppercase mt-0.5">MEMBER</span>
                            </>
                          ) : (
                            <>
                              <span className="text-[#f70012]">{app.applicationNo}</span>
                              <span className="block text-[8px] text-[#555] uppercase mt-0.5">APPLICANT</span>
                            </>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className={`font-bold transition-colors ${isCouncil ? 'text-[#ff9090] group-hover:text-white' : 'text-white group-hover:text-[#B3141B]'}`}>
                            {app.fullName}
                          </div>
                          <div className="text-[10px] text-[#555]">{app.gender}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-[#ccc]">{app.courseYear}</div>
                          {app.rollNo && (
                            <span className="inline-block mt-0.5 px-1.5 bg-[#1a1a1a] text-[#888] border border-[#2a2a2a] text-[9px]">
                              #{app.rollNo}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                          {rawPhone ? (
                            <a
                              href={`https://wa.me/${waNum}?text=${encodeURIComponent(`Hello ${app.fullName}, this is regarding CLICKS Photography Society, DCAC.`)}`}
                              target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 text-emerald-400 hover:text-emerald-300"
                            >
                              <MessageCircle size={12} />
                              <span>{app.phone}</span>
                            </a>
                          ) : <span className="text-[#444]">—</span>}
                        </td>
                        <td className="py-3.5 px-4 text-[#777] truncate max-w-[160px]">
                          {app.email || <span className="text-[#444]">—</span>}
                        </td>
                        <td className="py-3.5 px-4">
                          {app.rating ? (
                            <div className="flex items-center text-yellow-400">
                              <Star size={11} className="fill-yellow-400 mr-1" />
                              <span>{app.rating}/5</span>
                            </div>
                          ) : <span className="text-[#444]">—</span>}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center space-x-1 px-2 py-0.5 border text-[9px] font-bold ${badge.color}`}>
                            {badge.icon}<span>{badge.label}</span>
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

        </>)}

        {/* ── COMPETITION TRACKER SECTION ──────────────────────── */}
        {portalSection === 'competitions' && (
          <div className="space-y-6">

            {/* Competition sub-tabs */}
            <div className="flex items-center space-x-1 border border-[#222] bg-[#0a0a0a] p-1 font-mono text-xs w-fit">
              <button
                onClick={() => { playMechanicalClick(); setCompTab('history'); }}
                className={`px-4 py-2 uppercase tracking-widest text-[10px] font-bold transition-all ${compTab === 'history' ? 'bg-[#B3141B] text-white' : 'text-[#777] hover:text-white'}`}
              >
                Competition History
              </button>
              <button
                onClick={() => { playMechanicalClick(); setCompTab('upcoming'); }}
                className={`px-4 py-2 uppercase tracking-widest text-[10px] font-bold transition-all ${compTab === 'upcoming' ? 'bg-emerald-700 text-white' : 'text-[#777] hover:text-white'}`}
              >
                Live &amp; Upcoming
              </button>
            </div>

            {/* ── HISTORY TAB ── */}
            {compTab === 'history' && (
              <div className="space-y-4">
                <div className="font-mono text-[10px] text-[#555] uppercase tracking-wider pb-2 border-b border-[#1c1c1c]">
                  CLICKS DCAC · COMPETITION RECORD — {COMPETITION_HISTORY.length} EVENTS ON FILE
                </div>
                <div className="font-mono text-[10px] text-[#444] italic mb-2">
                  Student names marked [PLACEHOLDER] — update in <span className="text-[#777]">src/data/competitions-data.ts</span> when confirmed.
                </div>
                <div className="grid gap-4">
                  {COMPETITION_HISTORY.map((comp) => {
                    const resultColors: Record<string, string> = {
                      '1st': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/40',
                      '2nd': 'bg-blue-500/10 text-blue-400 border-blue-400/40',
                      '3rd': 'bg-orange-500/10 text-orange-400 border-orange-400/40',
                      'Won': 'bg-emerald-500/10 text-emerald-400 border-emerald-400/40',
                      'Finalist': 'bg-purple-500/10 text-purple-400 border-purple-400/40',
                      'Participated': 'bg-[#222] text-[#888] border-[#333]',
                    };
                    return (
                      <div key={comp.id} className="bg-[#0e0e0e] border border-[#222] p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="shrink-0 flex flex-col items-center justify-center w-20 h-20 border border-[#2a2a2a] bg-[#121212]">
                          <span className={`text-xs font-bold uppercase px-2 py-0.5 border ${resultColors[comp.result] || 'text-[#888]'}`}>
                            {comp.resultLabel}
                          </span>
                          <span className="text-[9px] text-[#555] mt-1 uppercase font-mono">{comp.year}</span>
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div>
                            <h3 className="font-mono font-bold text-white text-sm">{comp.competition}</h3>
                            <p className="font-mono text-[10px] text-[#B3141B] uppercase tracking-wider">{comp.institution}</p>
                          </div>
                          <p className="font-mono text-[11px] text-[#888]">{comp.notes}</p>
                          <div className="flex items-center space-x-2 pt-1">
                            <span className="text-[9px] text-[#555] uppercase">Students:</span>
                            <div className="flex flex-wrap gap-1">
                              {comp.students.map((s, i) => (
                                <span key={i} className={`text-[10px] px-2 py-0.5 border font-mono ${s.startsWith('[PLACEHOLDER') ? 'text-[#555] border-[#2a2a2a] italic' : 'text-emerald-400 border-emerald-500/30'}`}>
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className={`inline-block text-[9px] uppercase px-2 py-0.5 border font-mono mt-1 ${
                            comp.category === 'national' ? 'text-yellow-400 border-yellow-500/30'
                            : comp.category === 'intra-college' ? 'text-[#B3141B] border-[#B3141B]/30'
                            : 'text-blue-400 border-blue-400/30'
                          }`}>
                            {comp.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add new record notice */}
                <div className="border border-dashed border-[#2a2a2a] p-4 text-center font-mono text-[10px] text-[#555]">
                  To add a new competition result, edit <span className="text-[#888]">src/data/competitions-data.ts</span> → <span className="text-[#888]">COMPETITION_HISTORY</span> array.
                </div>
              </div>
            )}

            {/* ── UPCOMING TAB ── */}
            {compTab === 'upcoming' && (
              <div className="space-y-4">
                <div className="font-mono text-[10px] text-[#555] uppercase tracking-wider pb-2 border-b border-[#1c1c1c]">
                  LIVE &amp; UPCOMING PHOTOGRAPHY COMPETITIONS — {UPCOMING_COMPETITIONS.length} CURATED PICKS
                </div>

                {/* Status legend */}
                <div className="flex items-center space-x-4 font-mono text-[9px]">
                  <span className="flex items-center space-x-1"><span className="w-2 h-2 bg-emerald-500 rounded-full" /><span className="text-[#777]">OPEN</span></span>
                  <span className="flex items-center space-x-1"><span className="w-2 h-2 bg-yellow-500 rounded-full" /><span className="text-[#777]">CLOSING SOON</span></span>
                  <span className="flex items-center space-x-1"><span className="w-2 h-2 bg-blue-400 rounded-full" /><span className="text-[#777]">ANNOUNCED</span></span>
                </div>

                <div className="grid gap-4">
                  {UPCOMING_COMPETITIONS.map((comp) => {
                    const statusDot: Record<string, string> = {
                      'open': 'bg-emerald-500',
                      'closing-soon': 'bg-yellow-500',
                      'announced': 'bg-blue-400',
                      'ongoing': 'bg-[#B3141B]',
                    };
                    const statusLabel: Record<string, string> = {
                      'open': 'OPEN FOR ENTRIES',
                      'closing-soon': 'CLOSING SOON',
                      'announced': 'ANNOUNCED',
                      'ongoing': 'ONGOING',
                    };
                    return (
                      <div key={comp.id} className="bg-[#0e0e0e] border border-[#222] p-5 space-y-3">
                        <div className="flex justify-between items-start gap-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`w-2 h-2 rounded-full shrink-0 ${statusDot[comp.status]}`} />
                              <span className="font-mono text-[9px] text-[#555] uppercase">{statusLabel[comp.status]}</span>
                            </div>
                            <h3 className="font-mono font-bold text-white text-sm">{comp.name}</h3>
                            <p className="font-mono text-[10px] text-[#B3141B] uppercase tracking-wider mt-0.5">{comp.organizer}</p>
                          </div>
                          {comp.link && (
                            <a
                              href={comp.link}
                              target="_blank" rel="noopener noreferrer"
                              className="shrink-0 px-3 py-1.5 bg-[#121212] border border-[#2a2a2a] hover:border-[#B3141B] text-[10px] font-mono text-[#888] hover:text-white transition-colors flex items-center space-x-1"
                            >
                              <ExternalLink size={11} />
                              <span>VISIT</span>
                            </a>
                          )}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-[10px]">
                          {comp.theme && (
                            <div>
                              <span className="text-[#555] block uppercase text-[9px]">Theme</span>
                              <span className="text-[#ccc] italic">{comp.theme}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-[#555] block uppercase text-[9px]">Deadline</span>
                            <span className="text-yellow-400 font-bold">{comp.deadline}</span>
                          </div>
                          {comp.prizePool && (
                            <div>
                              <span className="text-[#555] block uppercase text-[9px]">Prize</span>
                              <span className="text-emerald-400">{comp.prizePool}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-[#555] block uppercase text-[9px]">Format</span>
                            <span className="text-[#aaa] capitalize">{comp.submissionFormat}</span>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-[#555] block uppercase text-[9px]">Eligibility</span>
                            <span className="text-[#aaa]">{comp.eligibility}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 pt-1">
                          {comp.tags.map((tag) => (
                            <span key={tag} className="text-[9px] px-2 py-0.5 bg-[#141414] border border-[#2a2a2a] text-[#888] font-mono uppercase">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border border-dashed border-[#2a2a2a] p-4 text-center font-mono text-[10px] text-[#555]">
                  To add or update competition listings, edit <span className="text-[#888]">src/data/competitions-data.ts</span> → <span className="text-[#888]">UPCOMING_COMPETITIONS</span> array.
                </div>
              </div>
            )}

          </div>
        )}

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
                <span className="text-[9px] text-[#555] uppercase block">Direct WhatsApp &amp; Mobile</span>
                {selectedApplicant.phone && selectedApplicant.phone !== 'N/A' ? (
                  <div className="flex items-center space-x-3">
                    <a
                      href={`https://wa.me/${selectedApplicant.phone.replace(/[^0-9]/g, '').length === 10 ? '91' + selectedApplicant.phone.replace(/[^0-9]/g, '') : selectedApplicant.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedApplicant.fullName}, this is regarding CLICKS Photography Society, DCAC.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 text-emerald-400 hover:underline font-bold"
                      title="Open WhatsApp message"
                    >
                      <MessageCircle size={13} />
                      <span>{selectedApplicant.phone}</span>
                    </a>
                    <a
                      href={`tel:${selectedApplicant.phone}`}
                      className="text-[10px] text-[#888] hover:text-white underline"
                    >
                      [CALL]
                    </a>
                  </div>
                ) : (
                  <span className="text-[#666]">Contact phone not on file</span>
                )}
              </div>

              <div className="p-3 bg-[#121212] border border-[#222] space-y-1">
                <span className="text-[9px] text-[#555] uppercase block">Candidate Email</span>
                <a href={`mailto:${selectedApplicant.email}`} className="text-white hover:underline truncate block font-bold">
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

            {/* Statement only if it's a real web applicant statement */}
            <div className="space-y-3 font-mono text-xs">
              {selectedApplicant.statement && selectedApplicant.statement.length > 40 && !['President','Vice','General','Treasurer','Core','Social','Member'].some(k => selectedApplicant.statement.startsWith(k)) && (
                <div className="p-4 bg-[#121212] border border-[#222]">
                  <span className="text-[9px] text-[#555] uppercase block mb-1">
                    Candidate Statement
                  </span>
                  <p className="font-editorial text-base text-[#ccc] italic leading-relaxed">
                    &ldquo;{selectedApplicant.statement}&rdquo;
                  </p>
                </div>
              )}
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
