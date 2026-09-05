import React, { useState, useEffect } from 'react';
import { SafetyTopic, SafetySession, Participant, ActionItem } from './types';
import { 
  loadSavedTopics, 
  saveCustomTopic, 
  deleteCustomTopic, 
  loadSavedSessions, 
  saveSession, 
  deleteSession, 
  loadSavedTeam, 
  saveTeamMembers 
} from './utils/storage';

import { Header, AppView } from './components/Header';
import { TopicLibrary } from './components/TopicLibrary';
import { TopicDetailModal } from './components/TopicDetailModal';
import { LiveAnimationView } from './components/LiveAnimationView';
import { AttendanceSheetModal } from './components/AttendanceSheetModal';
import { AiTopicGenerator } from './components/AiTopicGenerator';
import { RexAnalyzer } from './components/RexAnalyzer';
import { HistoryDashboard } from './components/HistoryDashboard';
import { HostToolbox } from './components/HostToolbox';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // State
  const [topics, setTopics] = useState<SafetyTopic[]>(() => loadSavedTopics());
  const [sessions, setSessions] = useState<SafetySession[]>(() => loadSavedSessions());
  const [teamMembers, setTeamMembers] = useState<Participant[]>(() => loadSavedTeam());

  // Navigation
  const [currentView, setCurrentView] = useState<AppView>('library');

  // Modals & Active Session State
  const [selectedTopicForModal, setSelectedTopicForModal] = useState<SafetyTopic | null>(null);
  const [activeLiveTopic, setActiveLiveTopic] = useState<SafetyTopic | null>(null);
  const [activeAttendanceSession, setActiveAttendanceSession] = useState<Partial<SafetySession> | null>(null);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Start live session
  const handleStartLive = (topic: SafetyTopic) => {
    setActiveLiveTopic(topic);
    setCurrentView('live');
    setSelectedTopicForModal(null);
    showToast(`Session lancée : ${topic.title}`, 'info');
  };

  // Finish live session -> Open Attendance Sheet
  const handleFinishLiveSession = (sessionData: Partial<SafetySession>) => {
    setActiveAttendanceSession(sessionData);
  };

  // Save full session from Attendance Sheet
  const handleSaveFinalSession = (session: SafetySession) => {
    saveSession(session);
    setSessions(loadSavedSessions());
    setActiveAttendanceSession(null);
    setActiveLiveTopic(null);
    setCurrentView('history');
    showToast('Feuille d\'émargement et compte-rendu enregistrés avec succès !', 'success');

    // Also update saved team members if new names were added
    if (session.participants && session.participants.length > 0) {
      const updatedTeam = [...teamMembers];
      session.participants.forEach((p) => {
        if (!updatedTeam.some((t) => t.name.toLowerCase() === p.name.toLowerCase())) {
          updatedTeam.push({
            id: p.id,
            name: p.name,
            role: p.role,
            company: p.company
          });
        }
      });
      saveTeamMembers(updatedTeam);
      setTeamMembers(updatedTeam);
    }
  };

  // Save custom topic (from AI Generator or REX)
  const handleSaveTopic = (newTopic: SafetyTopic) => {
    saveCustomTopic(newTopic);
    setTopics(loadSavedTopics());
    showToast(`Fiche "${newTopic.title}" enregistrée dans la bibliothèque !`, 'success');
  };

  // Delete custom topic
  const handleDeleteTopic = (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cette fiche personnalisée ?')) {
      deleteCustomTopic(id);
      setTopics(loadSavedTopics());
      showToast('Fiche supprimée.', 'info');
    }
  };

  // Delete past session
  const handleDeleteSession = (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cet émargement de l\'historique ?')) {
      deleteSession(id);
      setSessions(loadSavedSessions());
      showToast('Séance supprimée de l\'historique.', 'info');
    }
  };

  // View existing session sheet from history
  const handleViewSessionSheet = (session: SafetySession) => {
    setActiveAttendanceSession(session);
  };

  // Update action item status
  const handleUpdateActionStatus = (sessionId: string, actionId: string, status: ActionItem['status']) => {
    const updated = sessions.map((s) => {
      if (s.id === sessionId) {
        return {
          ...s,
          actionItems: s.actionItems?.map((a) => (a.id === actionId ? { ...a, status } : a))
        };
      }
      return s;
    });
    setSessions(updated);
    localStorage.setItem('quart_heure_securite_sessions_v1', JSON.stringify(updated));
    showToast('Statut de l\'action mis à jour.', 'info');
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Global Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        isSessionActive={!!activeLiveTopic}
        activeTopicTitle={activeLiveTopic?.title}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-zinc-700 flex items-center gap-3 animate-fadeIn no-print">
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-bold">{toastMessage.text}</span>
          </div>
        )}

        {/* View Routing */}
        {currentView === 'library' && (
          <TopicLibrary
            topics={topics}
            onSelectTopic={setSelectedTopicForModal}
            onStartLive={handleStartLive}
            onDeleteTopic={handleDeleteTopic}
            onNavigateToGenerator={() => setCurrentView('generator')}
            onNavigateToRex={() => setCurrentView('rex')}
          />
        )}

        {currentView === 'live' && activeLiveTopic && (
          <LiveAnimationView
            topic={activeLiveTopic}
            onFinishSession={handleFinishLiveSession}
            onCancel={() => {
              if (confirm('Quitter l\'animation en cours ?')) {
                setActiveLiveTopic(null);
                setCurrentView('library');
              }
            }}
            savedTeamMembers={teamMembers}
          />
        )}

        {currentView === 'generator' && (
          <AiTopicGenerator
            onSaveTopic={handleSaveTopic}
            onStartLive={handleStartLive}
          />
        )}

        {currentView === 'rex' && (
          <RexAnalyzer
            onSaveTopic={handleSaveTopic}
            onStartLive={handleStartLive}
          />
        )}

        {currentView === 'history' && (
          <HistoryDashboard
            sessions={sessions}
            onDeleteSession={handleDeleteSession}
            onViewSessionSheet={handleViewSessionSheet}
            onUpdateActionStatus={handleUpdateActionStatus}
          />
        )}

        {currentView === 'toolbox' && (
          <HostToolbox />
        )}

      </main>

      {/* Topic Detail Modal */}
      {selectedTopicForModal && (
        <TopicDetailModal
          topic={selectedTopicForModal}
          onClose={() => setSelectedTopicForModal(null)}
          onStartLive={handleStartLive}
        />
      )}

      {/* Attendance Sheet & Report Modal */}
      {activeAttendanceSession && (
        <AttendanceSheetModal
          initialSession={activeAttendanceSession}
          onSave={handleSaveFinalSession}
          onClose={() => setActiveAttendanceSession(null)}
          savedTeamMembers={teamMembers}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-zinc-800 text-zinc-400 py-6 px-4 text-center text-xs no-print mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="font-black text-white">Quart d'Heure Sécurité HSE</span>
            <span className="font-medium text-zinc-400">• Conforme démarche prévention & MASE</span>
          </div>
          <p className="text-zinc-400 font-medium">
            Animation 15 min chrono • Émargement numérique • Analyse REX IA
          </p>
        </div>
      </footer>

    </div>
  );
}
