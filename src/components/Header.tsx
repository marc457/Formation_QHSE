import React from 'react';
import { 
  ShieldAlert, 
  BookOpen, 
  Sparkles, 
  Play, 
  FileText, 
  History, 
  Wrench, 
  AlertTriangle,
  Clock
} from 'lucide-react';

export type AppView = 'library' | 'live' | 'generator' | 'rex' | 'history' | 'toolbox';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isSessionActive: boolean;
  activeTopicTitle?: string;
  sessionRemainingSeconds?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isSessionActive,
  activeTopicTitle,
  sessionRemainingSeconds
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Bento Item */}
          <div 
            onClick={() => onNavigate('library')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6 stroke-[2.4]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                  LE QUART D'HEURE <span className="text-amber-500">SÉCU</span>
                </h1>
                <span className="hidden md:inline-block px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase bg-slate-900 text-amber-300 rounded-md">
                  15 MIN CHRONO
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Site Industriel & Chantiers • Causeries participatives & Émargement
              </p>
            </div>
          </div>

          {/* Active session bar if in background */}
          {isSessionActive && currentView !== 'live' && (
            <button
              onClick={() => onNavigate('live')}
              className="bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-full font-black text-xs sm:text-sm text-slate-900 flex items-center gap-2.5 shadow-sm active:scale-95 transition-all"
            >
              <div className="w-2 h-2 bg-slate-900 rounded-full animate-ping" />
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>SÉANCE EN COURS :</span>
              <span className="max-w-[130px] truncate font-bold">{activeTopicTitle || 'Causerie'}</span>
              {sessionRemainingSeconds !== undefined && (
                <span className="font-mono font-bold bg-slate-900 text-amber-300 px-2 py-0.5 rounded-full text-xs">
                  {formatTime(sessionRemainingSeconds)}
                </span>
              )}
            </button>
          )}

          {/* Desktop Nav in Bento Pill Container */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-zinc-100/90 p-1.5 rounded-2xl border border-zinc-200">
            <button
              onClick={() => onNavigate('library')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentView === 'library'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Catalogue</span>
            </button>

            <button
              onClick={() => onNavigate('generator')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentView === 'generator'
                  ? 'bg-slate-900 text-amber-300 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Générateur IA</span>
            </button>

            <button
              onClick={() => onNavigate('rex')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentView === 'rex'
                  ? 'bg-slate-900 text-orange-300 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span>REX Flash</span>
            </button>

            <button
              onClick={() => onNavigate('history')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentView === 'history'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Émargements & Suivi</span>
            </button>

            <button
              onClick={() => onNavigate('toolbox')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentView === 'toolbox'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Boîte à Outils</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Nav Sub-bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-200 bg-white px-2 py-2 overflow-x-auto">
        <button
          onClick={() => onNavigate('library')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-bold ${
            currentView === 'library' ? 'bg-slate-900 text-amber-400 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>Catalogue</span>
        </button>

        <button
          onClick={() => onNavigate('generator')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-bold ${
            currentView === 'generator' ? 'bg-slate-900 text-amber-400 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5 text-amber-500" />
          <span>Générateur IA</span>
        </button>

        <button
          onClick={() => onNavigate('rex')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-bold ${
            currentView === 'rex' ? 'bg-slate-900 text-orange-400 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 mb-0.5 text-orange-500" />
          <span>REX Flash</span>
        </button>

        <button
          onClick={() => onNavigate('history')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-bold ${
            currentView === 'history' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <History className="w-4 h-4 mb-0.5" />
          <span>Suivi HSE</span>
        </button>

        <button
          onClick={() => onNavigate('toolbox')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-bold ${
            currentView === 'toolbox' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wrench className="w-4 h-4 mb-0.5" />
          <span>Outils</span>
        </button>
      </div>
    </header>
  );
};
