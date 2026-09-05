import React, { useState, useEffect, useRef } from 'react';
import { SafetyTopic, SafetySession, ActionItem, Participant } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Minus, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  FileCheck2, 
  Award, 
  AlertTriangle, 
  Clock, 
  Maximize, 
  Minimize, 
  Check, 
  MessageSquare, 
  Flame,
  ArrowRight,
  PlusCircle,
  Trash2,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPhaseChime, playSuccessSound, playWarningBeep } from '../utils/audio';

interface LiveAnimationViewProps {
  topic: SafetyTopic;
  onFinishSession: (sessionData: Partial<SafetySession>) => void;
  onCancel: () => void;
  savedTeamMembers: Participant[];
}

export const LiveAnimationView: React.FC<LiveAnimationViewProps> = ({
  topic,
  onFinishSession,
  onCancel,
  savedTeamMembers
}) => {
  // Timer State (15 min = 900 seconds)
  const [totalSeconds, setTotalSeconds] = useState(15 * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Phase index (0: Phase 1, 1: Phase 2, 2: Phase 3, 3: Phase 4)
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(0);

  // Interactive Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<number, boolean>>({});
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  // Interactive Dos/Donts reveal state
  const [revealedDos, setRevealedDos] = useState<Record<number, boolean>>({});
  const [revealedDonts, setRevealedDonts] = useState<Record<number, boolean>>({});
  const [revealedDilemma, setRevealedDilemma] = useState(false);

  // Icebreaker picker
  const [selectedIcebreaker, setSelectedIcebreaker] = useState<number>(0);

  // Live notes & Action items during meeting
  const [meetingNotes, setMeetingNotes] = useState('');
  const [selectedCommitments, setSelectedCommitments] = useState<string[]>(topic.recommendedCommitments || []);
  const [liveActionItems, setLiveActionItems] = useState<ActionItem[]>([]);
  const [newActionText, setNewActionText] = useState('');
  const [newActionAssignee, setNewActionAssignee] = useState('');
  const [newActionDeadline, setNewActionDeadline] = useState('');

  // Container ref for fullscreen
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (soundEnabled) playWarningBeep();
            return 0;
          }
          if (prev === 60 && soundEnabled) {
            playWarningBeep();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds, soundEnabled]);

  // Handle phase change sound
  const handleSetPhase = (idx: number) => {
    setCurrentPhaseIdx(idx);
    if (soundEnabled) {
      playPhaseChime();
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Format timer
  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handle Quiz answer click
  const handleAnswerQuiz = (qIdx: number, optionIdx: number) => {
    if (selectedAnswers[qIdx] !== undefined) return; // already answered
    const question = topic.quiz[qIdx];
    const isCorrect = optionIdx === question.correctIndex;

    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
    setRevealedExplanations((prev) => ({ ...prev, [qIdx]: true }));

    if (isCorrect) {
      if (soundEnabled) playSuccessSound();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
      setQuizScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setQuizScore((prev) => ({ correct: prev.correct, total: prev.total + 1 }));
    }
  };

  // Add a live action item
  const handleAddLiveAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionText.trim()) return;
    const item: ActionItem = {
      id: 'act_live_' + Date.now(),
      description: newActionText.trim(),
      assignee: newActionAssignee.trim() || 'À définir',
      deadline: newActionDeadline || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      priority: 'haute',
      status: 'a_faire'
    };
    setLiveActionItems([...liveActionItems, item]);
    setNewActionText('');
    setNewActionAssignee('');
    setNewActionDeadline('');
  };

  const handleRemoveAction = (id: string) => {
    setLiveActionItems(liveActionItems.filter((a) => a.id !== id));
  };

  const toggleCommitment = (com: string) => {
    if (selectedCommitments.includes(com)) {
      setSelectedCommitments(selectedCommitments.filter((c) => c !== com));
    } else {
      setSelectedCommitments([...selectedCommitments, com]);
    }
  };

  // Finish session & open sign-in sheet
  const handleProceedToSignSheet = () => {
    const elapsedSeconds = totalSeconds - remainingSeconds;
    onFinishSession({
      topicId: topic.id,
      topicTitle: topic.title,
      category: topic.category,
      durationActualSeconds: elapsedSeconds > 0 ? elapsedSeconds : totalSeconds,
      notes: meetingNotes,
      teamCommitments: selectedCommitments,
      actionItems: liveActionItems,
      completedPhases: [1, 2, 3, 4],
      quizScore: {
        correct: quizScore.correct,
        total: topic.quiz?.length || 3
      }
    });
  };

  const currentPhase = topic.phases[currentPhaseIdx] || topic.phases[0];
  const progressPercent = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  return (
    <div 
      ref={containerRef}
      className="min-h-[88vh] bg-slate-950 text-slate-100 rounded-[2rem] flex flex-col justify-between overflow-hidden shadow-2xl border border-zinc-800 animate-fadeIn"
    >
      
      {/* Top Bar: Topic title, Timer, Controls */}
      <div className="p-4 sm:p-5 bg-slate-900 border-b border-zinc-800 backdrop-blur flex flex-wrap items-center justify-between gap-4">
        
        {/* Title & Category */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-sm">
            15'
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-amber-400/15 text-amber-400 border border-amber-400/30 uppercase tracking-wider">
                {topic.category}
              </span>
              <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
                Mode Animation Présentateur
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-white font-display line-clamp-1 mt-0.5">
              {topic.title}
            </h1>
          </div>
        </div>

        {/* Big Center Timer in Bento Pill */}
        <div className="flex items-center gap-3 bg-slate-950 px-5 py-2.5 rounded-2xl border border-zinc-800 shadow-inner">
          <div className="flex flex-col items-center">
            <span className={`text-2xl sm:text-3xl font-black font-mono tracking-wider ${
              remainingSeconds < 120 ? 'text-rose-400 animate-pulse' : 'text-amber-400'
            }`}>
              {formatTimer(remainingSeconds)}
            </span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
              {remainingSeconds > 0 ? (isRunning ? 'En cours' : 'En pause') : 'Terminé !'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 pl-3 border-l border-zinc-800">
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className={`p-2.5 rounded-xl font-bold transition-all ${
                isRunning 
                  ? 'bg-amber-400/20 text-amber-400 hover:bg-amber-400/30' 
                  : 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-sm'
              }`}
              title={isRunning ? 'Mettre en pause' : 'Démarrer le chrono'}
            >
              {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                setRemainingSeconds(15 * 60);
              }}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
              title="Réinitialiser à 15:00"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setRemainingSeconds((prev) => Math.min(prev + 60, 30 * 60))}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg text-xs font-bold"
              title="+1 minute"
            >
              +1'
            </button>

            <button
              type="button"
              onClick={() => setRemainingSeconds((prev) => Math.max(prev - 60, 0))}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg text-xs font-bold"
              title="-1 minute"
            >
              -1'
            </button>
          </div>
        </div>

        {/* Right Tools (Sound, Fullscreen, Leave) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl transition-colors ${
              soundEnabled ? 'text-amber-400 hover:bg-zinc-800' : 'text-zinc-600 hover:bg-zinc-800'
            }`}
            title={soundEnabled ? 'Sons activés' : 'Sons coupés'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
            title={isFullscreen ? 'Quitter le plein écran' : 'Passer en plein écran'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-2 text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
          >
            Quitter
          </button>
        </div>

      </div>

      {/* 4 Phases Navigation Steps Bento Pills */}
      <div className="bg-slate-900 border-b border-zinc-800 px-4 py-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {topic.phases.map((p, idx) => {
            const isActive = currentPhaseIdx === idx;
            const isPassed = currentPhaseIdx > idx;
            return (
              <button
                key={p.number}
                onClick={() => handleSetPhase(idx)}
                className={`text-left p-3 rounded-2xl border transition-all ${
                  isActive
                    ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm ring-1 ring-amber-400/40'
                    : isPassed
                    ? 'bg-slate-950/60 border-emerald-500/40 text-zinc-300 hover:bg-zinc-800'
                    : 'bg-slate-950/40 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-black mb-1">
                  <span className={isActive ? 'text-amber-400' : isPassed ? 'text-emerald-400' : 'text-zinc-500'}>
                    PHASE {p.number} • {p.durationMinutes} min
                  </span>
                  {isPassed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="text-xs font-bold truncate">
                  {p.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Slide / Phase Content Canvas in Bento Cards */}
      <div className="flex-1 p-5 sm:p-8 overflow-y-auto max-w-5xl mx-auto w-full">
        
        {/* PHASE 1: Accroche & Éveil (2 min) */}
        {currentPhaseIdx === 0 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Phase Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Phase 1 : Accroche & Éveil (2 minutes)
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-medium italic">
                🎯 Objectif : Capter l'attention et faire témoigner l'équipe
              </span>
            </div>

            {/* Golden Rule Big Bento Display */}
            <div className="p-7 rounded-[2rem] bg-slate-900 border border-zinc-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
                <ShieldCheck className="w-5 h-5" />
                Règle d'or de la journée
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display leading-snug">
                « {topic.goldenRule} »
              </h2>
            </div>

            {/* Key Stat & Leader Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900 border border-zinc-800">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-wider mb-2">
                  <Flame className="w-4 h-4" />
                  Chiffre choc / Réalité terrain
                </div>
                <p className="text-sm sm:text-base font-bold text-zinc-100 leading-relaxed">
                  {topic.keyStat}
                </p>
                <div className="mt-4 pt-3 border-t border-zinc-800 space-y-2">
                  {currentPhase.keyPoints.map((pt, i) => (
                    <div key={i} className="text-xs text-zinc-300 flex items-start gap-2.5 font-medium">
                      <span className="text-amber-400 font-black">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Icebreaker Questions */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-3">
                    <MessageSquare className="w-4 h-4" />
                    Questions à poser au groupe
                  </div>

                  <div className="space-y-2.5">
                    {topic.icebreakerQuestions.map((q, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setSelectedIcebreaker(idx)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          selectedIcebreaker === idx
                            ? 'bg-amber-400/20 border-amber-400 text-white shadow-sm'
                            : 'bg-slate-950/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                        }`}
                      >
                        <p className="text-xs sm:text-sm font-semibold italic leading-snug">
                          « {q} »
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/25 text-xs text-amber-200 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-amber-400">Conseil animateur :</strong> {currentPhase.leaderNotes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 2: Bonnes Pratiques & Dangers (5 min) */}
        {currentPhaseIdx === 1 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Phase Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Phase 2 : Bonnes Pratiques & Situations à Risque (5 minutes)
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-medium italic">
                👆 Cliquez sur une carte pour révéler l'explication à l'équipe
              </span>
            </div>

            {/* Interactive DOs and DONTs Bento Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* À FAIRE */}
              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    À FAIRE (Réflexes vitaux)
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const all: Record<number, boolean> = {};
                      topic.dosAndDonts.dos.forEach((_, i) => all[i] = true);
                      setRevealedDos(all);
                    }}
                    className="text-[11px] font-bold text-emerald-300 hover:underline"
                  >
                    Tout révéler
                  </button>
                </div>

                <div className="space-y-2.5">
                  {topic.dosAndDonts.dos.map((item, idx) => {
                    const isRevealed = revealedDos[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => setRevealedDos({ ...revealedDos, [idx]: !isRevealed })}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isRevealed
                            ? 'bg-emerald-900/40 border-emerald-500/40 text-emerald-100'
                            : 'bg-slate-900/80 border-zinc-800 hover:border-emerald-500/40 text-zinc-400'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                            isRevealed ? 'bg-emerald-500 text-slate-950' : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold leading-snug">
                            {isRevealed ? item : '👉 Cliquez pour afficher la règle ' + (idx + 1)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* À ÉVITER */}
              <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-wider text-rose-400 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    À PROSCRIRE (Comportements à risque)
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const all: Record<number, boolean> = {};
                      topic.dosAndDonts.donts.forEach((_, i) => all[i] = true);
                      setRevealedDonts(all);
                    }}
                    className="text-[11px] font-bold text-rose-300 hover:underline"
                  >
                    Tout révéler
                  </button>
                </div>

                <div className="space-y-2.5">
                  {topic.dosAndDonts.donts.map((item, idx) => {
                    const isRevealed = revealedDonts[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => setRevealedDonts({ ...revealedDonts, [idx]: !isRevealed })}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isRevealed
                            ? 'bg-rose-900/40 border-rose-500/40 text-rose-100'
                            : 'bg-slate-900/80 border-zinc-800 hover:border-rose-500/40 text-zinc-400'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                            isRevealed ? 'bg-rose-500 text-white' : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold leading-snug">
                            {isRevealed ? item : '👉 Cliquez pour afficher le piège ' + (idx + 1)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Key discussion points */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-zinc-800">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider block mb-2.5">
                Points clés à rappeler :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {currentPhase.keyPoints.map((pt, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950/70 text-xs text-zinc-200 border border-zinc-800 font-medium">
                    • {pt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PHASE 3: Cas Pratique & Mini-Quiz Interactif (5 min) */}
        {currentPhaseIdx === 2 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Phase Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Phase 3 : Débat Équipe & Mini-Quiz (5 minutes)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-black text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-xl border border-amber-400/30">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Score Quiz : {quizScore.correct} / {topic.quiz.length}</span>
              </div>
            </div>

            {/* Interactive Dilemma Scenario Bento Card */}
            <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-purple-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Cas Pratique / Dilemme de terrain
                </span>
                <span className="text-xs text-purple-300 font-medium italic">Faites voter l'équipe à main levée !</span>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-zinc-800">
                <p className="text-xs sm:text-sm text-zinc-200 font-semibold mb-2">
                  <span className="text-purple-400 font-bold">Situation :</span> {topic.dilemmaScenario.scenario}
                </p>
                <p className="text-sm font-bold text-white mb-3">
                  <span className="text-amber-400 font-black">Question à l'équipe :</span> {topic.dilemmaScenario.question}
                </p>

                <button
                  type="button"
                  onClick={() => setRevealedDilemma(!revealedDilemma)}
                  className="px-4 py-2 text-xs font-black text-purple-950 bg-purple-300 hover:bg-purple-200 rounded-xl transition-all flex items-center gap-2 shadow-sm"
                >
                  {revealedDilemma ? 'Masquer la réponse' : '✨ Révéler la bonne réaction'}
                </button>

                {revealedDilemma && (
                  <div className="mt-3 p-4 rounded-xl bg-purple-900/40 border border-purple-500/50 text-xs sm:text-sm text-purple-100 animate-fadeIn font-medium">
                    <strong className="text-purple-300 font-bold">Réaction attendue : </strong>
                    {topic.dilemmaScenario.goodReaction}
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Mini-Quiz Bento Cards */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Mini-Quiz Équipe ({topic.quiz.length} questions)
              </h3>

              <div className="space-y-4">
                {topic.quiz.map((q, qIdx) => {
                  const userAnswer = selectedAnswers[qIdx];
                  const hasAnswered = userAnswer !== undefined;
                  const isAnswerCorrect = hasAnswered && userAnswer === q.correctIndex;

                  return (
                    <div 
                      key={qIdx} 
                      className={`p-6 rounded-2xl border transition-all ${
                        hasAnswered 
                           ? isAnswerCorrect
                            ? 'bg-emerald-950/20 border-emerald-500/40'
                            : 'bg-rose-950/20 border-rose-500/40'
                          : 'bg-slate-900 border-zinc-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <p className="text-sm sm:text-base font-bold text-white">
                          <span className="text-amber-400 font-black mr-1.5">{qIdx + 1}.</span> {q.question}
                        </p>
                        {hasAnswered && (
                          <span className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1 ${
                            isAnswerCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          }`}>
                            {isAnswerCorrect ? <Check className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                            {isAnswerCorrect ? 'Exact !' : 'À corriger'}
                          </span>
                        )}
                      </div>

                      {/* Options */}
                      <div className="space-y-2 mb-3">
                        {q.options.map((opt, oIdx) => {
                          const isThisSelected = userAnswer === oIdx;
                          const isThisCorrect = oIdx === q.correctIndex;
                          
                          let btnStyle = 'bg-slate-950/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800';
                          if (hasAnswered) {
                            if (isThisCorrect) {
                              btnStyle = 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-sm';
                            } else if (isThisSelected) {
                              btnStyle = 'bg-rose-500/30 border-rose-500 text-rose-200 line-through';
                            } else {
                              btnStyle = 'bg-slate-950/30 border-zinc-800/60 text-zinc-500 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              type="button"
                              disabled={hasAnswered}
                              onClick={() => handleAnswerQuiz(qIdx, oIdx)}
                              className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold transition-all ${btnStyle}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-6 h-6 rounded-lg bg-black/20 flex items-center justify-center text-xs font-bold">
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                              {hasAnswered && isThisCorrect && <CheckCircle2 className="w-4 h-4 text-slate-950" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {hasAnswered && (
                        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-zinc-800 text-xs text-zinc-300 italic animate-fadeIn font-medium">
                          💡 <strong className="text-amber-400 font-bold">Explication :</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* PHASE 4: Engagements & Clôture (3 min) */}
        {currentPhaseIdx === 3 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Phase Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Phase 4 : Engagements & Actions Terrain (3 minutes)
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-medium italic">
                📋 Formaliser les engagements avant de signer
              </span>
            </div>

            {/* Team Commitments Checklist */}
            <div className="p-6 rounded-2xl bg-amber-400/10 border border-amber-400/25 space-y-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4" />
                Engagements adoptés par l'équipe aujourd'hui
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {topic.recommendedCommitments.map((com, idx) => {
                  const isChecked = selectedCommitments.includes(com);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCommitment(com)}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-2.5 transition-all ${
                        isChecked
                          ? 'bg-amber-400/20 border-amber-400 text-white font-semibold'
                          : 'bg-slate-900 border-zinc-800 text-zinc-400 hover:bg-zinc-850'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-md flex items-center justify-center text-xs mt-0.5 shrink-0 ${
                        isChecked ? 'bg-amber-400 text-slate-950 font-black' : 'border border-zinc-600'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </span>
                      <span className="text-xs leading-snug">{com}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Live Action Item Creator Bento Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Remontées & Actions correctives décidées en séance
                </h3>
                <span className="text-xs text-zinc-400 font-bold">{liveActionItems.length} action(s)</span>
              </div>

              {/* Form */}
              <form onSubmit={handleAddLiveAction} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                <input
                  type="text"
                  placeholder="Action à mener (ex: Remplacer le câble usé, Commander 2 visières...)"
                  value={newActionText}
                  onChange={(e) => setNewActionText(e.target.value)}
                  className="sm:col-span-6 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-zinc-700 text-xs text-white placeholder-zinc-500 font-medium focus:outline-none focus:border-amber-400"
                />
                <input
                  type="text"
                  placeholder="Responsable (Qui ?)"
                  value={newActionAssignee}
                  onChange={(e) => setNewActionAssignee(e.target.value)}
                  className="sm:col-span-3 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-zinc-700 text-xs text-white placeholder-zinc-500 font-medium focus:outline-none focus:border-amber-400"
                />
                <input
                  type="date"
                  value={newActionDeadline}
                  onChange={(e) => setNewActionDeadline(e.target.value)}
                  className="sm:col-span-2 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-zinc-700 text-xs text-white font-medium focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="sm:col-span-1 px-3.5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                </button>
              </form>

              {/* Action items list */}
              {liveActionItems.length > 0 && (
                <div className="space-y-2 pt-2">
                  {liveActionItems.map((act) => (
                    <div key={act.id} className="p-3 rounded-xl bg-slate-950 border border-zinc-800 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="font-bold text-white">{act.description}</span>
                        <span className="text-zinc-400">👤 {act.assignee}</span>
                        <span className="text-zinc-500">📅 {act.deadline}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAction(act.id)}
                        className="text-zinc-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Meeting Notes */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-zinc-800 space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                Remarques du terrain & Synthèse des échanges
              </label>
              <textarea
                rows={2}
                placeholder="Ex: Équipe très attentive. Signalement d'un souci d'éclairage dans l'escalier A..."
                value={meetingNotes}
                onChange={(e) => setMeetingNotes(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-zinc-700 text-xs text-white placeholder-zinc-500 font-medium focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Big CTA: Proceed to Digital Sign-In Sheet */}
            <div className="pt-4 flex flex-col items-center justify-center text-center space-y-3">
              <button
                type="button"
                onClick={handleProceedToSignSheet}
                className="px-8 py-4 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-md flex items-center gap-3 transition-all"
              >
                <Users className="w-5 h-5 fill-current" />
                Émarger & Clôturer la causerie sécurité
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-zinc-400 font-medium">
                Ouvre la feuille de présence numérique, la capture des signatures et l'export PDF conforme.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Bar: Previous / Next Phase Controls */}
      <div className="p-4 bg-slate-900 border-t border-zinc-800 flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={currentPhaseIdx === 0}
          onClick={() => handleSetPhase(currentPhaseIdx - 1)}
          className="px-4 py-2.5 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl flex items-center gap-1.5 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Phase précédente
        </button>

        {/* Phase dots */}
        <div className="flex items-center gap-2">
          {topic.phases.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSetPhase(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentPhaseIdx === i ? 'w-6 bg-amber-400' : 'bg-zinc-700 hover:bg-zinc-600'
              }`}
            />
          ))}
        </div>

        {currentPhaseIdx < topic.phases.length - 1 ? (
          <button
            type="button"
            onClick={() => handleSetPhase(currentPhaseIdx + 1)}
            className="px-5 py-2.5 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            Phase suivante
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleProceedToSignSheet}
            className="px-5 py-2.5 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            Émargement & Fin
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};
