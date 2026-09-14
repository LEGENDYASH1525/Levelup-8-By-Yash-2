import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Lightbulb, 
  Zap, 
  Target, 
  Trophy, 
  BookOpen, 
  RotateCcw,
  Check
} from 'lucide-react';
import { Lesson } from '../types';
import { sound } from '../utils/audio';

interface ThreeStepLessonModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  onLessonComplete: (lessonId: string, earnedXp: number, scorePercent: number) => void;
  initialStep?: 1 | 2 | 3;
}

export const ThreeStepLessonModal: React.FC<ThreeStepLessonModalProps> = ({
  lesson,
  isOpen,
  onClose,
  onLessonComplete,
  initialStep = 1
}) => {
  if (!isOpen || !lesson) return null;

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(initialStep);

  // Step 1 state
  const [slideIndex, setSlideIndex] = useState(0);

  // Step 2 Matcher state
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [balancerSelected, setBalancerSelected] = useState<string | null>(null);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  // Step 3 Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answeredState, setAnsweredState] = useState<{ [qIdx: number]: { chosen: number; isCorrect: boolean } }>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const slides = lesson.step1_concept.slides;
  const currentSlide = slides[slideIndex] || slides[0];

  const handleStepChange = (step: 1 | 2 | 3) => {
    sound.playStepChime();
    setCurrentStep(step);
  };

  // Step 2 Matcher click handler
  const handleLeftClick = (id: string) => {
    sound.playClick();
    setSelectedLeft(id);
  };

  const handleRightClick = (id: string) => {
    if (!selectedLeft) return;
    if (selectedLeft === id) {
      // Match!
      sound.playCorrect();
      const updated = [...matchedPairs, id];
      setMatchedPairs(updated);
      setSelectedLeft(null);
      if (lesson.step2_practice.pairs && updated.length === lesson.step2_practice.pairs.length) {
        setPracticeCompleted(true);
      }
    } else {
      sound.playWrong();
      setSelectedLeft(null);
    }
  };

  // Step 2 Balancer option click
  const handleBalancerOption = (opt: string) => {
    sound.playClick();
    setBalancerSelected(opt);
    if (opt === lesson.step2_practice.balancerData?.correctOption) {
      sound.playCorrect();
      setPracticeCompleted(true);
    } else {
      sound.playWrong();
    }
  };

  // Step 3 Quiz answer click
  const handleSelectQuizOption = (optionIndex: number) => {
    if (answeredState[quizIndex] !== undefined) return; // already answered
    const currentQ = lesson.step3_quiz[quizIndex];
    const isCorrect = optionIndex === currentQ.correctIndex;

    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }

    setAnsweredState({
      ...answeredState,
      [quizIndex]: { chosen: optionIndex, isCorrect }
    });
    setSelectedOption(optionIndex);
  };

  const handleNextQuiz = () => {
    sound.playClick();
    if (quizIndex < lesson.step3_quiz.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedOption(null);
    } else {
      // Finish Quiz
      setQuizFinished(true);
      sound.playTriumph();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Calculate score
      let correctCount = 0;
      (Object.values(answeredState) as Array<{ chosen: number; isCorrect: boolean }>).forEach((ans) => {
        if (ans.isCorrect) correctCount++;
      });
      const scorePercent = Math.round((correctCount / lesson.step3_quiz.length) * 100);
      onLessonComplete(lesson.id, lesson.xpReward, scorePercent);
    }
  };

  const resetQuiz = () => {
    sound.playClick();
    setQuizIndex(0);
    setSelectedOption(null);
    setAnsweredState({});
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[92vh] flex flex-col card-3d-dark rounded-2xl border border-blue-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 bg-[#0A1226] border-b border-blue-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-lg font-bold bg-blue-600/30 text-cyan-300 border border-cyan-400/30">
              {lesson.subject} • Ch {lesson.chapterNumber}
            </span>
            <h2 className="text-sm md:text-base font-bold text-white truncate max-w-[280px] sm:max-w-md">
              {lesson.title}
            </h2>
          </div>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Step Navigation Tabs */}
        <div className="grid grid-cols-3 bg-[#080E1E] border-b border-blue-500/20 px-4 py-2 gap-2 text-xs font-bold">
          <button
            onClick={() => handleStepChange(1)}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              currentStep === 1
                ? 'bg-blue-600/40 text-cyan-300 border border-cyan-400/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Step 1:</span>
            <span>Concept</span>
          </button>

          <button
            onClick={() => handleStepChange(2)}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              currentStep === 2
                ? 'bg-blue-600/40 text-cyan-300 border border-cyan-400/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Step 2:</span>
            <span>Practice</span>
            {practiceCompleted && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <button
            onClick={() => handleStepChange(3)}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              currentStep === 3
                ? 'bg-blue-600/40 text-cyan-300 border border-cyan-400/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline">Step 3:</span>
            <span>Boss Quiz</span>
            {quizFinished && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* ================= STEP 1: CONCEPT FLASHCARDS ================= */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Flashcard {slideIndex + 1} of {slides.length}
                </span>
                <div className="flex items-center gap-1">
                  {slides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === slideIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Flashcard Body */}
              <div className="p-6 rounded-2xl bg-[#0F1B36] border border-blue-500/30 shadow-inner space-y-4">
                <div>
                  <h3 className="text-xl font-black text-white font-['Outfit']">
                    {currentSlide.title}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-300 mt-0.5">
                    {currentSlide.subtitle}
                  </p>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed">
                  {currentSlide.content}
                </p>

                {/* Formula / Rule Display Box */}
                {currentSlide.formulaOrRule && (
                  <div className="p-4 rounded-xl bg-[#091124] border border-cyan-500/40 font-mono text-center text-sm sm:text-base font-bold text-cyan-300 shadow-md">
                    {currentSlide.formulaOrRule}
                  </div>
                )}

                {/* Highlight fact */}
                {currentSlide.highlightFact && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                    <span className="text-base">💡</span>
                    <span className="leading-relaxed">{currentSlide.highlightFact}</span>
                  </div>
                )}

                {/* Bullet Points */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    High-Yield Exam Takeaways:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentSlide.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mnemonic Pill */}
                {currentSlide.mnemonic && (
                  <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 text-xs flex items-center gap-2">
                    <span className="font-extrabold text-indigo-400">🧠 Mnemonic:</span>
                    <span>{currentSlide.mnemonic}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= STEP 2: INTERACTIVE PRACTICE ================= */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>{lesson.step2_practice.prompt}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {lesson.step2_practice.instruction}
                </p>
              </div>

              {/* Matcher Practice UI */}
              {lesson.step2_practice.type === 'matcher' && lesson.step2_practice.pairs && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Left column */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Tap Term:
                      </span>
                      {lesson.step2_practice.pairs.map((pair) => {
                        const isMatched = matchedPairs.includes(pair.id);
                        const isSelected = selectedLeft === pair.id;
                        return (
                          <button
                            key={`left-${pair.id}`}
                            disabled={isMatched}
                            onClick={() => handleLeftClick(pair.id)}
                            className={`w-full p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                              isMatched
                                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 line-through opacity-70'
                                : isSelected
                                ? 'bg-blue-600 border-cyan-300 text-white shadow-[0_0_12px_rgba(56,189,248,0.5)] scale-[1.02]'
                                : 'bg-[#0F1B36] border-slate-700 text-slate-200 hover:border-blue-400'
                            }`}
                          >
                            {pair.left}
                            {isMatched && <Check className="w-3.5 h-3.5 inline ml-2 text-emerald-400" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right column */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Tap Matching Meaning:
                      </span>
                      {lesson.step2_practice.pairs.map((pair) => {
                        const isMatched = matchedPairs.includes(pair.id);
                        return (
                          <button
                            key={`right-${pair.id}`}
                            disabled={isMatched}
                            onClick={() => handleRightClick(pair.id)}
                            className={`w-full p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                              isMatched
                                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 opacity-70'
                                : 'bg-[#0F1B36] border-slate-700 text-slate-200 hover:border-cyan-400'
                            }`}
                          >
                            {pair.right}
                            {isMatched && <Check className="w-3.5 h-3.5 inline ml-2 text-emerald-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {practiceCompleted && (
                    <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs animate-in fade-in duration-300">
                      <div className="font-bold mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Practice Complete!</span>
                      </div>
                      <p>{lesson.step2_practice.explanation}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Balancer / Equation Solver Practice UI */}
              {lesson.step2_practice.type === 'balancer' && lesson.step2_practice.balancerData && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-[#0D1833] border border-blue-500/30 text-center">
                    <div className="font-mono text-2xl font-black text-cyan-300 tracking-wider mb-2">
                      {lesson.step2_practice.balancerData.leftTerm} = {lesson.step2_practice.balancerData.rightTerm}
                    </div>
                    <p className="text-xs text-amber-300 font-semibold">
                      💡 Hint: {lesson.step2_practice.balancerData.hint}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {lesson.step2_practice.balancerData.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleBalancerOption(opt)}
                        className={`p-3.5 rounded-xl font-bold text-sm border transition-all ${
                          balancerSelected === opt
                            ? opt === lesson.step2_practice.balancerData?.correctOption
                              ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                              : 'bg-rose-600 text-white border-rose-400'
                            : 'bg-[#0F1B36] border-slate-700 text-slate-200 hover:border-cyan-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {practiceCompleted && (
                    <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs animate-in fade-in duration-300">
                      <div className="font-bold mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Solved Correctly!</span>
                      </div>
                      <p>{lesson.step2_practice.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 3: BOSS QUIZ ================= */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {!quizFinished ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Question {quizIndex + 1} of {lesson.step3_quiz.length}
                    </span>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>+50 XP per correct</span>
                    </span>
                  </div>

                  {/* Question Card */}
                  <div className="p-5 rounded-2xl bg-[#0F1B36] border border-blue-500/30 space-y-3">
                    <h3 className="text-base font-bold text-white leading-snug">
                      {lesson.step3_quiz[quizIndex].question}
                    </h3>

                    {lesson.step3_quiz[quizIndex].codeOrFormula && (
                      <div className="p-2.5 rounded-lg bg-[#080E1E] font-mono text-cyan-300 text-xs border border-blue-500/20">
                        {lesson.step3_quiz[quizIndex].codeOrFormula}
                      </div>
                    )}

                    {/* Options */}
                    <div className="space-y-2 pt-2">
                      {lesson.step3_quiz[quizIndex].options.map((opt, optIdx) => {
                        const isSelected = selectedOption === optIdx || answeredState[quizIndex]?.chosen === optIdx;
                        const isAnswered = answeredState[quizIndex] !== undefined;
                        const isCorrectOption = optIdx === lesson.step3_quiz[quizIndex].correctIndex;

                        let style = 'bg-[#0A1226] border-slate-700 text-slate-200 hover:border-blue-400';
                        if (isAnswered) {
                          if (isCorrectOption) {
                            style = 'bg-emerald-950/60 border-emerald-400 text-emerald-200 font-bold';
                          } else if (isSelected && !isCorrectOption) {
                            style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                          } else {
                            style = 'bg-[#0A1226]/50 border-slate-800 text-slate-500';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleSelectQuizOption(optIdx)}
                            className={`w-full p-3 rounded-xl text-xs sm:text-sm text-left font-medium transition-all border flex items-center justify-between ${style}`}
                          >
                            <span>{opt}</span>
                            {isAnswered && isCorrectOption && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                            {isAnswered && isSelected && !isCorrectOption && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation Box when answered */}
                    {answeredState[quizIndex] !== undefined && (
                      <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-xs text-blue-200 animate-in fade-in duration-200">
                        <span className="font-bold text-cyan-300">Explanation: </span>
                        <span>{lesson.step3_quiz[quizIndex].explanation}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Quiz Victory Screen */
                <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-[0_10px_25px_rgba(245,158,11,0.5)] border-2 border-yellow-200">
                    <Trophy className="w-10 h-10 text-slate-950" />
                  </div>
                  <div>
                    <h3 className="font-['Outfit'] text-2xl font-black text-white">
                      Lesson Mastered!
                    </h3>
                    <p className="text-xs text-cyan-300 font-semibold mt-1">
                      You completed all 3 Steps of {lesson.title}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-sm">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>+{lesson.xpReward} XP Added to Leaderboard</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={resetQuiz}
                      className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Retake Boss Quiz</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Controls */}
        <div className="px-5 py-3.5 bg-[#0A1226] border-t border-blue-500/30 flex items-center justify-between">
          <div>
            {currentStep > 1 && !quizFinished && (
              <button
                onClick={() => handleStepChange((currentStep - 1) as 1 | 2)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Step 1 Slide Controls */}
            {currentStep === 1 && (
              <>
                {slideIndex < slides.length - 1 ? (
                  <button
                    onClick={() => { sound.playClick(); setSlideIndex(slideIndex + 1); }}
                    className="px-4 py-2 rounded-xl btn-3d-primary text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next Card</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleStepChange(2)}
                    className="px-5 py-2.5 rounded-xl btn-3d-emerald text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Step 2: Practice</span>
                    <Zap className="w-3.5 h-3.5" />
                  </button>
                )}
              </>
            )}

            {/* Step 2 Practice Controls */}
            {currentStep === 2 && (
              <button
                onClick={() => handleStepChange(3)}
                className="px-5 py-2.5 rounded-xl btn-3d-primary text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
              >
                <span>Proceed to Step 3: Boss Quiz</span>
                <Target className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Step 3 Quiz Controls */}
            {currentStep === 3 && (
              <>
                {!quizFinished ? (
                  <button
                    disabled={answeredState[quizIndex] === undefined}
                    onClick={handleNextQuiz}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all ${
                      answeredState[quizIndex] !== undefined
                        ? 'btn-3d-primary cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    <span>
                      {quizIndex < lesson.step3_quiz.length - 1 ? 'Next Question' : 'Complete Lesson!'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => { sound.playClick(); onClose(); }}
                    className="px-6 py-2.5 rounded-xl btn-3d-emerald text-xs font-bold text-white cursor-pointer"
                  >
                    Done & Collect Rewards
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
