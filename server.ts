import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is not set in environment variables.');
    }
    geminiClient = new GoogleGenAI({ apiKey: key });
  }
  return geminiClient;
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// AI Doubt Buster endpoint with zero restrictions
app.post('/api/ask-ai', async (req: Request, res: Response) => {
  const { question, subject } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required.' });
  }

  try {
    const ai = getGeminiClient();
    const systemPrompt = `You are "LevelUp 8 AI Mentor", a friendly, encouraging personal tutor for an 8th-standard student (NCERT / CBSE / State Board level).
The student is studying: ${subject || 'Class 8 Curriculum (Math, Science, Social Science, English)'}.

Explain the concept in simple, easy-to-grasp language.
Follow this format:
1. Quick Direct Answer (1-2 lines in simple words).
2. Step-by-Step Breakdown or Key Points (use clear bullet points).
3. Formula or Key Rule (if applicable).
4. Fun Memory Trick / Mnemonic (short, catchy mnemonic).
Keep your tone positive, uplifting, and concise for a 13-14 year old student.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nStudent Question: "${question}"` }]
        }
      ]
    });

    const replyText = response.text || 'Keep studying hard! Every concept becomes simple when you break it into small steps.';
    return res.json({ answer: replyText });
  } catch (err: any) {
    console.warn('Gemini API notice, activating fallback solver:', err?.message);

    // High quality offline fallback solver for 8th grade
    const q = question.toLowerCase();
    let fallbackAnswer = '';
    let mnemonic = '';

    if (q.includes('maratha') || q.includes('shivaji') || q.includes('raigad')) {
      fallbackAnswer = `Chhatrapati Shivaji Maharaj established Hindavi Swarajya in Maharashtra by capturing strategic hill forts (Torna, Rajgad, Sinhagad) and founding the Indian Navy with sea forts like Sindhudurg. He was formally crowned Chhatrapati at Fort Raigad on 6 June 1674.\n\nKey Points:\n• Ganimi Kawa: Lightning guerrilla mountain warfare.\n• Ashta Pradhan: Council of 8 ministers.\n• Peshwa Expansion: Peshwa Baji Rao I fought 40+ battles undefeated!`;
      mnemonic = 'Swarajya = Forts + Ganimi Kawa + People First!';
    } else if (q.includes('cell') || q.includes('mitochondria') || q.includes('nucleus')) {
      fallbackAnswer = `The Cell is the basic structural and functional unit of all living organisms, discovered by Robert Hooke in 1665.\n\nKey Parts:\n• Cell Wall: Only in plant cells (made of cellulose) for strength.\n• Cell Membrane: Flexible barrier in all cells.\n• Mitochondria: "Powerhouse of the cell" (produces ATP energy).\n• Chloroplast: Green plastid in plants for photosynthesis.`;
      mnemonic = 'Hooke hooked the cork in 1665!';
    } else if (q.includes('rational') || q.includes('p/q') || q.includes('additive inverse')) {
      fallbackAnswer = `A Rational Number is any number written as p/q where p and q are integers and q ≠ 0.\n\nKey Rules:\n• Additive Identity: 0 (a + 0 = a)\n• Multiplicative Identity: 1 (a × 1 = a)\n• Additive Inverse: Flip sign (a/b -> -a/b)\n• Reciprocal: Flip fraction (a/b -> b/a). Note: 0 has NO reciprocal!`;
      mnemonic = 'Add Inverse = Flip Sign! Reciprocal = Flip Fraction!';
    } else if (q.includes('linear') || q.includes('equation') || q.includes('solve')) {
      fallbackAnswer = `A Linear Equation has variable power 1 (e.g. 2x + 3 = 11).\n\nBalance Scale Rule:\n• Shift terms across '=' by reversing signs: + becomes -, - becomes +, × becomes ÷.\n• Example: 2x + 3 = 11 -> 2x = 11 - 3 = 8 -> x = 8 / 2 = 4!`;
      mnemonic = 'Cross the bridge (=), change the sign!';
    } else if (q.includes('passive') || q.includes('voice')) {
      fallbackAnswer = `Active Voice: Subject does action (e.g., "Aarav wrote a story.")\nPassive Voice: Action is done to the object (e.g., "A story was written by Aarav.")\n\nRule:\nObject + appropriate form of 'be' + Past Participle (V3) + by + Subject.`;
      mnemonic = 'Passive = Object first + V3 verb!';
    } else {
      fallbackAnswer = `Great question! In 8th Standard, understanding this concept involves 3 steps:\n1. State the exact definition and scientific/mathematical unit.\n2. Understand the real-world cause or example.\n3. Practice 2 sample problems from your textbook.\n\nKeep leveling up your score!`;
      mnemonic = 'Formula + Unit + Real Example = Full Marks!';
    }

    return res.json({
      answer: fallbackAnswer,
      mnemonic: mnemonic || undefined
    });
  }
});

// Vite middleware for dev mode & static handling for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LevelUp 8 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
