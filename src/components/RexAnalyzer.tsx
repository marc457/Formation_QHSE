import React, { useState } from 'react';
import { SafetyTopic } from '../types';
import { 
  AlertTriangle, 
  Sparkles, 
  Loader2, 
  Play, 
  Save, 
  CheckCircle, 
  ShieldAlert, 
  Flame, 
  ArrowRight,
  RotateCcw,
  Target,
  FileText
} from 'lucide-react';

interface RexAnalyzerProps {
  onSaveTopic: (topic: SafetyTopic) => void;
  onStartLive: (topic: SafetyTopic) => void;
}

export const RexAnalyzer: React.FC<RexAnalyzerProps> = ({
  onSaveTopic,
  onStartLive
}) => {
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState<'presque_accident' | 'materiel' | 'leger' | 'situation_dangereuse'>('presque_accident');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rexResult, setRexResult] = useState<any | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsLoading(true);
    setError(null);
    setIsSaved(false);

    try {
      const res = await fetch('/api/analyze-incident', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidentTitle: title || 'Événement sur le site',
          severity,
          location: location || 'Zone de travail',
          description
        })
      });

      const data = await res.json();
      if (!data.success || !data.rex) {
        throw new Error(data.error || 'Erreur lors de l\'analyse REX');
      }

      setRexResult(data.rex);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Impossible d\'analyser l\'incident.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartTalk = () => {
    if (!rexResult?.safetyTopic) return;
    const topic: SafetyTopic = {
      ...rexResult.safetyTopic,
      id: 'rex_' + Date.now(),
      isCustom: true
    };
    onSaveTopic(topic);
    onStartLive(topic);
  };

  const handleSaveOnly = () => {
    if (!rexResult?.safetyTopic) return;
    const topic: SafetyTopic = {
      ...rexResult.safetyTopic,
      id: 'rex_' + Date.now(),
      isCustom: true
    };
    onSaveTopic(topic);
    setIsSaved(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header Bento Banner */}
      <div className="bg-slate-900 text-white rounded-[2rem] p-7 sm:p-9 border border-zinc-800 shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-amber-400 text-slate-950 font-black">
            <AlertTriangle className="w-5 h-5" />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-amber-400">
            Module REX & Presque-Accident Express
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
          Transformez un événement terrain en Causerie Positive & Pédagogique
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-medium">
          Un quasi-accident ou un dysfonctionnement matériel vient d'avoir lieu ? L'IA analyse les causes profondes (matériel, organisation, facteurs humains) et génère immédiatement une fiche d'animation bienveillante de 15 minutes pour sensibiliser l'équipe sans chercher de coupable.
        </p>
      </div>

      {/* Input Form Bento Card */}
      <div className="bg-white rounded-[2rem] p-7 sm:p-8 border border-zinc-200 shadow-sm">
        <form onSubmit={handleAnalyze} className="space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                Titre court de l'événement
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Chute d'un outil depuis l'échafaudage"
                className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-zinc-300 bg-zinc-50 font-semibold focus:bg-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Severity */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                Type de gravité
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-zinc-300 bg-zinc-50 font-semibold focus:bg-white focus:outline-none focus:border-amber-400"
              >
                <option value="presque_accident">Presque-accident / Événement sans dommage</option>
                <option value="situation_dangereuse">Situation dangereuse récurrente</option>
                <option value="materiel">Dégât matériel seul (machine, outil, véhicule)</option>
                <option value="leger">Accident bénin (soins de premiers secours)</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                Lieu / Poste de travail concerné
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Échafaudage Façade Sud - Zone de passage piétons"
                className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-zinc-300 bg-zinc-50 font-semibold focus:bg-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                Que s'est-il passé ? (Faits objectifs)
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Vers 14h, lors de la fixation d'un bardage, une visseuse a glissé de la plateforme à 6m de haut et a atterri sur le trottoir en contrebas. Heureusement, personne ne passait à ce moment-là. Pas de plinthe installée sur ce niveau et pas de longe pour l'outil."
                className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-zinc-300 bg-zinc-50 font-semibold focus:bg-white focus:outline-none focus:border-amber-400"
              />
            </div>

          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
              {error}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isLoading || !description.trim()}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-sm rounded-2xl shadow-md flex items-center gap-2.5 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyse des causes & Création de la causerie...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Générer l'Analyse REX & la Causerie Flash</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* REX Results in Bento Grid */}
      {rexResult && (
        <div className="space-y-5 pt-2 animate-fadeIn">
          
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 font-display flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              Résultats de l'Analyse REX
            </h2>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveOnly}
                disabled={isSaved}
                className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-zinc-200 hover:bg-zinc-300 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                {isSaved ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4" />}
                {isSaved ? 'Enregistré' : 'Sauvegarder la causerie'}
              </button>

              <button
                type="button"
                onClick={handleStartTalk}
                className="px-5 py-2.5 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                Animer ce REX en direct (15 min)
              </button>
            </div>
          </div>

          {/* Root Causes Analysis Cards in Bento layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Causes profondes */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white border border-zinc-800 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Causes profondes identifiées (Arbre des causes)
              </span>
              <ul className="space-y-2">
                {rexResult.rootCauses?.map((c: string, i: number) => (
                  <li key={i} className="text-xs text-slate-200 flex items-start gap-2.5 bg-slate-950/80 p-3 rounded-xl border border-slate-800 font-medium">
                    <span className="text-amber-400 font-black">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions correctives recommandées */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Actions correctives prioritaires pour le site
              </span>
              <ul className="space-y-2">
                {rexResult.correctiveActions?.map((act: string, i: number) => (
                  <li key={i} className="text-xs text-emerald-950 flex items-start gap-2.5 bg-white p-3 rounded-xl border border-emerald-200 shadow-sm font-semibold">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Positive key takeaway */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 flex items-center gap-3.5">
            <span className="text-2xl">💡</span>
            <div>
              <span className="text-xs font-black text-amber-900 uppercase tracking-wider block">
                Message clé non-culpabilisant pour l'équipe :
              </span>
              <p className="text-xs sm:text-sm font-bold text-amber-950 mt-0.5">
                {rexResult.keyTakeaway}
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
