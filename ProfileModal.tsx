import React, { useState } from 'react';
import { X, Check, Flame, Trophy, Sparkles, BookOpen, Clock, Medal } from 'lucide-react';
import { UserProgress } from '../types';
import { sound } from '../utils/audio';
import { AVATAR_OPTIONS, StudentAvatar, getAvatarOption } from './StudentAvatar';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  onUpdateUser: (name: string, avatar: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userProgress,
  onUpdateUser
}) => {
  if (!isOpen) return null;

  const initialOpt = getAvatarOption(userProgress.avatar);
  const [name, setName] = useState(userProgress.studentName);
  const [selectedAvatar, setSelectedAvatar] = useState(initialOpt.id);

  const handleSave = () => {
    sound.playClick();
    onUpdateUser(name.trim() || 'Aarav Deshmukh', selectedAvatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md card-3d-dark rounded-3xl border border-blue-500/40 p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Outfit'] font-black text-xl text-white flex items-center gap-2">
            <Medal className="w-5 h-5 text-amber-400" />
            <span>Student Profile</span>
          </h2>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar Display */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <StudentAvatar avatarId={selectedAvatar} size="xl" showGlow />
            <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow">
              LVL {userProgress.level}
            </div>
          </div>
          <p className="text-xs text-cyan-300 font-bold mt-2">
            {getAvatarOption(selectedAvatar).name}
          </p>
        </div>

        {/* Vector Avatar Selector */}
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-400 block mb-2">
            Choose Character Icon:
          </label>
          <div className="grid grid-cols-4 gap-2">
            {AVATAR_OPTIONS.map((opt) => {
              const isSelected = selectedAvatar === opt.id;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedAvatar(opt.id);
                  }}
                  className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-blue-600/40 border-2 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)] scale-105'
                      : 'bg-[#080E1E] border border-blue-500/20 hover:border-blue-500/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${opt.gradient} flex items-center justify-center text-white shadow-sm`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-300 truncate w-full text-center">
                    {opt.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Name Input */}
        <div className="mb-5">
          <label className="text-xs font-bold text-slate-400 block mb-1.5">
            Student Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#080E1E] border border-blue-500/40 text-white font-bold text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#080E1E] border border-blue-500/20 mb-5 text-center">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Total XP</div>
            <div className="font-['Outfit'] font-black text-amber-400 text-sm">{userProgress.xp}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Streak</div>
            <div className="font-['Outfit'] font-black text-orange-400 text-sm">{userProgress.streakDays}d</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Rank</div>
            <div className="font-['Outfit'] font-black text-cyan-400 text-sm">#1 Gold</div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-3 rounded-2xl btn-3d-primary font-['Outfit'] font-black text-white text-sm cursor-pointer shadow-lg"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};
