import React from 'react';
import { 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Divide, 
  Variable, 
  Dna, 
  Zap, 
  BookOpen, 
  ShieldCheck, 
  Bug,
  Award,
  Calculator,
  FlaskConical,
  Landmark,
  Compass,
  Globe,
  Sun,
  Flame,
  Scale
} from 'lucide-react';
import { Lesson } from '../types';
import { sound } from '../utils/audio';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  stepProgress?: { step1: boolean; step2: boolean; step3: boolean };
  onStartLesson: (lesson: Lesson) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isCompleted,
  stepProgress,
  onStartLesson
}) => {
  // Render subject icon
  const renderIcon = () => {
    switch (lesson.iconName) {
      case 'Calculator':
      case 'Divide':
        return <Calculator className="w-6 h-6 text-cyan-400" />;
      case 'Variable':
        return <Variable className="w-6 h-6 text-blue-400" />;
      case 'FlaskConical':
      case 'Dna':
        return <FlaskConical className="w-6 h-6 text-emerald-400" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Landmark':
      case 'ShieldCheck':
        return <Landmark className="w-6 h-6 text-amber-400" />;
      case 'Globe':
      case 'Compass':
        return <Compass className="w-6 h-6 text-teal-400" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-pink-400" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-yellow-400" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-purple-400" />;
      case 'Bug':
        return <Bug className="w-6 h-6 text-teal-400" />;
      default:
        return <BookOpen className="w-6 h-6 text-cyan-400" />;
    }
  };

  const getSubjectColor = () => {
    switch (lesson.subject) {
      case 'Mathematics':
      case 'Math':
        return 'text-indigo-300 border-indigo-500/30 bg-indigo-500/15';
      case 'General Science':
      case 'Science':
        return 'text-emerald-300 border-emerald-500/30 bg-emerald-500/15';
      case 'Geography':
        return 'text-teal-300 border-teal-500/30 bg-teal-500/15';
      case 'History & Civics':
      case 'Social Science':
        return 'text-amber-300 border-amber-500/30 bg-amber-500/15';
      case 'English':
        return 'text-pink-300 border-pink-500/30 bg-pink-500/15';
      default:
        return 'text-cyan-300 border-cyan-500/30 bg-cyan-500/15';
    }
  };

  return (
    <div className={`card-3d-dark card-3d-hover rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
      isCompleted ? 'border-emerald-500/40 shadow-[0_10px_25px_rgba(16,185,129,0.15)]' : ''
    }`}>
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${getSubjectColor()}`}>
              {lesson.subject}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Chapter {lesson.chapterNumber}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{lesson.xpReward} XP</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-[#091226] border border-blue-500/30 flex items-center justify-center shrink-0 shadow-sm">
            {renderIcon()}
          </div>
          <div>
            <h3 className="font-['Outfit'] font-bold text-base text-white leading-tight">
              {lesson.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {lesson.shortDesc}
            </p>
          </div>
        </div>
      </div>

      {/* 3-Step Visual Progress Bar */}
      <div className="pt-3 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-medium">3-Step Path:</span>
          <div className="flex items-center gap-2 font-bold text-[10px]">
            <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${stepProgress?.step1 || isCompleted ? 'text-cyan-400 bg-cyan-950/40' : 'text-slate-500'}`}>
              💡 Concept
            </span>
            <span>•</span>
            <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${stepProgress?.step2 || isCompleted ? 'text-cyan-400 bg-cyan-950/40' : 'text-slate-500'}`}>
              ⚡ Practice
            </span>
            <span>•</span>
            <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${isCompleted ? 'text-emerald-400 bg-emerald-950/40' : 'text-slate-500'}`}>
              🎯 Quiz
            </span>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => {
              sound.playClick();
              onStartLesson(lesson);
            }}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isCompleted
                ? 'btn-3d-slate text-emerald-300 border border-emerald-500/40'
                : 'btn-3d-primary text-white'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mastered • Review 3 Steps</span>
              </>
            ) : (
              <>
                <span>Start 3-Step Lesson</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
