import React from 'react';
import { 
  GraduationCap, 
  Flame, 
  Sparkles, 
  FlaskConical, 
  Shield, 
  Brain, 
  Target, 
  Trophy, 
  Compass,
  User
} from 'lucide-react';

export interface AvatarOption {
  id: string;
  name: string;
  gradient: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'scholar',
    name: 'Class Scholar',
    gradient: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-400',
    icon: GraduationCap
  },
  {
    id: 'phoenix',
    name: 'Streak Phoenix',
    gradient: 'from-amber-500 to-rose-600',
    borderColor: 'border-amber-400',
    icon: Flame
  },
  {
    id: 'scientist',
    name: 'Lab Explorer',
    gradient: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-400',
    icon: FlaskConical
  },
  {
    id: 'warrior',
    name: 'Maratha Shield',
    gradient: 'from-orange-500 to-amber-600',
    borderColor: 'border-amber-400',
    icon: Shield
  },
  {
    id: 'thinker',
    name: 'Brainiac',
    gradient: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-400',
    icon: Brain
  },
  {
    id: 'champion',
    name: 'Gold Trophy',
    gradient: 'from-yellow-400 to-amber-500',
    borderColor: 'border-yellow-300',
    icon: Trophy
  },
  {
    id: 'marksman',
    name: 'Ace Marksman',
    gradient: 'from-pink-500 to-rose-600',
    borderColor: 'border-rose-400',
    icon: Target
  },
  {
    id: 'navigator',
    name: 'Pathfinder',
    gradient: 'from-teal-400 to-cyan-500',
    borderColor: 'border-cyan-300',
    icon: Compass
  }
];

export function getAvatarOption(avatarId?: string): AvatarOption {
  if (!avatarId) return AVATAR_OPTIONS[0];

  // Map legacy emoji strings or id names
  const match = AVATAR_OPTIONS.find(a => a.id === avatarId);
  if (match) return match;

  if (avatarId.includes('🦉') || avatarId === 'scholar') return AVATAR_OPTIONS[0];
  if (avatarId.includes('⚡') || avatarId.includes('🚀') || avatarId.includes('🔥') || avatarId === 'phoenix') return AVATAR_OPTIONS[1];
  if (avatarId.includes('🔬') || avatarId === 'scientist') return AVATAR_OPTIONS[2];
  if (avatarId.includes('🛡️') || avatarId === 'warrior') return AVATAR_OPTIONS[3];
  if (avatarId.includes('🧠') || avatarId === 'thinker') return AVATAR_OPTIONS[4];
  if (avatarId.includes('🌟') || avatarId.includes('👑') || avatarId === 'champion') return AVATAR_OPTIONS[5];
  if (avatarId.includes('🎯') || avatarId === 'marksman') return AVATAR_OPTIONS[6];

  return AVATAR_OPTIONS[0];
}

interface StudentAvatarProps {
  avatarId?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
  className?: string;
}

export const StudentAvatar: React.FC<StudentAvatarProps> = ({
  avatarId,
  size = 'md',
  showGlow = false,
  className = ''
}) => {
  const option = getAvatarOption(avatarId);
  const Icon = option.icon;

  const sizeClasses = {
    xs: 'w-6 h-6 p-1',
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
    xl: 'w-16 h-16 p-3.5'
  };

  const iconSizes = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  return (
    <div
      className={`rounded-full bg-gradient-to-tr ${option.gradient} flex items-center justify-center text-white shrink-0 border ${option.borderColor} ${
        showGlow ? 'shadow-[0_0_16px_rgba(6,182,212,0.6)]' : 'shadow-md'
      } ${sizeClasses[size]} ${className}`}
    >
      <Icon className={`${iconSizes[size]} text-white drop-shadow`} />
    </div>
  );
};
