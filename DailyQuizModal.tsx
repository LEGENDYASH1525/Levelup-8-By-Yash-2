import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Zap, 
  X, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Sparkles, 
  Flame, 
  RotateCcw,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { sound } from '../utils/audio';

interface DailyQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuizComplete: (earnedXp: number) => void;
}

const DAILY_QUESTIONS = [
  {
    subject: 'Mathematics',
    color: 'from-indigo-500 to-purple-600',
    question: 'What is the additive identity for any rational number m/n?',
    options: ['1', '0', '-1', 'Infinity'],
    correctIndex: 1,
    explanation: 'For any rational number a, a + 0 = a. Therefore, 0 is the additive identity!'
  },
  {
    subject: 'General Science',
    color: 'from-emerald-500 to-teal-600',
    question: 'Which scientist introduced the landmark 5-Kingdom biological classification in 1969?',
    options: ['Carl Linnaeus', 'Robert H. Whittaker', 'Ernest Rutherford', 'Alexander Fleming'],
    correctIndex: 1,
    explanation: 'Robert Harding Whittaker divided all living organisms into Monera, Protista, Fungi, Plantae, and Animalia.'
  },
  {
    subject: 'History & Civics',
    color: 'from-amber-500 to-orange-600',
    question: 'On which historic day was the State of Maharashtra officially formed with Mumbai as capital?',
    options: ['15 August 1947', '26 January 1950', '1 May 1960', '1 November 1956'],
    correctIndex: 2,
    explanation: 'Maharashtra State was formed on 1 May 1960 following the sacrifice of 106 martyrs of Samyukta Maharashtra.'
  },
  {
    subject: 'Geography',
    color: 'from-teal-500 to-cyan-600',
    question: 'Which meridian passes through Mirzapur to determine Indian Standard Time (IST)?',
    options: ['73° E', '80° E', '82° 30\' E (+5:30 GMT)', '90° 30\' E'],
    correctIndex: 2,
    explanation: '82° 30\' E longitude is selected as the central meridian for Indian Standard Time, exactly 5h 30m ahead of GMT.'
  },
  {
    subject: 'English',
    color: 'from-pink-500 to-rose-600',
    question: 'Why is the taxicab number 1729 immortalized as the Hardy-Ramanujan number?',
    options: [
      'Smallest number sum of two cubes in two different ways (1³+12³ and 9³+10³)',
      'Speed of sound in air',
      'The year Cambridge was founded',
      'The largest prime under 2000'
    ],
    correctIndex: 0,
    explanation: '1729 = 1³ + 12³ = 9³ + 10³, discovered intuitively on the spot by Srinivasa Ramanujan!'
  }
];

export const DailyQuizModal: React.FC<DailyQuizModalProps> = ({
  isOpen,
  onClose,
  onQuizComplete
}) => {
  if (!isOpen) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [idx: number]: { opt: number; correct: boolean } }>({});
  const [combo, setCombo] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const currentQ = DAILY_QUESTIONS[currentIndex];

  // 15-second countdown per question
  useEffect(() => {
    if (isFinished || answers[currentIndex] !== undefined) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up for this question
          handleSelectOption(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isFinished, answers]);

  const handleSelectOption = (optIndex: number) => {
    if (answers[currentIndex] !== undefined) return;
    const isCorrect = optIndex === currentQ.correctIndex;

    if (isCorrect) {
      sound.playCorrect();
      setCombo((prev) => prev + 1);
    } else {
      sound.playWrong();
      setCombo(0);
    }

    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: { opt: optIndex, correct: isCorrect }
    }));
    setSelectedOpt(optIndex);
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < DAILY_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOpt(null);
      setTimeLeft(15);
    } else {
      // Finished!
      setIsFinished(true);
      sound.playTriumph();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });

      // Calculate total XP: 40 XP per correct + combo bonus
      let correctTotal = 0;
      (Object.values(answers) as Array<{ opt: number; correct: boolean }>).forEach((a) => {
        if (a.correct) correctTotal++;
      });
      const earnedXp = correctTotal * 50 + (correctTotal >= 4 ? 50 : 0);
      onQuizComplete(earnedXp);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setCurrentIndex(0);
    setSelectedOpt(null);
    setAnswers({});
    setCombo(0);
    setIsFinished(false);
    setTimeLeft(15);
  };

  const answeredList = Object.values(answers) as Array<{ opt: number; correct: boolean }>;
  const correctScore = answeredList.filter((a) => a.correct).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg card-3d-dark rounded-3xl border border-cyan-500/40 p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="font-['Outfit'] font-black text-white text-base tracking-wide flex items-center gap-1.5">
                <span>DAILY QUIZ ARENA</span>
                {combo >= 2 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black flex items-center gap-0.5 animate-bounce">
                    <Flame className="w-3 h-3 fill-slate-950" /> {combo}x COMBO
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-cyan-300 font-semibold">
                5 Fast Questions • Class 8 Mix
              </p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isFinished ? (
          <div className="space-y-4">
            {/* Progress & Timer Bar */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Question {currentIndex + 1} of {DAILY_QUESTIONS.length}</span>
              <div className={`flex items-center gap-1 font-mono px-2 py-0.5 rounded-md ${
                timeLeft <= 5 ? 'text-rose-400 bg-rose-950/50 border border-rose-500/30 animate-pulse' : 'text-cyan-300 bg-cyan-950/30'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            </div>

            {/* Subject pill */}
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md bg-blue-600/30 text-cyan-300 border border-cyan-400/30">
                {currentQ.subject}
              </span>
            </div>

            {/* Question Text */}
            <div className="p-4 rounded-2xl bg-[#0B142A] border border-blue-500/30">
              <h3 className="text-base font-bold text-white leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((opt, i) => {
                const isAnswered = answers[currentIndex] !== undefined;
                const isSelected = selectedOpt === i || answers[currentIndex]?.opt === i;
                const isCorrectOpt = i === currentQ.correctIndex;

                let optClass = 'bg-[#0F1A34] border-slate-700 text-slate-200 hover:border-blue-400';
                if (isAnswered) {
                  if (isCorrectOpt) {
                    optClass = 'bg-emerald-950/70 border-emerald-400 text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrectOpt) {
                    optClass = 'bg-rose-950/70 border-rose-500 text-rose-200';
                  } else {
                    optClass = 'bg-[#0A1224]/50 border-slate-800 text-slate-500';
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(i)}
                    className={`w-full p-3 rounded-xl text-left text-xs sm:text-sm font-semibold border transition-all flex items-center justify-between ${optClass}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {isAnswered && isSelected && !isCorrectOpt && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {answers[currentIndex] !== undefined && (
              <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-500/40 text-xs text-blue-200 animate-in fade-in duration-200 flex items-start gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-cyan-300">Why: </span>
                  <span>{currentQ.explanation}</span>
                </div>
              </div>
            )}

            {/* Next button */}
            <div className="pt-2 flex justify-end">
              <button
                disabled={answers[currentIndex] === undefined}
                onClick={handleNext}
                className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  answers[currentIndex] !== undefined
                    ? 'btn-3d-primary text-white cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <span>{currentIndex < DAILY_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Results Screen */
          <div className="text-center py-5 space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-[0_12px_30px_rgba(245,158,11,0.5)] border-2 border-yellow-200">
              <Trophy className="w-10 h-10 text-slate-950" />
            </div>

            <div>
              <h3 className="font-['Outfit'] text-2xl font-black text-white">
                Daily Quiz Complete!
              </h3>
              <p className="text-xs text-cyan-300 font-semibold mt-1">
                You scored {correctScore} / {DAILY_QUESTIONS.length}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-black text-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>+{correctScore * 50} XP Added to Streak</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
              <button
                onClick={() => { sound.playClick(); onClose(); }}
                className="flex-1 py-2.5 rounded-xl btn-3d-emerald text-xs font-bold text-white cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
