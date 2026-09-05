import React, { useState } from 'react';
import { SafetyTopic } from '../types';
import { 
  Sparkles, 
  Loader2, 
  Check, 
  Play, 
  Save, 
  Building2, 
  Wrench, 
  AlertTriangle, 
  Clock, 
  RefreshCw, 
  Layers, 
  HelpCircle,
  FileCheck,
  ShieldAlert
} from 'lucide-react';
import { TopicCard } from './TopicCard';

interface AiTopicGeneratorProps {
  onSaveTopic: (topic: SafetyTopic) => void;
  onStartLive: (topic: SafetyTopic) => void;
}

const PRESET_SECTORS = [
  'BTP & Construction Gros Œuvre',
  'Second Œuvre (Élec, Plomberie, Peinture)',
  'Industrie & Usines de Production',
  'Logistique, Quai & Entrepôts',
  'Énergie, Réseaux & Télécoms',
  'Métallurgie, Chaudronnerie & Soudage',
  'Travaux Publics & VRD',
  'Agroalimentaire & Conditionnement',
  'Espaces Verts & Paysagisme',
  'Transport Routier & Livraisons',
  'Tertiaire, Bureaux & Télétravail'
];

const PRESET_TOPIC_IDEAS = [
  { label: '🔥 Risque Incendie & Permis de Feu', sector: 'Métallurgie, Chaudronnerie & Soudage', context: 'Travaux de découpe à la meuleuse et soudure à l\'arc' },
  { label: '❄️ Grand Froid, Verglas & Chutes', sector: 'BTP & Construction Gros Œuvre', context: 'Conditions hivernales et gel des accès extérieurs' },
  { label: '⚡ Risque d\'écrasement sur machine', sector: 'Industrie & Usines de Production', context: 'Intervention de débourrage sans arrêt d\'urgence préalable' },
  { label: '📦 Chute de colis en hauteur', sector: 'Logistique, Quai & Entrepôts', context: 'Mauvais calage des palettes en rack à 8 mètres' },
  { label: '🔌 Intervention à proximité de câbles enterrés', sector: 'Travaux Publics & VRD', context: 'Terrassement à la pelle sans DICT / repérage préalable' }
];

export const AiTopicGenerator: React.FC<AiTopicGeneratorProps> = ({
  onSaveTopic,
  onStartLive
}) => {
  const [sector, setSector] = useState(PRESET_SECTORS[0]);
  const [trade, setTrade] = useState('');
  const [context, setContext] = useState('');
  const [recentIncident, setRecentIncident] = useState('');
  const [duration, setDuration] = useState<number>(15);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedTopic, setGeneratedTopic] = useState<SafetyTopic | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleApplyPreset = (preset: typeof PRESET_TOPIC_IDEAS[0]) => {
    setSector(preset.sector);
    setContext(preset.context);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSaved(false);

    try {
      const res = await fetch('/api/generate-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sector,
          trade: trade || 'Opérateurs de terrain',
          context: context || 'Sensibilisation aux risques critiques et réflexes quotidiens',
          recentIncident,
          duration
        })
      });

      const data = await res.json();
      if (!data.success || !data.topic) {
        throw new Error(data.error || 'Erreur inconnue lors de la génération IA');
      }

      const newTopic: SafetyTopic = {
        ...data.topic,
        id: 'ai_' + Date.now(),
        isCustom: true,
        createdAt: new Date().toISOString()
      };

      setGeneratedTopic(newTopic);
    } catch (err: any) {
      console.error('Generation failed:', err);
      setError(err.message || 'Impossible de générer la fiche. Vérifiez votre clé API.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!generatedTopic) return;
    onSaveTopic(generatedTopic);
    setIsSaved(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Intro Bento Header */}
      <div className="bg-slate-900 text-white rounded-[2rem] p-7 sm:p-9 border border-zinc-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-400 text-slate-950 font-black">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              Générateur IA de Quarts d'Heure Sécurité
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Créez une Causerie Sécurité sur-mesure en 5 secondes
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Propulsé par Gemini : adaptez votre animation de 15 minutes à votre métier exact, à la météo du jour ou à un incident récent survenu sur votre site.
          </p>
        </div>

        {/* Quick presets pills */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-zinc-800 space-y-2 shrink-0 md:max-w-xs">
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 block">
            ⚡ Idées de thèmes rapides :
          </span>
          <div className="space-y-1.5">
            {PRESET_TOPIC_IDEAS.slice(0, 3).map((idea, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(idea)}
                className="w-full text-left text-xs text-slate-300 hover:text-amber-300 hover:bg-slate-800/80 p-2 rounded-xl truncate transition-colors font-medium"
              >
                {idea.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generation Form Bento Card */}
      <div className="bg-white rounded-[2rem] p-7 sm:p-8 border border-zinc-200 shadow-sm">
        <form onSubmit={handleGenerate} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Sector */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-600" />
                Secteur d'activité
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-zinc-300 bg-zinc-50 font-semibold focus:bg-white focus:outline-none focus:border-amber-400"
              >
                {PRESET_SECTORS.map((sec, i) => (
                  <option key={i} value={sec}>{sec}</option>
                ))}
              </select>
            </div>

            {/* Trade / Métier */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-amber-600" />
                Métier / Poste concerné (Optionnel)
              </label>
              <input
                type="text"
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                placeholder="Ex: Couvreurs, Caristes, Soudeurs, Électriciens..."
                className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-zinc-300 bg-zinc-50 font-semibold focus:bg-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Context / Goal */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-600" />
                Thématique spécifique ou Problématique terrain
              </label>
              <input
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Ex: Refus de porter le harnais sur tâche courte, Rangement des allées, Travaux par canicule..."
                className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-zinc-300 bg-zinc-50 font-semibold focus:bg-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Recent Incident / REX */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                Événement ou Presque-Accident récent à intégrer (Optionnel)
              </label>
              <textarea
                rows={2}
                value={recentIncident}
                onChange={(e) => setRecentIncident(e.target.value)}
                placeholder="Ex: Hier, une palette a glissé des fourches lors du déchargement sans faire de blessé. On veut en faire un retour d'expérience."
                className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-zinc-300 bg-zinc-50 font-semibold focus:bg-white focus:outline-none focus:border-amber-400"
              />
            </div>

          </div>

          {/* Error display */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-sm rounded-2xl shadow-md flex items-center gap-2.5 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Génération de la fiche en cours...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Générer le Quart d'Heure Sécurité (15 min)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Generated Result Preview */}
      {generatedTopic && (
        <div className="space-y-5 pt-2 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-lg font-black text-slate-900 font-display">
                Fiche Sécurité Générée avec Succès !
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaved}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                  isSaved
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {isSaved ? 'Enregistrée dans la bibliothèque' : 'Sauvegarder la fiche'}
              </button>

              <button
                type="button"
                onClick={() => onStartLive(generatedTopic)}
                className="px-5 py-2.5 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                Lancer l'animation en direct
              </button>
            </div>
          </div>

          {/* Full preview card */}
          <div className="bg-white rounded-[2rem] p-7 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-100">
              <div className="space-y-1.5">
                <span className="px-3 py-1 text-xs font-bold rounded-lg bg-amber-100 text-amber-900 border border-amber-300">
                  {generatedTopic.category} • 15 minutes chrono
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight pt-1">
                  {generatedTopic.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  {generatedTopic.sector}
                </p>
              </div>
            </div>

            {/* Golden rule & Stat in Bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-amber-400/15 border border-amber-400/40">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wider block mb-1.5">
                  🛡️ Règle d'or absolue
                </span>
                <p className="text-sm font-bold text-slate-950">
                  « {generatedTopic.goldenRule} »
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-100 border border-zinc-200">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-1.5">
                  📊 Chiffre clé / Enjeu
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  {generatedTopic.keyStat}
                </p>
              </div>
            </div>

            {/* Phases breakdown in Bento Grid */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                Déroulé des 4 phases (15 min)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {generatedTopic.phases.map((ph) => (
                  <div key={ph.number} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs">
                    <div className="flex items-center justify-between font-bold text-amber-800 mb-1.5">
                      <span className="bg-amber-100 px-2 py-0.5 rounded font-black text-amber-900">Phase {ph.number} ({ph.durationMinutes} min)</span>
                      <span className="text-slate-900 font-bold">{ph.title}</span>
                    </div>
                    <p className="text-slate-600 italic mb-2">
                      💡 <span className="font-semibold text-slate-800">Conseil :</span> {ph.leaderNotes}
                    </p>
                    <ul className="space-y-1 text-slate-700 list-disc list-inside">
                      {ph.keyPoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Dos & Donts in Bento layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-900 block">
                  ✅ À FAIRE (Bonnes pratiques)
                </span>
                <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
                  {generatedTopic.dosAndDonts.dos.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-rose-900 block">
                  ❌ À PROSCRIRE (Comportements à risque)
                </span>
                <ul className="space-y-1.5 text-xs text-rose-950 font-medium">
                  {generatedTopic.dosAndDonts.donts.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dilemma & Quiz */}
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-purple-900 block">
                ✨ Cas Pratique / Dilemme d'animation
              </span>
              <p className="text-xs text-purple-950">
                <strong className="text-purple-950 font-bold">Situation :</strong> {generatedTopic.dilemmaScenario.scenario}
              </p>
              <p className="text-xs font-bold text-purple-900">
                <span>Question :</span> {generatedTopic.dilemmaScenario.question}
              </p>
              <p className="text-xs text-purple-950 bg-white p-2.5 rounded-xl border border-purple-200 font-medium">
                <strong className="text-purple-900 font-bold">Réaction attendue :</strong> {generatedTopic.dilemmaScenario.goodReaction}
              </p>
            </div>

            {/* Quiz Preview */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 block flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                Quiz de validation ({generatedTopic.quiz.length} questions)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {generatedTopic.quiz.map((q, i) => (
                  <div key={i} className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs space-y-1">
                    <p className="font-bold text-slate-900">{i + 1}. {q.question}</p>
                    <p className="text-[11px] text-emerald-800 font-bold">
                      ✓ Réponse : {q.options[q.correctIndex]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
