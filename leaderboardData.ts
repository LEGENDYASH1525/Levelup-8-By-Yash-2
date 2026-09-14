import { LeaderboardUser } from '../types';

export interface MasteryTier {
  id: string;
  name: string;
  minXp: number;
  badge: string;
  color: string;
  perks: string;
}

export const MASTERY_TIERS: MasteryTier[] = [
  {
    id: 'bronze',
    name: 'Bronze Scholar',
    minXp: 0,
    badge: 'Bronze',
    color: 'from-amber-700 to-amber-900',
    perks: 'Access to all standard Class 8 flashcards'
  },
  {
    id: 'silver',
    name: 'Silver Achiever',
    minXp: 500,
    badge: 'Silver',
    color: 'from-slate-400 to-slate-600',
    perks: 'Unlock Boss Quizzes and Daily Streak multipliers'
  },
  {
    id: 'gold',
    name: 'Gold Elite',
    minXp: 1000,
    badge: 'Gold',
    color: 'from-amber-400 to-yellow-600',
    perks: 'Doubt Buster AI & Maratha Empire Mastery'
  },
  {
    id: 'platinum',
    name: 'Platinum Master',
    minXp: 2000,
    badge: 'Platinum',
    color: 'from-cyan-400 to-blue-600',
    perks: 'Top 1% Speed Solver badge & custom avatar rings'
  },
  {
    id: 'diamond',
    name: 'Diamond Legend',
    minXp: 3000,
    badge: 'Diamond',
    color: 'from-purple-400 to-pink-600',
    perks: 'Grandmaster Class 8 Diploma'
  }
];

export function getRealPlayers(
  currentUser: { name: string; avatar: string; xp: number; streakDays: number }
): LeaderboardUser[] {
  // Read any classmate added by the user in localStorage, default empty (NO BOTS!)
  const storedClassmatesRaw = typeof window !== 'undefined' ? localStorage.getItem('levelup8_classmates') : null;
  let classmates: LeaderboardUser[] = [];
  if (storedClassmatesRaw) {
    try {
      classmates = JSON.parse(storedClassmatesRaw);
    } catch {}
  }

  const userEntry: LeaderboardUser = {
    id: 'current-user',
    rank: 1,
    name: currentUser.name || 'Aarav Deshmukh',
    avatar: currentUser.avatar || 'scholar',
    schoolClass: '8th Standard',
    xp: currentUser.xp,
    streakDays: currentUser.streakDays,
    topBadge: currentUser.xp >= 1000 ? 'Gold Elite' : currentUser.xp >= 500 ? 'Silver Achiever' : 'Bronze Scholar',
    isCurrentUser: true
  };

  const allPlayers = [userEntry, ...classmates];
  allPlayers.sort((a, b) => b.xp - a.xp);

  return allPlayers.map((p, idx) => ({
    ...p,
    rank: idx + 1
  }));
}
