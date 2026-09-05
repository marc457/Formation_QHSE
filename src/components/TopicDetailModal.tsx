import React from 'react';
import { SafetyTopic } from '../types';
import { 
  X, 
  Play, 
  Printer, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  AlertOctagon, 
  Building, 
  ShieldCheck, 
  Sparkles,
  MessageSquare,
  FileCheck2
} from 'lucide-react';
import { getCategoryColor } from './TopicCard';

interface TopicDetailModalProps {
  topic: SafetyTopic | null;
  onClose: () => void;
  onStartLive: (topic: SafetyTopic) => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  onClose,
  onStartLive
}) => {
  if (!topic) return null;

  const colors = getCategoryColor(topic.category);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      
      {/* Modal Card with Bento styling */}
      <div className="bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-zinc-200 animate-scaleUp">
        
        {/* Header bar */}
        <div className="p-6 sm:p-7 border-b border-zinc-100 flex items-start justify-between gap-4 bg-zinc-50/80">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}>
                {topic.category}
              </span>
              <span className="px-3 py-1 text-xs font-bold rounded-lg bg-zinc-200 text-slate-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                15 minutes chrono
              </span>
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-zinc-200">
                <Building className="w-3.5 h-3.5" />
                {topic.sector}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
              {topic.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={handlePrint}
              className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-zinc-200 rounded-xl transition-colors"
              title="Imprimer cette fiche d'animation"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-zinc-200 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
          
          {/* Key Stat & Golden Rule in Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-amber-400/15 border border-amber-400/40">
              <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Règle d'or absolue
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-950 leading-snug">
                « {topic.goldenRule} »
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-100 border border-zinc-200">
              <span className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-2">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                Chiffre choc / Enjeu
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                {topic.keyStat}
              </p>
            </div>
          </div>

          {/* 4 Timing Phases in Bento Grid */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Déroulé minute par minute (15 min)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {topic.phases.map((phase) => (
                <div 
                  key={phase.number} 
                  className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 hover:bg-white hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-zinc-200">
                    <span className="text-xs font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      Phase {phase.number} • {phase.durationMinutes} min
                    </span>
                    <span className="text-xs font-bold text-slate-900">{phase.title}</span>
                  </div>
                  
                  <p className="text-xs text-slate-600 italic mb-2.5">
                    💡 <span className="font-bold text-slate-800">Conseil animateur :</span> {phase.leaderNotes}
                  </p>

                  <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
                    {phase.keyPoints.map((pt, i) => (
                      <li key={i} className="leading-snug">{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Dos & Don'ts Bento layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DOs */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                À FAIRE (Bonnes pratiques)
              </h4>
              <ul className="space-y-2">
                {topic.dosAndDonts.dos.map((item, idx) => (
                  <li key={idx} className="text-xs text-emerald-950 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DONTs */}
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center gap-1.5 mb-3">
                <XCircle className="w-4 h-4 text-rose-600" />
                À ÉVITER (Comportements à risque)
              </h4>
              <ul className="space-y-2">
                {topic.dosAndDonts.donts.map((item, idx) => (
                  <li key={idx} className="text-xs text-rose-950 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Icebreaker & Dilemma */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Icebreaker Questions */}
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5 mb-2.5">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                Questions Brise-glace
              </h4>
              <ul className="space-y-1.5">
                {topic.icebreakerQuestions.map((q, idx) => (
                  <li key={idx} className="text-xs text-blue-950 italic font-medium">
                    « {q} »
                  </li>
                ))}
              </ul>
            </div>

            {/* Dilemma */}
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-purple-900 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Cas pratique / Débat terrain
              </h4>
              <p className="text-xs text-purple-950 mb-2">
                <span className="font-bold">Situation :</span> {topic.dilemmaScenario.scenario}
              </p>
              <p className="text-xs text-purple-900 font-bold mb-2">
                <span>Débat :</span> {topic.dilemmaScenario.question}
              </p>
              <div className="p-3 rounded-xl bg-white border border-purple-200 text-xs text-purple-950">
                <span className="font-bold text-purple-900">Réaction attendue :</span> {topic.dilemmaScenario.goodReaction}
              </div>
            </div>
          </div>

          {/* Quiz Preview */}
          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5 mb-3">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              Quiz Interactif ({topic.quiz.length} questions)
            </h4>
            <div className="space-y-3">
              {topic.quiz.map((q, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-zinc-200">
                  <p className="text-xs font-bold text-slate-900 mb-2">
                    {idx + 1}. {q.question}
                  </p>
                  <div className="space-y-1.5 pl-2 mb-2">
                    {q.options.map((opt, oIdx) => (
                      <div 
                        key={oIdx} 
                        className={`text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-2 ${
                          oIdx === q.correctIndex 
                            ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200' 
                            : 'text-slate-600'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-md border border-current text-[10px] flex items-center justify-center font-black">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                        {oIdx === q.correctIndex && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-600 italic bg-zinc-50 p-2 rounded-lg border border-zinc-200">
                    💡 {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended commitments */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-2">
              <FileCheck2 className="w-4 h-4 text-amber-600" />
              Engagements recommandés pour l'équipe
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {topic.recommendedCommitments.map((com, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950">
                  • {com}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-5 sm:p-6 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between gap-3 no-print">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-zinc-200 rounded-xl transition-colors"
          >
            Fermer
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onStartLive(topic);
            }}
            className="px-6 py-3 text-xs sm:text-sm font-black text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-2xl shadow-sm flex items-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            Lancer l'animation en direct (15 min)
          </button>
        </div>

      </div>
    </div>
  );
};
