import React from 'react';
import { Sparkles, Flame, Volume2, VolumeX, Smartphone, Monitor, HelpCircle, Trophy } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  xp: number;
  level: number;
  streakDays: number;
  studentName: string;
  avatar: string;
  activeTab: 'lessons' | 'leaderboard' | 'badges';
  setActiveTab: (tab: 'lessons' | 'leaderboard' | 'badges') => void;
  isMobilePreview: boolean;
  setIsMobilePreview: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenAiMentor: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  xp,
  level,
  streakDays,
  studentName,
  avatar,
  activeTab,
  setActiveTab,
  isMobilePreview,
  setIsMobilePreview,
  onOpenAiMentor,
  onOpenProfile
}) => {
  const [isMuted, setIsMuted] = React.useState(sound.getIsMuted());

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  // XP to next level (each level is 300 XP)
  const xpInCurrentLevel = xp % 300;
  const levelProgressPercent = Math.min(100, Math.round((xpInCurrentLevel / 300) * 100));

  return (
    <header className="sticky top-0 z-40 bg-[#091124]/90 backdrop-blur-md border-b border-blue-500/20 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Creator Attribution */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => { sound.playClick(); setActiveTab('lessons'); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.4)] border border-cyan-300/40 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-white text-lg font-['Outfit']">8</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Outfit'] font-black text-lg md:text-xl tracking-wide bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                  LevelUp 8
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  by Yash
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                8th Standard Smart Learning
              </p>
            </div>
          </div>
        </div>

        {/* Center Nav Tabs */}
        <div className="flex items-center bg-[#0D1833] p-1 rounded-xl border border-blue-500/20 shadow-inner">
          <button
            onClick={() => { sound.playClick(); setActiveTab('lessons'); }}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'lessons'
                ? 'bg-blue-600 text-white shadow-[0_2px_8px_rgba(37,99,235,0.5)] border border-blue-400/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Lessons</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('leaderboard'); }}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'leaderboard'
                ? 'bg-blue-600 text-white shadow-[0_2px_8px_rgba(37,99,235,0.5)] border border-blue-400/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Leaderboard</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('badges'); }}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'badges'
                ? 'bg-blue-600 text-white shadow-[0_2px_8px_rgba(37,99,235,0.5)] border border-blue-400/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Badges</span>
          </button>
        </div>

        {/* Right Stats & Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* XP & Level Pill */}
          <div className="hidden lg:flex items-center gap-2 bg-[#121E3D] px-3 py-1.5 rounded-xl border border-blue-500/30 shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                Lvl {level}
              </span>
              <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500" 
                  style={{ width: `${levelProgressPercent}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-400 font-extrabold text-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{xp}</span>
              <span className="text-[10px] text-amber-500 font-bold">XP</span>
            </div>
          </div>

          {/* Streak Flame */}
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1.5 rounded-xl text-amber-300 text-xs font-bold shadow-sm">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{streakDays}d</span>
          </div>

          {/* Ask AI Doubt Button */}
          <button
            onClick={() => { sound.playClick(); onOpenAiMentor(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-[0_3px_0_#3730A3] active:translate-y-0.5 transition-all border border-indigo-400/40"
            title="Ask 8th Standard AI Doubt Solver"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-200" />
            <span className="hidden sm:inline">Ask Doubt</span>
          </button>

          {/* Mobile Preview / Desktop Switch */}
          <button
            onClick={() => {
              sound.playClick();
              setIsMobilePreview((prev: boolean) => !prev);
            }}
            className="p-2 rounded-xl bg-[#121E3D] hover:bg-[#1A2A54] border border-blue-500/30 text-blue-300 hover:text-white transition-colors"
            title={isMobilePreview ? "Switch to Full Desktop View" : "Preview in Mobile Frame"}
          >
            {isMobilePreview ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-xl bg-[#121E3D] hover:bg-[#1A2A54] border border-blue-500/30 text-blue-300 hover:text-white transition-colors"
            title={isMuted ? "Unmute Sound FX" : "Mute Sound FX"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => { sound.playClick(); onOpenProfile(); }}
            className="flex items-center gap-1.5 p-1 pl-2 pr-2.5 rounded-xl bg-[#162244] hover:bg-[#1E2E5B] border border-blue-500/40 transition-all hover:scale-105"
            title="Edit Student Profile"
          >
            <span className="text-base">{avatar}</span>
            <span className="text-xs font-bold text-slate-200 hidden md:inline max-w-[80px] truncate">
              {studentName}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
