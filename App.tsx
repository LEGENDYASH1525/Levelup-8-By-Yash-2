import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Flame, 
  Zap, 
  BookOpen, 
  Trophy, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Monitor, 
  HelpCircle,
  Home,
  Compass,
  UserCheck,
  ArrowLeft,
  X,
  Calculator,
  FlaskConical,
  Landmark,
  Globe,
  Medal
} from 'lucide-react';
import { CURRICULUM_LESSONS, INITIAL_BADGES } from './data/curriculumData';
import { getRealPlayers } from './data/leaderboardData';
import { Lesson, SubjectType, UserProgress, Badge, LeaderboardUser } from './types';
import { sound } from './utils/audio';

// Components
import { StudentAvatar } from './components/StudentAvatar';
import { ThreeStepLessonModal } from './components/ThreeStepLessonModal';
import { DailyQuizModal } from './components/DailyQuizModal';
import { AiMentorModal } from './components/AiMentorModal';
import { ProfileModal } from './components/ProfileModal';
import { LeaderboardView } from './components/LeaderboardView';
import { BadgesView } from './components/BadgesView';
import { LessonCard } from './components/LessonCard';

export default function App() {
  // Persistence state
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('levelup8_user_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading progress:', e);
      }
    }
    return {
      studentName: 'Aarav Deshmukh',
      avatar: 'scholar',
      xp: 1140,
      level: 12,
      streakDays: 9,
      lastStudyDate: new Date().toISOString(),
      completedLessonIds: [],
      lessonProgress: {
        'sst-maratha-power': { step1: true, step2: true, step3: false, quizScore: 45 }
      },
      unlockedBadgeIds: ['first-step', 'streak-champ'],
      hasOnboarded: true,
      dailyGoalMin: 20,
      minutesSpentToday: 12,
      favoriteSubject: 'Social Science'
    };
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('levelup8_badges');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_BADGES;
  });

  const [classmates, setClassmates] = useState<LeaderboardUser[]>(() => {
    const saved = localStorage.getItem('levelup8_classmates');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  // UI Navigation states
  const [activeTab, setActiveTab] = useState<'home' | 'subjects' | 'leaderboard' | 'badges'>('home');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<SubjectType | 'All'>('All');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isDailyQuizOpen, setIsDailyQuizOpen] = useState(false);
  const [isAiMentorOpen, setIsAiMentorOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());

  // Save progress on change
  useEffect(() => {
    localStorage.setItem('levelup8_user_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('levelup8_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('levelup8_classmates', JSON.stringify(classmates));
  }, [classmates]);

  // Audio mute handler
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  // When completing a 3-step lesson
  const handleLessonComplete = (lessonId: string, earnedXp: number, scorePercent: number) => {
    setUserProgress((prev) => {
      const updatedIds = prev.completedLessonIds.includes(lessonId)
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, lessonId];

      const newXp = prev.xp + earnedXp;
      const newLevel = Math.max(12, Math.floor(newXp / 100));

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        completedLessonIds: updatedIds,
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: { step1: true, step2: true, step3: true, quizScore: scorePercent }
        }
      };
    });

    // Check & unlock badges
    setBadges((prevBadges) =>
      prevBadges.map((b) => {
        if (b.id === 'first-step') return { ...b, unlocked: true };
        if (b.id === 'quiz-ace' && scorePercent === 100) return { ...b, unlocked: true };
        if (b.id === 'math-whiz' && lessonId.startsWith('math')) return { ...b, unlocked: true };
        if (b.id === 'science-explorer' && lessonId.startsWith('sci')) return { ...b, unlocked: true };
        if (b.id === 'levelup-8-hero' && userProgress.xp + earnedXp >= 1500) return { ...b, unlocked: true };
        return b;
      })
    );
  };

  // When daily quiz finishes
  const handleDailyQuizComplete = (earnedXp: number) => {
    setUserProgress((prev) => {
      const newXp = prev.xp + earnedXp;
      return {
        ...prev,
        xp: newXp,
        streakDays: prev.streakDays + 1
      };
    });
  };

  // Update profile from modal
  const handleUpdateProfile = (newName: string, newAvatar: string) => {
    setUserProgress((prev) => ({
      ...prev,
      studentName: newName,
      avatar: newAvatar
    }));
  };

  const handleAddClassmate = (name: string, xp: number) => {
    const newMate: LeaderboardUser = {
      id: `mate-${Date.now()}`,
      rank: 2,
      name,
      avatar: 'scholar',
      schoolClass: '8th Standard',
      xp,
      streakDays: 4,
      topBadge: xp >= 1000 ? 'Gold Elite' : xp >= 500 ? 'Silver Achiever' : 'Bronze Scholar'
    };
    setClassmates((prev) => [...prev, newMate]);
  };

  const handleRemoveClassmate = (id: string) => {
    setClassmates((prev) => prev.filter(c => c.id !== id));
  };

  // Find the Continue card lesson ("The Freedom Struggle of 1857" or first)
  const continueLesson = CURRICULUM_LESSONS.find((l) => l.id === 'hist-freedom-struggle-1857') || CURRICULUM_LESSONS[0];

  // Subject quick click to filter and open subjects view
  const handleSubjectClick = (subj: SubjectType) => {
    sound.playClick();
    setSelectedSubjectFilter(subj);
    setActiveTab('subjects');
  };

  // Compute live leaderboard with current user (NO BOTS!)
  const currentUserObj = {
    name: userProgress.studentName,
    avatar: userProgress.avatar,
    xp: userProgress.xp,
    streakDays: userProgress.streakDays
  };

  const allPlayers = [
    {
      id: 'current-user',
      rank: 1,
      name: currentUserObj.name,
      avatar: currentUserObj.avatar,
      schoolClass: '8th Standard',
      xp: currentUserObj.xp,
      streakDays: currentUserObj.streakDays,
      topBadge: currentUserObj.xp >= 1000 ? 'Gold Elite' : 'Silver Achiever',
      isCurrentUser: true
    },
    ...classmates
  ];
  allPlayers.sort((a, b) => b.xp - a.xp);
  const leaderboardUsers = allPlayers.map((p, i) => ({ ...p, rank: i + 1 }));

  // Filter lessons
  const filteredLessons = selectedSubjectFilter === 'All'
    ? CURRICULUM_LESSONS
    : CURRICULUM_LESSONS.filter((l) => l.subject === selectedSubjectFilter);

  // Level progress calculation
  const currentLevelBase = 1000;
  const nextLevelThreshold = 1500;
  const progressRatio = Math.min(
    100,
    Math.max(10, ((userProgress.xp - currentLevelBase) / (nextLevelThreshold - currentLevelBase)) * 100)
  );

  return (
    <div className="min-h-screen bg-[#070D1F] text-slate-100 flex flex-col items-center justify-center p-2 sm:p-4 selection:bg-blue-500 selection:text-white">
      {/* Top Device Control Bar */}
      <aside aria-label="Device Controls" className="w-full max-w-md md:max-w-4xl mb-2 sm:mb-4 px-3 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-['Outfit'] font-extrabold text-cyan-400 text-sm tracking-wide">
            LevelUp 8
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-[11px] text-slate-400">
            8th Standard Champion Learning by Yash
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Ask AI Doubt Button */}
          <button
            onClick={() => { sound.playClick(); setIsAiMentorOpen(true); }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-500/30 text-indigo-300 hover:text-white transition-all font-semibold"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Ask AI Doubt</span>
          </button>

          {/* Toggle Phone Frame / Wide Layout */}
          <button
            onClick={() => { sound.playClick(); setIsPhoneFrame(!isPhoneFrame); }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#0F1A34] hover:bg-[#18284E] border border-blue-500/20 text-slate-300 hover:text-white transition-all"
            title={isPhoneFrame ? "Switch to Wide Responsive View" : "Switch to Mobile Phone Frame"}
          >
            {isPhoneFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPhoneFrame ? "Wide Mode" : "Phone Frame"}</span>
          </button>

          {/* Mute Toggle */}
          <button
            onClick={handleToggleMute}
            className="p-1.5 rounded-xl bg-[#0F1A34] hover:bg-[#18284E] border border-blue-500/20 text-slate-300 hover:text-white transition-all"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
          </button>
        </div>
      </aside>

      {/* Main Container: Exact Phone Frame or Wide View */}
      <div 
        className={`w-full transition-all duration-300 ${
          isPhoneFrame 
            ? 'max-w-[400px] rounded-[42px] border-[10px] border-[#0F182F] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(14,165,233,0.15)] bg-[#070D1F] overflow-hidden'
            : 'max-w-4xl rounded-3xl border border-blue-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-[#070D1F] p-4 sm:p-6'
        }`}
      >
        {/* Dynamic Notch / Phone Speaker Bar if in phone frame */}
        {isPhoneFrame && (
          <div className="pt-3 px-6 flex items-center justify-between text-[11px] font-bold text-slate-400">
            <span>9:41</span>
            <div className="w-24 h-4 bg-[#0A1024] rounded-full flex items-center justify-center border border-slate-800">
              <div className="w-8 h-1 bg-slate-700 rounded-full" />
            </div>
            <div className="flex items-center gap-1 text-[10px]">
              <span>5G</span>
              <div className="w-4 h-2 border border-slate-400 rounded-sm p-0.5 flex">
                <div className="h-full w-2.5 bg-emerald-400 rounded-xs" />
              </div>
            </div>
          </div>
        )}

        {/* Inner Scrollable Canvas */}
        <div className={`p-4 sm:p-5 ${isPhoneFrame ? 'max-h-[760px] overflow-y-auto' : ''}`}>
          {/* ===================== TAB: HOME (EXACT MATCH TO USER SCREENSHOT) ===================== */}
          {activeTab === 'home' && (
            <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300">
              {/* Top Profile Header Bar */}
              <div className="flex items-center justify-between gap-3 pt-1">
                {/* Left: Vector Avatar with glowing teal circular ring & Name */}
                <div 
                  onClick={() => { sound.playClick(); setIsProfileOpen(true); }}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <StudentAvatar avatarId={userProgress.avatar} size="lg" showGlow />

                  <div>
                    <h1 className="font-['Outfit'] font-black text-white text-base sm:text-lg leading-tight group-hover:text-cyan-300 transition-colors">
                      {userProgress.studentName}
                    </h1>
                    <div className="flex items-center gap-1 text-xs font-extrabold text-[#F59E0B] tracking-wide mt-0.5">
                      <Medal className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30 shrink-0" />
                      <span>LEVEL {userProgress.level} · GOLD</span>
                    </div>
                  </div>
                </div>

                {/* Right: 3D Day Streak Badge */}
                <div 
                  onClick={() => { sound.playClick(); setActiveTab('badges'); }}
                  className="px-3.5 py-2 rounded-2xl bg-gradient-to-b from-[#2B1B10] to-[#1C120B] border border-amber-500/40 shadow-[0_4px_12px_rgba(245,158,11,0.2)] flex items-center gap-2 cursor-pointer hover:border-amber-400 transition-all"
                >
                  <Flame className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0 drop-shadow" />
                  <div className="flex flex-col text-left leading-none">
                    <span className="font-['Outfit'] font-black text-amber-400 text-base">
                      {userProgress.streakDays}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-amber-200/80 mt-0.5">
                      DAY STREAK
                    </span>
                  </div>
                </div>
              </div>

              {/* XP Progress Bar underneath Header */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                  <span className="font-['Outfit'] tracking-wide">{userProgress.xp} XP</span>
                  <span className="font-['Outfit'] text-slate-400 tracking-wide uppercase">
                    NEXT LEVEL {nextLevelThreshold}
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#0D1832] border border-blue-500/20 p-0.5 shadow-inner">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 shadow-[0_0_12px_#38BDF8] transition-all duration-500"
                    style={{ width: `${progressRatio}%` }}
                  />
                </div>
              </div>

              {/* Continue Learning Card */}
              <div 
                onClick={() => {
                  sound.playClick();
                  setActiveLesson(continueLesson);
                }}
                className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#101D3A] to-[#0B152A] border border-blue-500/30 hover:border-cyan-400/50 shadow-[0_12px_28px_rgba(0,0,0,0.6)] cursor-pointer transition-all hover:scale-[1.01] relative overflow-hidden group"
              >
                {/* Subtle top glow line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1 mb-1">
                      <Compass className="w-3 h-3 text-cyan-400" />
                      <span>CONTINUE · {continueLesson.subject.toUpperCase()}</span>
                    </span>
                    <h2 className="font-['Outfit'] font-black text-white text-lg sm:text-xl leading-tight group-hover:text-cyan-200 transition-colors">
                      {continueLesson.title}
                    </h2>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      {continueLesson.shortDesc}
                    </p>
                  </div>

                  {/* Circular progress with 45% */}
                  <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                      <circle
                        cx="22"
                        cy="22"
                        r="18"
                        stroke="#1E293B"
                        strokeWidth="3.5"
                        fill="transparent"
                      />
                      <circle
                        cx="22"
                        cy="22"
                        r="18"
                        stroke="#06B6D4"
                        strokeWidth="3.5"
                        strokeDasharray={113}
                        strokeDashoffset={113 - (113 * 45) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-1000 ease-out shadow-[0_0_10px_#06B6D4]"
                      />
                    </svg>
                    <span className="absolute font-['Outfit'] font-extrabold text-xs text-cyan-300">
                      45%
                    </span>
                  </div>
                </div>
              </div>

              {/* 5 Chunky 3D Textbook Buttons (Std 8 Balbharati) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
                {/* 1. MATHEMATICS (Indigo/Purple 3D Button) */}
                <button
                  onClick={() => handleSubjectClick('Mathematics')}
                  className="h-28 sm:h-32 rounded-3xl p-4 flex flex-col justify-between text-left cursor-pointer transition-all transform active:translate-y-2 active:shadow-none"
                  style={{
                    background: 'linear-gradient(180deg, #6366F1 0%, #4F46E5 100%)',
                    boxShadow: '0 8px 0 #312E81, 0 16px 25px rgba(79, 70, 229, 0.45), inset 0 2px 3px rgba(255, 255, 255, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
                    <Calculator className="w-6 h-6 text-white drop-shadow" />
                  </div>
                  <div>
                    <span className="font-['Outfit'] font-black text-white text-base sm:text-lg tracking-wide drop-shadow-md block leading-tight">
                      Mathematics
                    </span>
                    <span className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">
                      Std 8 Book
                    </span>
                  </div>
                </button>

                {/* 2. GENERAL SCIENCE (Emerald / Mint 3D Button) */}
                <button
                  onClick={() => handleSubjectClick('General Science')}
                  className="h-28 sm:h-32 rounded-3xl p-4 flex flex-col justify-between text-left cursor-pointer transition-all transform active:translate-y-2 active:shadow-none"
                  style={{
                    background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                    boxShadow: '0 8px 0 #047857, 0 16px 25px rgba(16, 185, 129, 0.45), inset 0 2px 3px rgba(255, 255, 255, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
                    <FlaskConical className="w-6 h-6 text-white drop-shadow" />
                  </div>
                  <div>
                    <span className="font-['Outfit'] font-black text-white text-base sm:text-lg tracking-wide drop-shadow-md block leading-tight">
                      General Science
                    </span>
                    <span className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">
                      Std 8 Book
                    </span>
                  </div>
                </button>

                {/* 3. HISTORY & CIVICS (Amber / Warm Gold 3D Button) */}
                <button
                  onClick={() => handleSubjectClick('History & Civics')}
                  className="h-28 sm:h-32 rounded-3xl p-4 flex flex-col justify-between text-left cursor-pointer transition-all transform active:translate-y-2 active:shadow-none"
                  style={{
                    background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                    boxShadow: '0 8px 0 #92400E, 0 16px 25px rgba(245, 158, 11, 0.45), inset 0 2px 3px rgba(255, 255, 255, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
                    <Landmark className="w-6 h-6 text-white drop-shadow" />
                  </div>
                  <div>
                    <span className="font-['Outfit'] font-black text-white text-base sm:text-lg tracking-wide drop-shadow-md block leading-tight">
                      History & Civics
                    </span>
                    <span className="text-[10px] text-amber-200 font-bold uppercase tracking-wider">
                      Std 8 Book
                    </span>
                  </div>
                </button>

                {/* 4. GEOGRAPHY (Teal / Cyan 3D Button) */}
                <button
                  onClick={() => handleSubjectClick('Geography')}
                  className="h-28 sm:h-32 rounded-3xl p-4 flex flex-col justify-between text-left cursor-pointer transition-all transform active:translate-y-2 active:shadow-none"
                  style={{
                    background: 'linear-gradient(180deg, #06B6D4 0%, #0891B2 100%)',
                    boxShadow: '0 8px 0 #155E75, 0 16px 25px rgba(6, 182, 212, 0.45), inset 0 2px 3px rgba(255, 255, 255, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
                    <Globe className="w-6 h-6 text-white drop-shadow" />
                  </div>
                  <div>
                    <span className="font-['Outfit'] font-black text-white text-base sm:text-lg tracking-wide drop-shadow-md block leading-tight">
                      Geography
                    </span>
                    <span className="text-[10px] text-cyan-200 font-bold uppercase tracking-wider">
                      Std 8 Book
                    </span>
                  </div>
                </button>

                {/* 5. ENGLISH BALBHARATI (Hot Pink / Magenta 3D Button) */}
                <button
                  onClick={() => handleSubjectClick('English')}
                  className="col-span-2 sm:col-span-1 h-24 sm:h-32 rounded-3xl p-4 flex sm:flex-col justify-between items-center sm:items-start text-left cursor-pointer transition-all transform active:translate-y-2 active:shadow-none"
                  style={{
                    background: 'linear-gradient(180deg, #EC4899 0%, #DB2777 100%)',
                    boxShadow: '0 8px 0 #9D174D, 0 16px 25px rgba(236, 72, 153, 0.45), inset 0 2px 3px rgba(255, 255, 255, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 sm:justify-between w-full h-full">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner shrink-0 sm:mb-2">
                      <BookOpen className="w-6 h-6 text-white drop-shadow" />
                    </div>
                    <div>
                      <span className="font-['Outfit'] font-black text-white text-base sm:text-lg tracking-wide drop-shadow-md block leading-tight">
                        English Balbharati
                      </span>
                      <span className="text-[10px] text-pink-200 font-bold uppercase tracking-wider">
                        Std 8 Prose & Poetry
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/80 sm:hidden" />
                </button>
              </div>

              {/* Big 3D Cyan Bottom Action Button: "START DAILY QUIZ" with Vector Zap */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsDailyQuizOpen(true);
                  }}
                  className="w-full py-4 px-6 rounded-3xl font-['Outfit'] font-black text-base sm:text-lg tracking-wider uppercase text-[#061B2B] flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:brightness-105 active:translate-y-2 active:shadow-none"
                  style={{
                    background: 'linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)',
                    boxShadow: '0 8px 0 #0369A1, 0 18px 30px rgba(2, 132, 199, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <Zap className="w-6 h-6 text-[#061B2B] fill-[#061B2B] shrink-0" />
                  <span>START DAILY QUIZ</span>
                </button>
              </div>
            </div>
          )}

          {/* ===================== TAB: SUBJECTS & CHAPTERS ===================== */}
          {activeTab === 'subjects' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => { sound.playClick(); setActiveTab('home'); }}
                  className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
                <span className="text-xs font-bold text-slate-400">
                  {filteredLessons.length} Chapters Available
                </span>
              </div>

              {/* Subject Filter Pills - Crisp SVG icons for all 5 Balbharati subjects */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {([
                  'All',
                  'Mathematics',
                  'General Science',
                  'History & Civics',
                  'Geography',
                  'English'
                ] as (SubjectType | 'All')[]).map((subj) => (
                  <button
                    key={subj}
                    onClick={() => { sound.playClick(); setSelectedSubjectFilter(subj); }}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                      selectedSubjectFilter === subj
                        ? 'bg-blue-600 text-white shadow-md border border-cyan-400/40'
                        : 'bg-[#0E1832] text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {subj === 'All' && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                    {subj === 'Mathematics' && <Calculator className="w-3.5 h-3.5 text-indigo-300" />}
                    {subj === 'General Science' && <FlaskConical className="w-3.5 h-3.5 text-emerald-300" />}
                    {subj === 'History & Civics' && <Landmark className="w-3.5 h-3.5 text-amber-300" />}
                    {subj === 'Geography' && <Globe className="w-3.5 h-3.5 text-teal-300" />}
                    {subj === 'English' && <BookOpen className="w-3.5 h-3.5 text-pink-300" />}
                    <span>{subj}</span>
                  </button>
                ))}
              </div>

              {/* Lesson Cards List */}
              <div className="space-y-3 pt-1">
                {filteredLessons.map((lesson) => {
                  const isCompleted = userProgress.completedLessonIds.includes(lesson.id);
                  const progress = userProgress.lessonProgress[lesson.id];
                  return (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      isCompleted={isCompleted}
                      stepProgress={progress}
                      onStartLesson={(l) => setActiveLesson(l)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================== TAB: LEADERBOARD ===================== */}
          {activeTab === 'leaderboard' && (
            <div className="animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => { sound.playClick(); setActiveTab('home'); }}
                  className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
              </div>
              <LeaderboardView
                users={leaderboardUsers}
                currentUserName={userProgress.studentName}
                onAddClassmate={handleAddClassmate}
                onRemoveClassmate={handleRemoveClassmate}
              />
            </div>
          )}

          {/* ===================== TAB: BADGES ===================== */}
          {activeTab === 'badges' && (
            <div className="animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => { sound.playClick(); setActiveTab('home'); }}
                  className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
              </div>
              <BadgesView badges={badges} />
            </div>
          )}
        </div>

        {/* Bottom Navigation Dock */}
        <nav aria-label="Main Navigation" className="border-t border-blue-500/20 bg-[#060D1E]/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-around">
          <button
            onClick={() => { sound.playClick(); setActiveTab('home'); }}
            className={`flex flex-col items-center gap-1 text-[11px] font-bold transition-all ${
              activeTab === 'home' ? 'text-cyan-400 scale-105' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('subjects'); }}
            className={`flex flex-col items-center gap-1 text-[11px] font-bold transition-all ${
              activeTab === 'subjects' ? 'text-cyan-400 scale-105' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Subjects</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('leaderboard'); }}
            className={`flex flex-col items-center gap-1 text-[11px] font-bold transition-all ${
              activeTab === 'leaderboard' ? 'text-cyan-400 scale-105' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span>Ranks</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('badges'); }}
            className={`flex flex-col items-center gap-1 text-[11px] font-bold transition-all ${
              activeTab === 'badges' ? 'text-cyan-400 scale-105' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Award className="w-5 h-5" />
            <span>Badges</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setIsAiMentorOpen(true); }}
            className="flex flex-col items-center gap-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-all"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Ask AI</span>
          </button>
        </nav>
      </div>

      {/* ===================== MODALS ===================== */}
      {/* 1. Signature 3-Step Lesson Modal */}
      {activeLesson && (
        <ThreeStepLessonModal
          lesson={activeLesson}
          isOpen={!!activeLesson}
          onClose={() => setActiveLesson(null)}
          onLessonComplete={handleLessonComplete}
        />
      )}

      {/* 2. Daily Quiz Modal (Triggered by START DAILY QUIZ) */}
      <DailyQuizModal
        isOpen={isDailyQuizOpen}
        onClose={() => setIsDailyQuizOpen(false)}
        onQuizComplete={handleDailyQuizComplete}
      />

      {/* 3. AI Mentor / Doubt Buster Modal */}
      <AiMentorModal
        isOpen={isAiMentorOpen}
        onClose={() => setIsAiMentorOpen(false)}
      />

      {/* 4. Student Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProgress={userProgress}
        onUpdateUser={handleUpdateProfile}
      />
    </div>
  );
}
