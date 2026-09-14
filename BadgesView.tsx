import React from 'react';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Lock, 
  Calculator, 
  FlaskConical, 
  Footprints, 
  Crown 
} from 'lucide-react';
import { Badge } from '../types';

interface BadgesViewProps {
  badges: Badge[];
}

export const BadgesView: React.FC<BadgesViewProps> = ({ badges }) => {
  const renderBadgeIcon = (iconName: string, unlocked: boolean) => {
    const className = `w-7 h-7 ${unlocked ? 'text-amber-300' : 'text-slate-600'}`;
    switch (iconName) {
      case 'Footprints':
        return <Footprints className={className} />;
      case 'Calculator':
        return <Calculator className={className} />;
      case 'FlaskConical':
        return <FlaskConical className={className} />;
      case 'Trophy':
        return <Trophy className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'Crown':
        return <Crown className={className} />;
      default:
        return <Award className={className} />;
    }
  };

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-xs font-bold mb-1">
          <Award className="w-3.5 h-3.5" />
          <span>Hall of Achievements</span>
        </div>
        <h2 className="font-['Outfit'] text-2xl md:text-3xl font-black text-white">
          Your Trophies & Medals
        </h2>
        <p className="text-xs md:text-sm text-slate-400 max-w-md mx-auto">
          Unlock badges as you complete 3-step lessons, maintain streaks, and master Boss Quizzes.
        </p>
        <div className="pt-2">
          <span className="inline-block px-3 py-1 rounded-lg bg-blue-950/60 border border-cyan-400/30 text-xs font-bold text-cyan-300">
            {unlockedCount} of {badges.length} Badges Unlocked
          </span>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge) => {
          return (
            <div
              key={badge.id}
              className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                badge.unlocked
                  ? 'card-3d-dark border-amber-500/40 shadow-[0_8px_25px_rgba(245,158,11,0.15)] hover:border-amber-400'
                  : 'bg-[#0A1021]/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                  badge.unlocked
                    ? 'bg-gradient-to-tr from-amber-600/40 to-yellow-500/20 border-amber-400/50 shadow-inner'
                    : 'bg-slate-900 border-slate-800'
                }`}>
                  {renderBadgeIcon(badge.icon, badge.unlocked)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-['Outfit'] font-bold text-sm text-white">
                      {badge.title}
                    </h3>
                    {badge.unlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 uppercase tracking-wider font-semibold">
                  {badge.category}
                </span>
                <span className={`font-bold ${badge.unlocked ? 'text-amber-400' : 'text-slate-500'}`}>
                  {badge.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
