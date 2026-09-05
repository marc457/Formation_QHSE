import React, { useState } from 'react';
import { SafetySession, ActionItem } from '../types';
import { 
  History, 
  Users, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Trash2, 
  Printer, 
  Download, 
  Search, 
  Filter, 
  AlertTriangle,
  Award,
  Building,
  Check,
  Calendar
} from 'lucide-react';
import { getCategoryColor } from './TopicCard';

interface HistoryDashboardProps {
  sessions: SafetySession[];
  onDeleteSession: (id: string) => void;
  onViewSessionSheet: (session: SafetySession) => void;
  onUpdateActionStatus: (sessionId: string, actionId: string, status: ActionItem['status']) => void;
}

export const HistoryDashboard: React.FC<HistoryDashboardProps> = ({
  sessions,
  onDeleteSession,
  onViewSessionSheet,
  onUpdateActionStatus
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'sessions' | 'actions'>('sessions');

  // Compute KPIs
  const totalSessions = sessions.length;
  const totalSensitized = sessions.reduce((acc, s) => acc + (s.participants?.filter((p) => p.present)?.length || 0), 0);
  const totalSignatures = sessions.reduce((acc, s) => acc + (s.participants?.filter((p) => p.signature)?.length || 0), 0);
  
  const allActionItems = sessions.flatMap((s) => 
    (s.actionItems || []).map((a) => ({ ...a, sessionId: s.id, sessionTopic: s.topicTitle, sessionDate: s.date }))
  );
  const openActionsCount = allActionItems.filter((a) => a.status !== 'cloturee').length;
  const closedActionsCount = allActionItems.filter((a) => a.status === 'cloturee').length;

  // Filter sessions
  const filteredSessions = sessions.filter((s) => {
    const matchesSearch = s.topicTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.siteLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.hostName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Export CSV
  const handleExportCsv = () => {
    if (sessions.length === 0) return;
    const headers = ['Date', 'Heure', 'Thématique', 'Catégorie', 'Lieu', 'Animateur', 'Présents', 'Signatures', 'Actions'];
    const rows = sessions.map((s) => [
      s.date,
      s.time,
      `"${s.topicTitle.replace(/"/g, '""')}"`,
      s.category,
      `"${s.siteLocation.replace(/"/g, '""')}"`,
      `"${s.hostName.replace(/"/g, '""')}"`,
      s.participants?.filter((p) => p.present)?.length || 0,
      s.participants?.filter((p) => p.signature)?.length || 0,
      s.actionItems?.length || 0
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `registre_quarts_d_heure_securite_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-7 animate-fadeIn">
      
      {/* Header & KPI Summary in Bento Grid */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-slate-900 text-amber-400 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md">
                REGISTRE HSE & CONFORMITÉ
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
              Suivi des Causeries & Émargements
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Historique des séances, signatures tactiles certifiées et suivi des plans d'actions.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            disabled={sessions.length === 0}
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-amber-300 text-xs font-black rounded-2xl flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-amber-400" />
            Exporter le registre (CSV)
          </button>
        </div>

        {/* Bento Stat Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-6 rounded-[1.75rem] bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Causeries Réalisées
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 font-display">{totalSessions}</span>
              <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md">15 min</span>
            </div>
          </div>

          <div className="p-6 rounded-[1.75rem] bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Opérateurs Sensibilisés
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-600 font-display">{totalSensitized}</span>
              <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">présents</span>
            </div>
          </div>

          <div className="p-6 rounded-[1.75rem] bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Signatures Électroniques
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-blue-600 font-display">{totalSignatures}</span>
              <span className="text-xs text-blue-800 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">tactiles</span>
            </div>
          </div>

          <div className="p-6 rounded-[1.75rem] bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Actions Correctives
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-orange-600 font-display">{openActionsCount}</span>
              <span className="text-xs text-slate-600 font-semibold">ouvertes ({closedActionsCount} closes)</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bento Tabs: Past Sessions vs Action Items */}
      <div className="flex items-center gap-2 bg-zinc-200/80 p-1.5 rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('sessions')}
          className={`py-2.5 px-4 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
            activeTab === 'sessions'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Séances & Feuilles d'émargement ({sessions.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('actions')}
          className={`py-2.5 px-4 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
            activeTab === 'actions'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-orange-400" />
          <span>Plan d'actions ({allActionItems.length})</span>
        </button>
      </div>

      {/* TAB 1: SESSIONS */}
      {activeTab === 'sessions' && (
        <div className="space-y-4">
          
          {/* Filters Bento Bar */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher par thème, lieu, animateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-zinc-200 bg-zinc-50 font-medium focus:bg-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs font-bold p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:border-amber-400 w-full sm:w-auto"
              >
                <option value="all">Toutes les catégories</option>
                <option value="Hauteur">Hauteur</option>
                <option value="EPI">EPI</option>
                <option value="TMS">TMS</option>
                <option value="Engins">Engins</option>
                <option value="Chimique">Chimique</option>
                <option value="Électricité">Électricité</option>
                <option value="Routier">Routier</option>
                <option value="Climat">Climat</option>
                <option value="Plain-Pied">Plain-Pied</option>
              </select>
            </div>
          </div>

          {/* Sessions List in Bento Cards */}
          {filteredSessions.length > 0 ? (
            <div className="space-y-3.5">
              {filteredSessions.map((session) => {
                const colors = getCategoryColor(session.category);
                const presentCount = session.participants?.filter((p) => p.present)?.length || 0;
                const signedCount = session.participants?.filter((p) => p.signature)?.length || 0;

                return (
                  <div
                    key={session.id}
                    className="bg-white rounded-[1.75rem] p-5 sm:p-6 border border-zinc-200 hover:border-slate-300 shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-md border ${colors.bg} ${colors.text} ${colors.border}`}>
                          {session.category}
                        </span>
                        <span className="text-xs text-slate-600 font-semibold flex items-center gap-1 bg-zinc-100 px-2 py-0.5 rounded">
                          <Calendar className="w-3.5 h-3.5" />
                          {session.date} à {session.time}
                        </span>
                        <span className="text-xs text-slate-600 font-semibold flex items-center gap-1 bg-zinc-100 px-2 py-0.5 rounded">
                          <Building className="w-3.5 h-3.5" />
                          {session.siteLocation}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug font-display">
                        {session.topicTitle}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span>Animateur : <strong className="text-slate-900">{session.hostName}</strong></span>
                        <span>•</span>
                        <span>Équipe : <strong className="text-slate-900">{presentCount} présents</strong> ({signedCount} signés)</span>
                        {session.quizScore && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-700 font-bold">
                              Quiz : {session.quizScore.correct}/{session.quizScore.total}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => onViewSessionSheet(session)}
                        className="px-4 py-2.5 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center gap-2 shadow-sm transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        Feuille d'émargement
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteSession(session.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Supprimer cette séance"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-[2rem] border border-dashed border-zinc-300 space-y-3">
              <History className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700">Aucune séance trouvée</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Lancez votre première animation depuis la bibliothèque ou générez-en une avec l'IA.
              </p>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: ACTIONS */}
      {activeTab === 'actions' && (
        <div className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden shadow-sm">
          {allActionItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-zinc-100 text-slate-700 font-bold border-b border-zinc-200">
                  <tr>
                    <th className="p-3.5">Statut</th>
                    <th className="p-3.5">Action corrective</th>
                    <th className="p-3.5">Responsable</th>
                    <th className="p-3.5">Échéance</th>
                    <th className="p-3.5">Causerie d'origine</th>
                    <th className="p-3.5">Priorité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {allActionItems.map((act) => {
                    const isClosed = act.status === 'cloturee';
                    const isInProgress = act.status === 'en_cours';

                    return (
                      <tr key={act.id} className={isClosed ? 'bg-zinc-50 opacity-60' : 'bg-white'}>
                        <td className="p-3.5">
                          <select
                            value={act.status}
                            onChange={(e) => onUpdateActionStatus(act.sessionId, act.id, e.target.value as any)}
                            className={`p-1.5 rounded-lg text-[11px] font-bold border ${
                              isClosed
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : isInProgress
                                ? 'bg-blue-100 text-blue-800 border-blue-300'
                                : 'bg-amber-100 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="a_faire">À faire</option>
                            <option value="en_cours">En cours</option>
                            <option value="cloturee">Clôturée ✓</option>
                          </select>
                        </td>
                        <td className="p-3.5 font-bold text-slate-900">{act.description}</td>
                        <td className="p-3.5 text-slate-600 font-medium">{act.assignee}</td>
                        <td className="p-3.5 text-slate-600 font-medium">{act.deadline}</td>
                        <td className="p-3.5 text-slate-500 max-w-[180px] truncate">{act.sessionTopic}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800">
                            {act.priority.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="text-sm font-bold text-slate-700">Aucune action corrective enregistrée</p>
              <p className="text-xs text-slate-400">Toutes les actions décidées en causerie apparaîtront ici.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
