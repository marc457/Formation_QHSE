import React from 'react';
import { SafetyTopic } from '../types';
import { 
  Play, 
  Eye, 
  Clock, 
  HelpCircle, 
  Award, 
  Sparkles, 
  ShieldCheck,
  Building,
  Flame,
  Zap,
  Truck,
  Sun,
  Activity,
  Trash2
} from 'lucide-react';

interface TopicCardProps {
  topic: SafetyTopic;
  onSelect: (topic: SafetyTopic) => void;
  onStartLive: (topic: SafetyTopic) => void;
  onDelete?: (topicId: string) => void;
}

export const getCategoryColor = (cat: string) => {
  switch (cat) {
    case 'Hauteur': return { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', icon: 'bg-sky-500' };
    case 'EPI': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: 'bg-emerald-500' };
    case 'TMS': return { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', icon: 'bg-indigo-500' };
    case 'Chimique': return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: 'bg-rose-500' };
    case 'Engins': return { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', icon: 'bg-amber-500' };
    case 'Électricité': return { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200', icon: 'bg-yellow-500' };
    case 'Routier': return { bg: 'bg-cyan-50', text: 'text-cyan-800', border: 'border-cyan-200', icon: 'bg-cyan-500' };
    case 'Climat': return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: 'bg-orange-500' };
    case 'Plain-Pied': return { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', icon: 'bg-teal-500' };
    case 'Incendie': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: 'bg-red-500' };
    case 'Confiné': return { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300', icon: 'bg-slate-700' };
    default: return { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', icon: 'bg-emerald-600' };
  }
};

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  onSelect,
  onStartLive,
  onDelete
}) => {
  const colors = getCategoryColor(topic.category);

  return (
    <div className="bg-white rounded-[1.75rem] border border-zinc-200/90 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Tag Bar */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}>
              {topic.category}
            </span>
            {topic.isCustom && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-amber-400 text-slate-950">
                <Sparkles className="w-3 h-3 text-slate-900" />
                IA
              </span>
            )}
            {topic.level && (
              <span className="text-[11px] text-slate-500 font-semibold">
                • {topic.level}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-zinc-100 px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>15 min</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelect(topic)}
          className="text-base sm:text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors cursor-pointer line-clamp-2 leading-tight mb-2.5 font-display"
        >
          {topic.title}
        </h3>

        {/* Sector */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 font-medium">
          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{topic.sector}</span>
        </div>

        {/* Summary */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {topic.summary}
        </p>

        {/* Golden Rule Bento Callout */}
        <div 
          onClick={() => onSelect(topic)}
          className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-3.5 cursor-pointer hover:bg-amber-500/15 transition-colors"
        >
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] font-bold text-amber-950 line-clamp-2 leading-snug">
              <span className="text-amber-900 uppercase font-extrabold text-[10px] tracking-wider block mb-0.5">Règle d'or terrain</span>
              « {topic.goldenRule} »
            </p>
          </div>
        </div>

        {/* Interactive Badges in Bento Pills */}
        <div className="flex items-center gap-2 text-[11px] text-slate-600 font-semibold pt-1">
          <span className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-100 px-2.5 py-1 rounded-lg">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            {topic.quiz?.length || 3} quiz
          </span>
          <span className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-100 px-2.5 py-1 rounded-lg">
            <Award className="w-3.5 h-3.5 text-slate-400" />
            4 phases
          </span>
        </div>
      </div>

      {/* Footer Buttons in Bento style */}
      <div className="px-6 py-4 bg-zinc-50/80 border-t border-zinc-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onSelect(topic)}
          className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-zinc-200/80 rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <Eye className="w-4 h-4 text-slate-500" />
          Fiche guide
        </button>

        <div className="flex items-center gap-2">
          {topic.isCustom && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(topic.id)}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              title="Supprimer cette fiche personnalisée"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onStartLive(topic)}
            className="px-4 py-2 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Animer (15 min)
          </button>
        </div>
      </div>
    </div>
  );
};
