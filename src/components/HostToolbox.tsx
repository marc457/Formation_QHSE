import React, { useState } from 'react';
import { 
  Wrench, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MessageSquare, 
  Users, 
  Award, 
  AlertTriangle, 
  Volume2, 
  Check, 
  Printer, 
  RefreshCw,
  Zap
} from 'lucide-react';
import { playPhaseChime } from '../utils/audio';

const ICEBREAKERS = [
  "Quel est le geste ou le réflexe de sécurité que vous faites systématiquement chaque matin sans même y penser ?",
  "Avez-vous déjà refusé une tâche ou arrêté un travail parce que les conditions de sécurité n'étaient pas réunies ?",
  "Sur le chantier aujourd'hui, quelle est la tâche qui vous demande la plus grande vigilance ?",
  "Si un nouvel arrivant ou un intérimaire commençait aujourd'hui avec nous, quel premier conseil de sécurité lui donneriez-vous ?",
  "Quel est le 'presque-accident' le plus bête ou le plus instructif que vous ayez vu dans votre carrière ?",
  "Y a-t-il un équipement ou un outil qui vous semble usé, mal adapté ou inconfortable en ce moment ?",
  "Quand le planning est serré et qu'il faut aller vite, quelle est la règle de sécurité qu'on a le plus tendance à négliger ?",
  "Si vous pouviez améliorer une seule chose sur notre base de vie ou nos accès de chantier, ce serait quoi ?"
];

const TEN_COMMANDMENTS = [
  {
    num: 1,
    title: "Respecter impérativement les 15 minutes",
    desc: "Un quart d'heure qui dure 40 minutes décourage l'équipe pour la fois suivante. Soyez concis et dynamique."
  },
  {
    num: 2,
    title: "80% d'écoute, 20% de parole",
    desc: "Ce n'est pas un cours magistral mais un échange. Posez des questions ouvertes et faites parler les opérateurs."
  },
  {
    num: 3,
    title: "Partir du réel et du concret",
    desc: "Parlez des machines, des zones et des tâches de votre chantier aujourd'hui, pas de théorie abstraite."
  },
  {
    num: 4,
    title: "Bannir la recherche de coupable",
    desc: "La sécurité positive valorise les alertes et les presque-accidents. Si on punit l'erreur, les gens cacheront les risques."
  },
  {
    num: 5,
    title: "Valoriser les bonnes pratiques observées",
    desc: "Commencez par féliciter un geste bien fait ou un port d'EPI exemplaire avant d'aborder les points d'amélioration."
  },
  {
    num: 6,
    title: "Impliquer les intérimaires et sous-traitants",
    desc: "Ce sont souvent les plus vulnérables. Intégrez-les pleinement au tour de table et donnez-leur la parole."
  },
  {
    num: 7,
    title: "Conclure par un engagement clair",
    desc: "L'équipe doit repartir avec 1 ou 2 gestes simples et concrets à appliquer dès la reprise du poste."
  },
  {
    num: 8,
    title: "Traiter les remontées d'anomalies",
    desc: "Si un équipement défectueux est signalé, notez-le dans l'action de séance et faites un retour au prochain quart d'heure."
  },
  {
    num: 9,
    title: "Utiliser des supports visuels ou interactifs",
    desc: "Montrez un équipement réel, faites un mini-quiz ou un vote à main levée pour maintenir l'attention."
  },
  {
    num: 10,
    title: "Faire signer la feuille d'émargement",
    desc: "Indispensable pour la traçabilité HSE, le respect réglementaire et la preuve d'information des salariés."
  }
];

export const HostToolbox: React.FC = () => {
  const [currentIcebreakerIdx, setCurrentIcebreakerIdx] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const rollIcebreaker = () => {
    setIsSpinning(true);
    playPhaseChime();
    setTimeout(() => {
      const next = Math.floor(Math.random() * ICEBREAKERS.length);
      setCurrentIcebreakerIdx(next);
      setIsSpinning(false);
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header Bento Banner */}
      <div className="bg-slate-900 text-white rounded-[2rem] p-7 sm:p-9 border border-zinc-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-400 text-slate-950 font-black">
              <Wrench className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              Guide & Outils de l'Animateur HSE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            La Méthode pour réussir vos Causeries Sécurité
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Astuces d'animation participative, brise-glace pour délier les langues et les 10 règles d'or d'un quart d'heure sécurité impactant.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all self-start md:self-center border border-zinc-700 shadow-sm"
        >
          <Printer className="w-4 h-4" />
          Imprimer ce guide
        </button>
      </div>

      {/* Interactive Icebreaker Generator Bento Card */}
      <div className="bg-slate-900 text-white rounded-[2rem] p-7 sm:p-8 border border-zinc-800 shadow-xl space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-400/20 text-amber-400 rounded-lg">
              <MessageSquare className="w-4 h-4" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              Générateur de Brise-Glace (Pour lancer la discussion)
            </span>
          </div>

          <button
            type="button"
            onClick={rollIcebreaker}
            disabled={isSpinning}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 text-xs font-black rounded-xl flex items-center gap-2 shadow-md transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            Nouvelle question
          </button>
        </div>

        {/* Big Question Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/80 border border-zinc-800 shadow-inner">
          <p className="text-lg sm:text-xl font-bold font-display text-zinc-100 italic leading-snug">
            « {ICEBREAKERS[currentIcebreakerIdx]} »
          </p>
        </div>

        <p className="text-xs text-zinc-400 italic">
          💡 <strong className="text-amber-400">Astuce animateur :</strong> Désignez un opérateur avec le sourire ou demandez à un volontaire de répondre en premier pour briser la glace.
        </p>
      </div>

      {/* The 10 Golden Rules */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <h2 className="text-xl font-black text-slate-900 font-display">
            Les 10 Commandements de l'Animateur Sécurité
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEN_COMMANDMENTS.map((rule) => (
            <div 
              key={rule.num} 
              className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-amber-400 shadow-sm transition-all flex items-start gap-4"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                {rule.num}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">
                  {rule.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 15-Minute Timeline Structure Guide Bento Card */}
      <div className="bg-white rounded-[2rem] p-7 sm:p-8 border border-zinc-200 shadow-sm space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-600" />
          Structure type d'un Quart d'Heure Sécurité réussi (15 min)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
            <span className="text-xs font-black text-amber-700 block">Phase 1 (2 min)</span>
            <h4 className="text-xs font-bold text-slate-900">Accroche & Éveil</h4>
            <p className="text-[11px] text-slate-600 leading-snug font-medium">Chiffre choc, question brise-glace et rappel de la règle d'or.</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
            <span className="text-xs font-black text-amber-700 block">Phase 2 (5 min)</span>
            <h4 className="text-xs font-bold text-slate-900">Règles & Dangers</h4>
            <p className="text-[11px] text-slate-600 leading-snug font-medium">À faire / À éviter, réflexes vitaux et matériel à utiliser.</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
            <span className="text-xs font-black text-amber-700 block">Phase 3 (5 min)</span>
            <h4 className="text-xs font-bold text-slate-900">Cas Pratique & Quiz</h4>
            <p className="text-[11px] text-slate-600 leading-snug font-medium">Dilemme réel de terrain, vote de l'équipe et mini-quiz participatif.</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
            <span className="text-xs font-black text-amber-700 block">Phase 4 (3 min)</span>
            <h4 className="text-xs font-bold text-slate-900">Engagements & Signatures</h4>
            <p className="text-[11px] text-slate-600 leading-snug font-medium">Engagements de la journée, remontée d'anomalies et émargement.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
