import { SafetySession, SafetyTopic, ActionItem, Participant } from '../types';
import { DEFAULT_SAFETY_TOPICS } from '../data/defaultTopics';

const TOPICS_STORAGE_KEY = 'qhs_safety_topics_v1';
const SESSIONS_STORAGE_KEY = 'qhs_safety_sessions_v1';
const DEFAULT_TEAM_KEY = 'qhs_default_team_v1';

export function getStoredTopics(): SafetyTopic[] {
  try {
    const raw = localStorage.getItem(TOPICS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(TOPICS_STORAGE_KEY, JSON.stringify(DEFAULT_SAFETY_TOPICS));
      return DEFAULT_SAFETY_TOPICS;
    }
    const customList: SafetyTopic[] = JSON.parse(raw);
    // Combine defaults with custom
    const existingIds = new Set(customList.map(t => t.id));
    const merged = [...customList];
    for (const def of DEFAULT_SAFETY_TOPICS) {
      if (!existingIds.has(def.id)) {
        merged.push(def);
      }
    }
    return merged;
  } catch (e) {
    return DEFAULT_SAFETY_TOPICS;
  }
}

export function saveCustomTopic(topic: SafetyTopic) {
  const current = getStoredTopics();
  const existingIdx = current.findIndex(t => t.id === topic.id);
  if (existingIdx >= 0) {
    current[existingIdx] = topic;
  } else {
    current.unshift(topic);
  }
  localStorage.setItem(TOPICS_STORAGE_KEY, JSON.stringify(current));
  return current;
}

export function deleteCustomTopic(topicId: string) {
  const current = getStoredTopics();
  const filtered = current.filter(t => t.id !== topicId);
  localStorage.setItem(TOPICS_STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
}

// Initial sample sessions so history isn't blank
const INITIAL_SESSIONS: SafetySession[] = [
  {
    id: 'sess_prev_1',
    topicId: 'hauteur_01',
    topicTitle: 'Travaux en Hauteur : Zéro compromis avec la chute',
    category: 'Hauteur',
    date: '2026-08-28',
    time: '07:30',
    siteLocation: 'Chantier Rénovation Bâtiment C - Gare Sud',
    hostName: 'Thomas Martin (Chef de Chantier)',
    company: 'Eiffage Construction / Sous-traitants',
    durationActualSeconds: 890,
    status: 'completed',
    completedPhases: [1, 2, 3, 4],
    quizScore: { correct: 3, total: 3 },
    notes: 'Bonne participation de l\'équipe gros œuvre. Deux ouvriers ont signalé un problème de point d\'ancrage sur la façade Nord qui a été immédiatement balisé.',
    teamCommitments: [
      'Contrôle visuel systématique de la fiche d\'inspection de l\'échafaudage avant de monter',
      'Port du harnais obligatoire dès le montage de la banche'
    ],
    participants: [
      { id: 'p1', name: 'Karim Benali', role: 'Coffreur-bancheur', company: 'Titulaire', present: true, signedAt: '2026-08-28 07:44' },
      { id: 'p2', name: 'Alexandre Dupont', role: 'Ferrailleur', company: 'Titulaire', present: true, signedAt: '2026-08-28 07:44' },
      { id: 'p3', name: 'Lucas Mercier', role: 'Manoeuvre intérim', company: 'Adecco', present: true, signedAt: '2026-08-28 07:45' },
      { id: 'p4', name: 'Driss Mansouri', role: 'Maçon', company: 'Titulaire', present: true, signedAt: '2026-08-28 07:45' }
    ],
    actionItems: [
      {
        id: 'act_1',
        description: 'Remplacer le panneau vert de conformité manquant sur l\'échafaudage Nord',
        assignee: 'Thomas Martin',
        deadline: '2026-08-29',
        priority: 'haute',
        status: 'cloturee'
      },
      {
        id: 'act_2',
        description: 'Commander 2 longes avec absorbeur supplémentaires pour les intérimaires',
        assignee: 'Service Matériel HSE',
        deadline: '2026-09-05',
        priority: 'moyenne',
        status: 'en_cours'
      }
    ]
  },
  {
    id: 'sess_prev_2',
    topicId: 'tms_03',
    topicTitle: 'Gestes & Postures : Préserver son dos et ses articulations',
    category: 'TMS',
    date: '2026-08-21',
    time: '08:00',
    siteLocation: 'Entrepôt Logistique Zone 4',
    hostName: 'Sophie Leroux (Responsable HSE)',
    company: 'LogiTrans Solutions',
    durationActualSeconds: 940,
    status: 'completed',
    completedPhases: [1, 2, 3, 4],
    quizScore: { correct: 2, total: 2 },
    notes: 'Séance d\'échauffement très appréciée. Les préparateurs de commande ont demandé un réajustement de la hauteur des palettes réceptrices.',
    teamCommitments: [
      'Plier les genoux à chaque prise de colis inférieur à 50 cm du sol',
      'Faire 2 minutes d\'échauffement articulaire au démarrage'
    ],
    participants: [
      { id: 'p5', name: 'Mamadou Diop', role: 'Préparateur de commandes', company: 'LogiTrans', present: true, signedAt: '2026-08-21 08:14' },
      { id: 'p6', name: 'Céline Giraud', role: 'Cariste', company: 'LogiTrans', present: true, signedAt: '2026-08-21 08:15' },
      { id: 'p7', name: 'Julien Blanc', role: 'Agent de quai', company: 'Randstad', present: true, signedAt: '2026-08-21 08:15' }
    ],
    actionItems: [
      {
        id: 'act_3',
        description: 'Installer des tables élévatrices de quai sur les postes 3 et 4',
        assignee: 'Maintenance / Travaux',
        deadline: '2026-09-15',
        priority: 'moyenne',
        status: 'en_cours'
      }
    ]
  }
];

export function getStoredSessions(): SafetySession[] {
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(INITIAL_SESSIONS));
      return INITIAL_SESSIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_SESSIONS;
  }
}

export function saveSafetySession(session: SafetySession): SafetySession[] {
  const current = getStoredSessions();
  const existingIdx = current.findIndex(s => s.id === session.id);
  if (existingIdx >= 0) {
    current[existingIdx] = session;
  } else {
    current.unshift(session);
  }
  localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(current));
  return current;
}

export function deleteSafetySession(sessionId: string): SafetySession[] {
  const current = getStoredSessions();
  const filtered = current.filter(s => s.id !== sessionId);
  localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
}

export function updateActionItemStatus(sessionId: string, actionId: string, newStatus: ActionItem['status']): SafetySession[] {
  const sessions = getStoredSessions();
  const session = sessions.find(s => s.id === sessionId);
  if (session) {
    const act = session.actionItems.find(a => a.id === actionId);
    if (act) {
      act.status = newStatus;
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    }
  }
  return sessions;
}

// Default team members helper
export const DEFAULT_PRESET_MEMBERS: Participant[] = [
  { id: 'tm_1', name: 'Karim Benali', role: 'Compagnon / Opérateur', company: 'Entreprise', present: true },
  { id: 'tm_2', name: 'Alexandre Dupont', role: 'Technicien / Chef d\'équipe', company: 'Entreprise', present: true },
  { id: 'tm_3', name: 'Lucas Mercier', role: 'Opérateur Intérimaire', company: 'Adecco', present: true },
  { id: 'tm_4', name: 'Driss Mansouri', role: 'Artisan / Équipier', company: 'Entreprise', present: true },
  { id: 'tm_5', name: 'Mamadou Diop', role: 'Opérateur', company: 'Entreprise', present: true },
  { id: 'tm_6', name: 'Céline Giraud', role: 'Conductrice d\'engins', company: 'Entreprise', present: true }
];

export function getStoredDefaultTeam(): Participant[] {
  try {
    const raw = localStorage.getItem(DEFAULT_TEAM_KEY);
    if (!raw) {
      localStorage.setItem(DEFAULT_TEAM_KEY, JSON.stringify(DEFAULT_PRESET_MEMBERS));
      return DEFAULT_PRESET_MEMBERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_PRESET_MEMBERS;
  }
}

export function saveStoredDefaultTeam(members: Participant[]) {
  localStorage.setItem(DEFAULT_TEAM_KEY, JSON.stringify(members));
}

// Aliases
export const loadSavedTopics = getStoredTopics;
export const loadSavedSessions = getStoredSessions;
export const saveSession = saveSafetySession;
export const deleteSession = deleteSafetySession;
export const loadSavedTeam = getStoredDefaultTeam;
export const saveTeamMembers = saveStoredDefaultTeam;
