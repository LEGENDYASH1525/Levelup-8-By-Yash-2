import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ArrowRight, BookOpen, Target, Award } from 'lucide-react';
import { SubjectType } from '../types';
import { sound } from '../utils/audio';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (data: { studentName: string; avatar: string; favoriteSubject: SubjectType; dailyGoalMin: number }) => void;
  defaultName?: string;
}

const AVATARS = ['🚀', '🧠', '⚡', '🔬', '🌟', '🛡️', '🎯', '📚'];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  defaultName = 'Yash'
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState(defaultName);
  const [selectedAvatar, setSelectedAvatar] = useState('🚀');
  const [favoriteSubject, setFavoriteSubject] = useState<SubjectType>('Math');
  const [dailyGoalMin, setDailyGoalMin] = useState(20);

  if (!isOpen) return null;

  const handleNext = () => {
    sound.playClick();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Complete!
      sound.playTriumph();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onComplete({
        studentName: name.trim() || 'Yash',
        avatar: selectedAvatar,
        favoriteSubject,
        dailyGoalMin
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-lg card-3d-dark rounded-2xl border border-blue-500/40 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-300 text-sm font-black font-['Outfit']">
              8
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Class 8 Quick Setup • Step {step} of 3
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? 'w-6 bg-cyan-400 shadow-[0_0_8px_#38BDF8]' : s < step ? 'w-2 bg-blue-500' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Welcome & Mission */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center py-2">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-[0_8px_20px_rgba(37,99,235,0.4)] border border-cyan-300/50">
                <Sparkles className="w-8 h-8 text-white animate-spin-slow" />
              </div>
              <h2 className="font-['Outfit'] text-2xl font-black text-white">
                Welcome to LevelUp 8!
              </h2>
              <p className="text-xs text-cyan-300 font-semibold mt-0.5">
                Built by Yash for Class 8 Champions
              </p>
              <p className="text-sm text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                Crush your 8th Standard syllabus effortlessly using our signature <span className="text-cyan-300 font-bold">3-Step Method</span>:
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-[#0D162B] border border-blue-500/20 text-center">
                <div className="text-lg mb-1">💡</div>
                <div className="text-xs font-bold text-slate-200">1. Concept</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Bite-sized flashcards</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0D162B] border border-blue-500/20 text-center">
                <div className="text-lg mb-1">⚡</div>
                <div className="text-xs font-bold text-slate-200">2. Practice</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Hands-on simulator</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0D162B] border border-blue-500/20 text-center">
                <div className="text-lg mb-1">🎯</div>
                <div className="text-xs font-bold text-slate-200">3. Boss Quiz</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Earn XP & Badges</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Name & Avatar */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="font-['Outfit'] text-xl font-bold text-white mb-1">
                Customize Your Student Identity
              </h2>
              <p className="text-xs text-slate-400">
                This name and badge will appear on the live Class 8 Leaderboard.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Your Name / Nickname
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Yash"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0D172E] border border-blue-500/40 text-white font-semibold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Choose Your Hero Avatar
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => { sound.playClick(); setSelectedAvatar(av); }}
                    className={`h-14 rounded-xl text-2xl flex items-center justify-center transition-all ${
                      selectedAvatar === av
                        ? 'bg-blue-600/40 border-2 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.4)] scale-105'
                        : 'bg-[#0E1830] border border-slate-700/60 hover:border-slate-500'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Focus & Goals */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="font-['Outfit'] text-xl font-bold text-white mb-1">
                Set Your Study Plan
              </h2>
              <p className="text-xs text-slate-400">
                Tailor your 8th standard prep to what matters most.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Priority Subject
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Math', 'Science', 'English', 'Social Science'] as SubjectType[]).map((subj) => (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => { sound.playClick(); setFavoriteSubject(subj); }}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      favoriteSubject === subj
                        ? 'bg-blue-600/30 border-cyan-400 text-white shadow-md'
                        : 'bg-[#0D172E] border-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold">{subj}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {subj === 'Math' ? 'Rational No., Equations' : subj === 'Science' ? 'Cells, Forces, Microbes' : subj === 'English' ? 'Grammar & Voice' : 'Civics & History'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Daily Learning Goal</span>
                <span className="text-cyan-400 font-bold">{dailyGoalMin} Minutes / day</span>
              </label>
              <input
                type="range"
                min={10}
                max={45}
                step={5}
                value={dailyGoalMin}
                onChange={(e) => setDailyGoalMin(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>10m (Quick)</span>
                <span>20m (Recommended)</span>
                <span>45m (Pro)</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Action Button */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={handleNext}
            className="w-full py-3 px-6 rounded-xl btn-3d-primary font-bold text-white text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{step === 3 ? "Let's Level Up! 🚀" : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
