import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { sound } from '../utils/audio';

interface AiMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  subject?: string;
  mnemonic?: string;
}

const SAMPLE_QUESTIONS = [
  'Why do plant cells have a cell wall but animal cells do not?',
  'How do I easily solve 3x + 5 = 20?',
  'Explain the coronation of Shivaji Maharaj at Raigad.',
  'What is the difference between contact and non-contact forces?',
  'How to convert "The chef cooked a meal" into passive voice?'
];

export const AiMentorModal: React.FC<AiMentorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hey champion! I am your LevelUp 8 Study Buddy powered by Gemini AI with zero restrictions. Ask me any doubt from your 8th Standard syllabus (Maths, Science, Social Science, or English) and I will break it down in simple steps with memory tricks!'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (queryText?: string) => {
    const text = (queryText || inputQuery).trim();
    if (!text) return;

    sound.playClick();
    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text })
      });

      if (!response.ok) {
        throw new Error('Failed response from AI server');
      }

      const data = await response.json();
      sound.playStepChime();

      const aiMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: data.answer || 'Keep practicing! Breaking questions down step-by-step is the secret to high marks.',
        mnemonic: data.mnemonic
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.warn('Network or AI service fallback:', err);
      sound.playStepChime();

      // Local fallback
      const lower = text.toLowerCase();
      let reply = '';
      let mnemonic = '';

      if (lower.includes('maratha') || lower.includes('shivaji') || lower.includes('raigad')) {
        reply = 'Chhatrapati Shivaji Maharaj was crowned at Fort Raigad on 6 June 1674, taking the title Chhatrapati. He pioneered Ganimi Kawa (lightning guerrilla tactics), established the Indian Navy with sea forts like Sindhudurg, and formed the Ashta Pradhan Mandal (council of 8 ministers).';
        mnemonic = 'Swarajya = Forts + Ganimi Kawa + People First!';
      } else if (lower.includes('cell wall') || lower.includes('plant')) {
        reply = 'Plant cells have a rigid outer Cell Wall made of cellulose to withstand extreme weather pressure (rain, wind, heat). Animal cells have flexible cell membranes so animals can move freely.';
        mnemonic = 'Plant = Stiff Cellulose Armor!';
      } else if (lower.includes('3x + 5') || lower.includes('equation')) {
        reply = 'Solving 3x + 5 = 20:\nStep 1: Transpose +5 to RHS -> 3x = 20 - 5 = 15.\nStep 2: Divide both sides by 3 -> x = 15 / 3 = 5!\nCheck: 3(5) + 5 = 15 + 5 = 20 (LHS = RHS)!';
        mnemonic = 'Cross the bridge (=), change the sign (+ becomes -)!';
      } else {
        reply = `Awesome question regarding "${text}"! In 8th Standard, connect the core definition to an everyday observation, write down formulas with proper units, and practice sample problems.`;
        mnemonic = 'Formula + Unit + Real Example = Full Marks!';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: reply,
          mnemonic: mnemonic || undefined
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl h-[85vh] card-3d-dark rounded-3xl border border-indigo-500/40 flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#0B142A] border-b border-indigo-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-['Outfit'] font-bold text-white text-base flex items-center gap-1.5">
                <span>Doubt Buster AI</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                  Gemini Flash 2.5
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Instant Class 8 explanations, formulas & mnemonics
              </p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Sample Query Chips */}
        <div className="p-3 bg-[#080E1E] border-b border-indigo-500/10 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-500 font-bold shrink-0">Try asking:</span>
          {SAMPLE_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-lg bg-[#111C38] hover:bg-[#1A2A54] border border-blue-500/20 text-slate-300 hover:text-cyan-300 shrink-0 transition-colors"
            >
              {q.length > 30 ? q.slice(0, 30) + '...' : q}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm shadow-md'
                    : 'bg-[#0D1833] border border-blue-500/25 text-slate-200 rounded-tl-sm'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
                {m.mnemonic && (
                  <div className="mt-2.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-1.5 font-semibold">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Mnemonic: {m.mnemonic}</span>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-blue-700/50 border border-blue-400/30 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-cyan-400 italic">
              <Bot className="w-4 h-4 animate-bounce" />
              <span>Thinking of the clearest Class 8 explanation...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#0B142A] border-t border-indigo-500/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything from Class 8 Math, Science, English..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#080E1E] border border-blue-500/40 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-xl btn-3d-primary text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
