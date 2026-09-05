import React, { useState } from 'react';
import { SafetyTopic } from '../types';
import { TopicCard } from './TopicCard';
import { 
  Search, 
  Filter, 
  Sparkles, 
  AlertTriangle, 
  BookOpen, 
  ShieldCheck, 
  Plus, 
  Zap,
  Building,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Flame
} from 'lucide-react';

interface TopicLibraryProps {
  topics: SafetyTopic[];
  onSelectTopic: (topic: SafetyTopic) => void;
  onStartLive: (topic: SafetyTopic) => void;
  onDeleteTopic?: (id: string) => void;
  onNavigateToGenerator: () => void;
  onNavigateToRex: () => void;
}

const CATEGORIES = [
  'Tous',
  'Hauteur',
  'EPI',
  'TMS',
  'Engins',
  'Chimique',
  'Électricité',
  'Routier',
  'Climat',
  'Plain-Pied',
  'Incendie',
  'Confiné',
  'Personnalisés'
];

export const TopicLibrary: React.FC<TopicLibraryProps> = ({
  topics,
  onSelectTopic,
  onStartLive,
  onDeleteTopic,
  onNavigateToGenerator,
  onNavigateToRex
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedSector, setSelectedSector] = useState('all');

  // Filter topics
  const filteredTopics = topics.filter((t) => {
    const matchesSearch = 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.goldenRule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.sector.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'Tous' || 
      (selectedCategory === 'Personnalisés' ? t.isCustom : t.category === selectedCategory);

    const matchesSector = 
      selectedSector === 'all' || t.sector.toLowerCase().includes(selectedSector.toLowerCase());

    return matchesSearch && matchesCategory && matchesSector;
  });

  // Featured topic for top banner
  const featuredTopic = topics[0] || null;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Bento Header Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Bento Hero Card: Main presentation */}
        <div className="md:col-span-12 lg:col-span-8 bg-white rounded-[2rem] p-7 sm:p-9 border border-zinc-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-amber-400 px-3.5 py-1.5 rounded-full font-black text-xs text-slate-950 inline-flex items-center gap-1.5 shadow-sm">
                <Clock className="w-3.5 h-3.5" />
                15 MINUTES CHRONO
              </span>
              <span className="bg-zinc-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full border border-zinc-200">
                {topics.length} Causeries Prêtes à l'Emploi
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none font-display">
              Animez vos causeries sécurité avec clarté & impact.
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              Fiches interactives en 4 phases chronométrées avec brise-glaces, règles d'or, quiz interactifs en direct et <strong>feuille d'émargement numérique à signature tactile</strong> conforme aux audits.
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-100 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10">
            <button
              type="button"
              onClick={onNavigateToGenerator}
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 active:scale-95 text-amber-300 font-extrabold text-xs sm:text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Créer un sujet sur-mesure (IA)</span>
            </button>

            <button
              type="button"
              onClick={onNavigateToRex}
              className="px-5 py-3 bg-zinc-100 hover:bg-zinc-200 text-slate-900 font-bold text-xs sm:text-sm rounded-2xl border border-zinc-200 flex items-center justify-center gap-2 transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span>Analyser un REX / Presque-accident</span>
            </button>
          </div>
        </div>

        {/* Bento Side Metric / Météo Sécurité Card */}
        <div className="md:col-span-12 lg:col-span-4 bg-emerald-600 rounded-[2rem] p-7 text-white flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-100 bg-emerald-700/50 px-3 py-1 rounded-full border border-emerald-500/50">
                MÉTÉO SÉCURITÉ DU SITE
              </span>
              <ShieldCheck className="w-6 h-6 text-emerald-200" />
            </div>

            <div className="text-4xl sm:text-5xl font-black mb-1 font-display tracking-tight">
              100%
            </div>
            <p className="text-xs font-bold text-emerald-100 uppercase tracking-wider mb-4">
              Équipe sensibilisée ce mois-ci
            </p>

            <div className="bg-emerald-700/40 rounded-2xl p-3.5 border border-emerald-500/40 text-xs text-emerald-50 space-y-1.5">
              <div className="font-extrabold flex items-center gap-1.5 text-white">
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                Conseil d'animation du jour :
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-100">
                Faites parler 2 opérateurs avant d'énoncer la règle d'or pour favoriser l'ancrage mémoriel.
              </p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-emerald-500/40 flex items-center justify-between text-xs text-emerald-100 font-semibold">
            <span>Signature tactile active</span>
            <span className="bg-emerald-500 px-2 py-0.5 rounded text-[10px] font-bold text-slate-950">Prêt</span>
          </div>
        </div>

      </div>

      {/* Search & Category Bento Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-zinc-200 shadow-sm space-y-3.5">
        
        {/* Search Input and Sector dropdown */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par mot-clé, risque, métier (harnais, échelle, bruit)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-zinc-200 bg-zinc-50 font-medium focus:bg-white focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Building className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="text-xs font-bold p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:border-amber-400 w-full sm:w-auto"
            >
              <option value="all">Tous les secteurs</option>
              <option value="BTP">BTP & Construction</option>
              <option value="Industrie">Industrie & Usine</option>
              <option value="Logistique">Logistique & Entrepôt</option>
              <option value="Réseaux">Énergie & Réseaux</option>
              <option value="Voirie">Voirie & VRD</option>
            </select>
          </div>
        </div>

        {/* Category horizontal pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-amber-300 shadow-sm'
                    : 'bg-zinc-100 text-slate-600 hover:bg-zinc-200 hover:text-slate-900'
                }`}
              >
                {cat === 'Personnalisés' ? '✨ Personnalisés IA' : cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Grid of Topics in Bento Cards */}
      {filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onSelect={onSelectTopic}
              onStartLive={onStartLive}
              onDelete={onDeleteTopic}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-[2rem] border-2 border-dashed border-zinc-200 p-8 space-y-4">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Aucune fiche ne correspond à votre recherche</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Vous pouvez créer instantanément une causerie adaptée à ce sujet avec le générateur d'IA.
          </p>
          <button
            type="button"
            onClick={onNavigateToGenerator}
            className="px-5 py-2.5 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Générer ce thème avec l'IA
          </button>
        </div>
      )}

    </div>
  );
};
