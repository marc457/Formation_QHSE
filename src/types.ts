export interface SafetyPhase {
  number: number;
  title: string;
  durationMinutes: number;
  leaderNotes: string;
  keyPoints: string[];
}

export interface DosAndDonts {
  dos: string[];
  donts: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DilemmaScenario {
  scenario: string;
  question: string;
  goodReaction: string;
}

export interface SafetyTopic {
  id: string;
  title: string;
  category: 'Hauteur' | 'EPI' | 'TMS' | 'Chimique' | 'Engins' | 'Électricité' | 'Routier' | 'Climat' | 'Plain-Pied' | 'Comportement' | 'Confiné' | 'Incendie' | 'Autre';
  sector: string;
  summary: string;
  keyStat: string;
  goldenRule: string;
  phases: SafetyPhase[];
  dosAndDonts: DosAndDonts;
  icebreakerQuestions: string[];
  dilemmaScenario: DilemmaScenario;
  quiz: QuizQuestion[];
  recommendedCommitments: string[];
  isCustom?: boolean;
  createdAt?: string;
  level?: 'Essentiel' | 'Intermédiaire' | 'Spécifique';
}

export interface Participant {
  id: string;
  name: string;
  role: string;
  company?: string;
  present: boolean;
  signature?: string; // base64 data url
  signedAt?: string;
}

export interface ActionItem {
  id: string;
  description: string;
  assignee: string;
  deadline: string;
  priority: 'haute' | 'moyenne' | 'basse';
  status: 'a_faire' | 'en_cours' | 'cloturee';
}

export interface SafetySession {
  id: string;
  topicId: string;
  topicTitle: string;
  category: string;
  date: string;
  time: string;
  siteLocation: string;
  hostName: string;
  company: string;
  participants: Participant[];
  notes: string;
  actionItems: ActionItem[];
  teamCommitments: string[];
  completedPhases: number[];
  durationActualSeconds: number;
  status: 'completed' | 'draft' | 'in_progress';
  quizScore?: {
    correct: number;
    total: number;
  };
}

export interface RexAnalysis {
  title: string;
  hazardCategory: string;
  immediateCauses: string[];
  underlyingFactors: string[];
  talkIntro: string;
  discussionQuestions: string[];
  preventiveActions: string[];
  teamCommitment: string;
}
