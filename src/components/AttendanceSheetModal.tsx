import React, { useState } from 'react';
import { SafetySession, Participant, ActionItem } from '../types';
import { 
  X, 
  Printer, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle, 
  PenTool, 
  Building, 
  Calendar, 
  Clock, 
  UserCheck, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  Award
} from 'lucide-react';
import { SignaturePad } from './SignaturePad';

interface AttendanceSheetModalProps {
  initialSession: Partial<SafetySession>;
  onSave: (session: SafetySession) => void;
  onClose: () => void;
  savedTeamMembers: Participant[];
}

export const AttendanceSheetModal: React.FC<AttendanceSheetModalProps> = ({
  initialSession,
  onSave,
  onClose,
  savedTeamMembers
}) => {
  // Session details state
  const [siteLocation, setSiteLocation] = useState(initialSession.siteLocation || 'Chantier Principal - Zone A');
  const [hostName, setHostName] = useState(initialSession.hostName || 'Chef de Chantier / Animateur HSE');
  const [company, setCompany] = useState(initialSession.company || 'Entreprise Générale & Sous-traitants');
  const [sessionDate, setSessionDate] = useState(initialSession.date || new Date().toISOString().split('T')[0]);
  const [sessionTime, setSessionTime] = useState(initialSession.time || new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
  const [notes, setNotes] = useState(initialSession.notes || '');

  // Participants
  const [participants, setParticipants] = useState<Participant[]>(
    initialSession.participants && initialSession.participants.length > 0
      ? initialSession.participants
      : savedTeamMembers.map((m) => ({ ...m, present: true }))
  );

  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCompany, setNewCompany] = useState('');

  // Active signer modal
  const [activeSignerId, setActiveSignerId] = useState<string | null>(null);

  // Commitments & Action items
  const [commitments, setCommitments] = useState<string[]>(initialSession.teamCommitments || []);
  const [actionItems, setActionItems] = useState<ActionItem[]>(initialSession.actionItems || []);

  const [newActDesc, setNewActDesc] = useState('');
  const [newActAssignee, setNewActAssignee] = useState('');
  const [newActDeadline, setNewActDeadline] = useState('');

  // Add participant
  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const p: Participant = {
      id: 'part_' + Date.now(),
      name: newName.trim(),
      role: newRole.trim() || 'Opérateur',
      company: newCompany.trim() || company,
      present: true
    };
    setParticipants([...participants, p]);
    setNewName('');
    setNewRole('');
    setNewCompany('');
  };

  const handleTogglePresent = (id: string) => {
    setParticipants(
      participants.map((p) => (p.id === id ? { ...p, present: !p.present } : p))
    );
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const handleSaveSignature = (dataUrl: string) => {
    if (!activeSignerId) return;
    setParticipants(
      participants.map((p) =>
        p.id === activeSignerId
          ? {
              ...p,
              signature: dataUrl,
              signedAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
              present: true
            }
          : p
      )
    );
    setActiveSignerId(null);
  };

  // Add action item
  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActDesc.trim()) return;
    const act: ActionItem = {
      id: 'act_' + Date.now(),
      description: newActDesc.trim(),
      assignee: newActAssignee.trim() || 'Non assigné',
      deadline: newActDeadline || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      priority: 'haute',
      status: 'a_faire'
    };
    setActionItems([...actionItems, act]);
    setNewActDesc('');
    setNewActAssignee('');
    setNewActDeadline('');
  };

  const handleRemoveAction = (id: string) => {
    setActionItems(actionItems.filter((a) => a.id !== id));
  };

  const handleFinalSave = () => {
    const fullSession: SafetySession = {
      id: initialSession.id || 'sess_' + Date.now(),
      topicId: initialSession.topicId || 'custom',
      topicTitle: initialSession.topicTitle || 'Quart d\'Heure Sécurité',
      category: initialSession.category || 'Général',
      date: sessionDate,
      time: sessionTime,
      siteLocation,
      hostName,
      company,
      participants,
      notes,
      actionItems,
      teamCommitments: commitments,
      completedPhases: initialSession.completedPhases || [1, 2, 3, 4],
      durationActualSeconds: initialSession.durationActualSeconds || 900,
      status: 'completed',
      quizScore: initialSession.quizScore
    };
    onSave(fullSession);
  };

  const activeSigner = participants.find((p) => p.id === activeSignerId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6">
      
      {/* Signature Pad Popup */}
      {activeSignerId && activeSigner && (
        <div className="fixed inset-0 z-60 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-scaleUp">
          <SignaturePad
            signerName={activeSigner.name}
            onSave={handleSaveSignature}
            onCancel={() => setActiveSignerId(null)}
          />
        </div>
      )}

      {/* Main Sheet Container with Bento Styling */}
      <div className="bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full max-h-[94vh] flex flex-col overflow-hidden border border-zinc-200 animate-scaleUp">
        
        {/* Top bar */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/90 no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 font-display tracking-tight">
                Feuille d'Émargement & Compte-Rendu Officiel
              </h2>
              <p className="text-xs text-slate-500 font-medium">Conforme audits sécurité, CSE, ISO 45001 & MASE</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-zinc-200 hover:bg-zinc-300 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimer / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-zinc-200 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheet Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 bg-white">
          
          {/* Printable Header Bento Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-md">
                  REGISTRE HYGIÈNE & SÉCURITÉ
                </span>
                <h1 className="text-lg sm:text-xl font-black text-slate-900 mt-1 font-display">
                  {initialSession.topicTitle || 'Quart d\'Heure Sécurité'}
                </h1>
              </div>
              <div className="text-left sm:text-right text-xs text-slate-600 font-semibold space-y-0.5">
                <div>Catégorie : <strong className="text-slate-900">{initialSession.category}</strong></div>
                <div>Durée : <strong className="text-slate-900">{Math.round((initialSession.durationActualSeconds || 900) / 60)} min</strong></div>
              </div>
            </div>

            {/* Metadata inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date</label>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl border border-zinc-300 font-bold bg-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Heure</label>
                <input
                  type="time"
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl border border-zinc-300 font-bold bg-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Lieu / Chantier</label>
                <input
                  type="text"
                  value={siteLocation}
                  onChange={(e) => setSiteLocation(e.target.value)}
                  placeholder="Ex: Chantier Gare Sud"
                  className="w-full mt-1 p-2 rounded-xl border border-zinc-300 font-bold bg-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Animateur / Réf. HSE</label>
                <input
                  type="text"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  placeholder="Nom de l'animateur"
                  className="w-full mt-1 p-2 rounded-xl border border-zinc-300 font-bold bg-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Section 1: Signatures Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-600" />
                Liste d'émargement des participants ({participants.filter((p) => p.present).length} présents)
              </h3>
            </div>

            <div className="border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-zinc-100 text-slate-700 font-bold border-b border-zinc-200">
                  <tr>
                    <th className="p-3">Présent</th>
                    <th className="p-3">Nom & Prénom</th>
                    <th className="p-3">Fonction / Rôle</th>
                    <th className="p-3">Entreprise / Intérim</th>
                    <th className="p-3 text-center">Signature Numérique</th>
                    <th className="p-3 text-right no-print">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {participants.map((p) => (
                    <tr key={p.id} className={p.present ? 'bg-white' : 'bg-zinc-50 opacity-60'}>
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={p.present}
                          onChange={() => handleTogglePresent(p.id)}
                          className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                        />
                      </td>
                      <td className="p-3 font-bold text-slate-900">{p.name}</td>
                      <td className="p-3 text-slate-600 font-medium">{p.role}</td>
                      <td className="p-3 text-slate-600 font-medium">{p.company || 'Titulaire'}</td>
                      <td className="p-3 text-center">
                        {p.signature ? (
                          <div className="flex flex-col items-center">
                            <img src={p.signature} alt="Signature" className="h-9 max-w-[100px] object-contain" />
                            <span className="text-[9px] text-slate-400 font-mono font-semibold">Signé à {p.signedAt}</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setActiveSignerId(p.id)}
                            className="px-3 py-1.5 text-[11px] font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center gap-1.5 mx-auto no-print transition-colors shadow-sm"
                          >
                            <PenTool className="w-3.5 h-3.5" />
                            Signer
                          </button>
                        )}
                      </td>
                      <td className="p-3 text-right no-print">
                        <button
                          type="button"
                          onClick={() => handleRemoveParticipant(p.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Add Participant */}
            <form onSubmit={handleAddParticipant} className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1 no-print">
              <input
                type="text"
                placeholder="Nom du participant"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="sm:col-span-4 p-2.5 text-xs rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:border-amber-400 font-medium"
              />
              <input
                type="text"
                placeholder="Poste (ex: Électricien)"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="sm:col-span-4 p-2.5 text-xs rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:border-amber-400 font-medium"
              />
              <input
                type="text"
                placeholder="Entreprise"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                className="sm:col-span-3 p-2.5 text-xs rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:border-amber-400 font-medium"
              />
              <button
                type="submit"
                className="sm:col-span-1 p-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center transition-colors"
                title="Ajouter à la liste"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Section 2: Adopted Commitments in Bento Box */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Engagements pris par l'équipe en séance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {commitments.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Action Items Table in Bento Box */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              Plan d'Actions Correctives & Remontées Terrain
            </h3>

            {actionItems.length > 0 ? (
              <div className="border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-100 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3">Action à mener</th>
                      <th className="p-3">Responsable</th>
                      <th className="p-3">Délai</th>
                      <th className="p-3">Priorité</th>
                      <th className="p-3 text-right no-print">Suppr.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {actionItems.map((act) => (
                      <tr key={act.id}>
                        <td className="p-3 font-bold text-slate-900">{act.description}</td>
                        <td className="p-3 text-slate-600 font-medium">{act.assignee}</td>
                        <td className="p-3 text-slate-600 font-medium">{act.deadline}</td>
                        <td className="p-3">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-orange-100 text-orange-800">
                            {act.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 text-right no-print">
                          <button
                            type="button"
                            onClick={() => handleRemoveAction(act.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Aucune anomalie ou action corrective requise lors de cette séance.</p>
            )}

            {/* Quick add action */}
            <form onSubmit={handleAddAction} className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1 no-print">
              <input
                type="text"
                placeholder="Nouvelle action corrective (ex: Baliser la zone B)"
                value={newActDesc}
                onChange={(e) => setNewActDesc(e.target.value)}
                className="sm:col-span-6 p-2.5 text-xs rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:border-amber-400 font-medium"
              />
              <input
                type="text"
                placeholder="Responsable"
                value={newActAssignee}
                onChange={(e) => setNewActAssignee(e.target.value)}
                className="sm:col-span-3 p-2.5 text-xs rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:border-amber-400 font-medium"
              />
              <input
                type="date"
                value={newActDeadline}
                onChange={(e) => setNewActDeadline(e.target.value)}
                className="sm:col-span-2 p-2.5 text-xs rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white focus:outline-none focus:border-amber-400 font-medium"
              />
              <button
                type="submit"
                className="sm:col-span-1 p-2.5 bg-slate-900 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center hover:bg-slate-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Section 4: Host Notes in Bento Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              Observations & Remarques de l'animateur
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes diverses sur le déroulement de la causerie..."
              className="w-full p-3 rounded-xl border border-zinc-300 text-xs text-slate-800 bg-zinc-50 focus:bg-white focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>

          {/* Host Signoff Box */}
          <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs text-slate-600">
            <div>
              <span>Visa Animateur HSE : </span>
              <strong className="text-slate-900">{hostName}</strong>
            </div>
            <div>
              <span>Fait à {siteLocation}, le {sessionDate}</span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-5 sm:p-6 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between gap-3 no-print">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-zinc-200 rounded-xl transition-colors"
          >
            Fermer sans enregistrer
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-zinc-200 hover:bg-zinc-300 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Imprimer PDF
            </button>

            <button
              type="button"
              onClick={handleFinalSave}
              className="px-6 py-3 text-xs sm:text-sm font-black text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-2xl shadow-sm flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              Valider & Enregistrer la session
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
