import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Google Gen AI helper
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API: Generate a custom Safety Talk topic (Fiche Quart d'Heure Sécurité)
app.post('/api/generate-topic', async (req, res) => {
  try {
    const { sector, trade, context, recentIncident, duration = 15 } = req.body;
    const ai = getAIClient();

    const prompt = `Tu es un expert HSE (Hygiène, Sécurité, Environnement) et préventeur d'entreprise spécialisé dans l'animation participative des Quarts d'Heure Sécurité (toolbox talks / causeries sécurité).
Génère une fiche complète d'animation de Quart d'Heure Sécurité (durée exacte : ${duration} minutes) en français.

Paramètres de la demande :
- Secteur : ${sector || 'Généraliste / BTP / Industrie'}
- Métier / Poste : ${trade || 'Tous opérateurs et techniciens'}
- Contexte / Objectif : ${context || 'Sensibilisation aux risques majeurs et réflexes quotidiens'}
${recentIncident ? `- Événement récent ou REX à intégrer : ${recentIncident}` : ''}

La fiche doit être très structurée, concrète, dynamique et interactive pour stimuler la prise de parole des équipiers (éviter le monologue descendant).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction: "Tu es un référent sécurité et préventeur chevronné. Tu rédiges des causeries de terrain ultra-concrètes, percutantes, sans jargon inutile, orientées comportement et engagement collectif.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING, description: "Titre percutant du quart d'heure sécurité" },
            category: { type: Type.STRING, description: "Catégorie (ex: Travaux en hauteur, EPI, TMS, Risque chimique, Électricité, etc.)" },
            sector: { type: Type.STRING, description: "Secteur d'activité ciblé" },
            summary: { type: Type.STRING, description: "Résumé en 2 phrases de l'enjeu" },
            keyStat: { type: Type.STRING, description: "Chiffre choc ou statistique marquante INRS/CARSAT pour l'accroche" },
            goldenRule: { type: Type.STRING, description: "La règle d'or incontournable à retenir (slogan court)" },
            phases: {
              type: Type.ARRAY,
              description: "Découpage chronologique précis de l'animation de 15 minutes",
              items: {
                type: Type.OBJECT,
                properties: {
                  number: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  durationMinutes: { type: Type.INTEGER },
                  leaderNotes: { type: Type.STRING, description: "Guide pour l'animateur (ce qu'il doit dire/faire)" },
                  keyPoints: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Points clés à projeter / aborder"
                  }
                },
                required: ["number", "title", "durationMinutes", "leaderNotes", "keyPoints"]
              }
            },
            dosAndDonts: {
              type: Type.OBJECT,
              properties: {
                dos: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Bonnes pratiques : À FAIRE absolument"
                },
                donts: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Comportements dangereux : À PROSCRIRE"
                }
              },
              required: ["dos", "donts"]
            },
            icebreakerQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 à 3 questions ouvertes pour faire réagir l'équipe dès le début"
            },
            dilemmaScenario: {
              type: Type.OBJECT,
              description: "Un cas pratique réel ou dilemme à soumettre au débat de l'équipe",
              properties: {
                scenario: { type: Type.STRING, description: "Description d'une situation de terrain tendue (ex: pression timing vs sécurité)" },
                question: { type: Type.STRING, description: "Question posée à l'équipe" },
                goodReaction: { type: Type.STRING, description: "La bonne réaction attendue" }
              },
              required: ["scenario", "question", "goodReaction"]
            },
            quiz: {
              type: Type.ARRAY,
              description: "3 questions quiz interactives (Vrai/Faux ou QCM) avec explication",
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING }
                },
                required: ["question", "options", "correctIndex", "explanation"]
              }
            },
            recommendedCommitments: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exemples d'engagements concrets que l'équipe peut adopter en fin de séance"
            }
          },
          required: [
            "title", "category", "sector", "summary", "keyStat", 
            "goldenRule", "phases", "dosAndDonts", "icebreakerQuestions", 
            "dilemmaScenario", "quiz", "recommendedCommitments"
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    if (!parsed.id) {
      parsed.id = 'custom_' + Date.now();
    }
    res.json({ success: true, topic: parsed });
  } catch (error: any) {
    console.error('Error generating safety topic:', error);
    res.status(500).json({ success: false, error: error.message || 'Erreur lors de la génération IA' });
  }
});

// API: Analyze near-miss / incident to extract a 15-min safety debrief
app.post('/api/analyze-rex', async (req, res) => {
  try {
    const { incidentDescription, location, trade } = req.body;
    const ai = getAIClient();

    const prompt = `Un presque-accident / incident s'est produit :
Description : "${incidentDescription}"
Lieu / Chantier : "${location || 'Site opérationnel'}"
Métier concerné : "${trade || 'Opérateurs'}"

Analyse cet événement et transforme-le immédiatement en un plan de causerie sécurité flash (Retour d'Expérience - REX) de 15 minutes pour éviter que cela ne se reproduise.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction: "Tu es un expert en analyse d'arbres des causes et en prévention HSE. Adopte une approche non culpabilisante, constructive et focalisée sur les facteurs organisationnels, humains et techniques.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            hazardCategory: { type: Type.STRING },
            immediateCauses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Causes directes identifiées"
            },
            underlyingFactors: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Facteurs sous-jacents (pression temporelle, matériel, formation, etc.)"
            },
            talkIntro: { type: Type.STRING, description: "Comment introduire le sujet à l'équipe avec tact et clarté" },
            discussionQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Questions pour faire réfléchir l'équipe"
            },
            preventiveActions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Actions immédiates et durables à mettre en place"
            },
            teamCommitment: { type: Type.STRING, description: "Engagement clé à faire signer à l'équipe" }
          },
          required: [
            "title", "hazardCategory", "immediateCauses", 
            "underlyingFactors", "talkIntro", "discussionQuestions", 
            "preventiveActions", "teamCommitment"
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ success: true, analysis: parsed });
  } catch (error: any) {
    console.error('Error analyzing REX:', error);
    res.status(500).json({ success: false, error: error.message || "Erreur d'analyse REX" });
  }
});

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
