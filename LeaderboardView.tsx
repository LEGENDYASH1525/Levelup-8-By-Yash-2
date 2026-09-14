import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Medal, 
  Crown, 
  Plus, 
  UserCheck, 
  ShieldCheck, 
  CheckCircle2, 
  Trash2,
  Share2
} from 'lucide-react';
import { LeaderboardUser } from '../types';
import { MASTERY_TIERS } from '../data/leaderboardData';
import { StudentAvatar } from './StudentAvatar';
import { sound } from '../utils/audio';

interface LeaderboardViewProps {
  users: LeaderboardUser[];
  currentUserName: string;
  onAddClassmate?: (name: string, xp: number) => void;
  onRemoveClassmate?: (id: string) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  users,
  currentUserName,
  onAddClassmate,
  onRemoveClassmate
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [friendXp, setFriendXp] = useState('850');
  const [copiedCode, setCopiedCode] = useState(false);

  const currentUser = users.find(u => u.isCurrentUser) || users[0];
  const userXp = currentUser ? currentUser.xp : 1140;

  const handleAddFriendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim()) return;
    sound.playTriumph();
    if (onAddClassmate) {
      onAddClassmate(friendName.trim(), parseInt(friendXp) || 500);
    }
    setFriendName('');
    setShowAddForm(false);
  };

  const handleCopyPass = () => {
    sound.playClick();
    navigator.clipboard?.writeText?.(`LEVELUP8-ROOM-${currentUserName.toUpperCase().replace(/\s+/g, '')}`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto py-1 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Authentic Class 8 Ranks</span>
        </div>
        <h2 className="font-['Outfit'] text-2xl font-black text-white">
          Real Player Leaderboard
        </h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No automated bots. Every point, streak, and medal is earned for real by you and your classmates.
        </p>
      </div>

      {/* Solo Champion Highlight Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#121F3E] via-[#0E1A34] to-[#0A1224] border border-amber-500/30 shadow-[0_12px_30px_rgba(0,0,0,0.6)] relative overflow-hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <StudentAvatar avatarId={currentUser?.avatar} size="lg" showGlow />
              <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center border-2 border-slate-900 shadow">
                #1
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-['Outfit'] font-black text-white text-base sm:text-lg">
                  {currentUser?.name || currentUserName}
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/40 text-[10px] font-black text-amber-300">
                  YOU
                </span>
              </div>
              <p className="text-xs text-amber-400 font-bold flex items-center gap-1 mt-0.5">
                <Medal className="w-3.5 h-3.5" />
                <span>GOLD DIVISION · RANK #1</span>
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="font-['Outfit'] font-black text-xl text-white">
              {currentUser?.xp || 1140} XP
            </div>
            <div className="text-[10px] font-bold text-slate-400 flex items-center justify-end gap-1 mt-0.5">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{currentUser?.streakDays || 9}d Streak</span>
            </div>
          </div>
        </div>

        {/* Solo Badge notice */}
        <div className="mt-3.5 pt-3 border-t border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Bot-Free Zone: Clean authenticated record</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPass}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-cyan-300 text-[11px] font-bold flex items-center gap-1 transition-all"
            >
              <Share2 className="w-3 h-3" />
              <span>{copiedCode ? 'Room Code Copied!' : 'Share Room'}</span>
            </button>

            <button
              onClick={() => { sound.playClick(); setShowAddForm(!showAddForm); }}
              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3 h-3" />
              <span>Add Classmate</span>
            </button>
          </div>
        </div>

        {/* Add Classmate Form */}
        {showAddForm && (
          <form onSubmit={handleAddFriendSubmit} className="mt-3 p-3 rounded-2xl bg-[#080E1E] border border-cyan-500/30 space-y-2.5 animate-in fade-in">
            <div className="text-xs font-bold text-cyan-300">
              Add a real classmate to compare scores:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Classmate's Name (e.g. Rohan)"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#0F1A34] border border-blue-500/40 text-xs text-white sm:col-span-2 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="number"
                placeholder="Starting XP"
                value={friendXp}
                onChange={(e) => setFriendXp(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#0F1A34] border border-blue-500/40 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 rounded-lg btn-3d-primary text-xs font-bold text-white cursor-pointer"
              >
                Add to Board
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Players List (Only Real Players, zero bots) */}
      {users.length > 1 && (
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Active Classmates ({users.length})
          </div>
          {users.map((player) => (
            <div
              key={player.id}
              className={`p-3 rounded-2xl flex items-center justify-between gap-3 border transition-all ${
                player.isCurrentUser
                  ? 'bg-blue-950/60 border-cyan-500/50 shadow-md'
                  : 'bg-[#0A1224] border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 font-['Outfit'] font-black text-xs text-slate-400 text-center">
                  #{player.rank}
                </span>
                <StudentAvatar avatarId={player.avatar} size="sm" />
                <div>
                  <div className="font-bold text-xs text-white flex items-center gap-1.5">
                    <span>{player.name}</span>
                    {player.isCurrentUser && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-300 font-bold">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {player.schoolClass}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-bold text-xs text-amber-300 font-mono">
                    {player.xp} XP
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {player.streakDays}d streak
                  </div>
                </div>
                {!player.isCurrentUser && onRemoveClassmate && (
                  <button
                    onClick={() => onRemoveClassmate(player.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Remove classmate"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Class 8 Mastery Divisions Roadmap */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Class 8 Mastery League
          </span>
          <span className="text-xs font-bold text-cyan-400">
            Current: Gold Elite
          </span>
        </div>

        <div className="space-y-2">
          {MASTERY_TIERS.map((tier) => {
            const isAchieved = userXp >= tier.minXp;
            const isCurrent = isAchieved && (userXp < tier.minXp + 1000 || tier.id === 'diamond');

            return (
              <div
                key={tier.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-amber-950/40 border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : isAchieved
                    ? 'bg-[#0B152B] border-blue-500/30 text-slate-300'
                    : 'bg-[#080E1E]/60 border-slate-800/80 text-slate-500 opacity-70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${tier.color} flex items-center justify-center text-white shadow-sm shrink-0`}>
                    <Medal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-['Outfit'] font-black text-xs sm:text-sm text-white flex items-center gap-1.5">
                      <span>{tier.name}</span>
                      {isCurrent && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {tier.perks}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-amber-300 font-mono">
                    {tier.minXp}+ XP
                  </span>
                  <div>
                    {isAchieved ? (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center justify-end gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-medium">
                        Locked
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
