import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  BookOpen,
  Play,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Trophy,
  Users,
  User,
  Clock,
  Sparkles,
  Home,
} from 'lucide-react';
import {
  BINS,
  TEAM_PRESETS,
  WASTE_ITEMS,
  WasteCategory,
  WasteItem,
} from './data/wasteItems';
import { WasteIllustration } from './components/WasteIllustration';
import { TrashBin2D } from './components/TrashBin2D';
import { WasteGuideView } from './components/WasteGuideView';
import { ConfettiBurst2D } from './components/ConfettiBurst2D';
import { soundEngine } from './utils/sound';

type GameScreen = 'TITLE_MENU' | 'PLAYING' | 'ROUND_SUMMARY' | 'GUIDE';
type PlayMode = 'solo' | 'teams';
type BinMode = '3bins' | '2bins';

interface TeamScore {
  id: string;
  name: string;
  colorClass: string;
  softClass: string;
  score: number;
  correctCount: number;
  totalTurns: number;
}

interface AnswerFeedback {
  selectedCategory: WasteCategory;
  isCorrect: boolean;
  pointsEarned: number;
  streakBonus: number;
}

const BASE = import.meta.env.BASE_URL;
const HERO_BACKDROP_PATH = `${BASE}src/assets/images/schoolyard_eco_backdrop_1795059677512.jpg`;

const CORRECT_REACTION_PHOTO = `${BASE}assets/aistudio/chiquita_cb7196e6.jpg`;
const WRONG_REACTION_PHOTO = `${BASE}assets/aistudio/bahlil_b5b90a0a.jpeg`;

function buildDeck(binMode: BinMode, count: number): WasteItem[] {
  const pool =
    binMode === '2bins'
      ? WASTE_ITEMS.filter((item) => item.category !== 'b3')
      : [...WASTE_ITEMS];

  // Fisher-Yates shuffle
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('TITLE_MENU');
  const [playMode, setPlayMode] = useState<PlayMode>('teams');
  const [teamCount, setTeamCount] = useState<number>(3);
  const [binMode, setBinMode] = useState<BinMode>('3bins');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [backdropError, setBackdropError] = useState<boolean>(false);

  // Active game state
  const [deck, setDeck] = useState<WasteItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [soloScore, setSoloScore] = useState<number>(0);
  const [soloCorrect, setSoloCorrect] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [teams, setTeams] = useState<TeamScore[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [binFeedbackMap, setBinFeedbackMap] = useState<
    Record<WasteCategory, 'idle' | 'correct' | 'wrong'>
  >({
    organik: 'idle',
    anorganik: 'idle',
    b3: 'idle',
  });
  const [confettiActive, setConfettiActive] = useState<boolean>(false);

  // Pointer drag state for Smartboard touch + mouse drag-and-drop
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [hoveredBin, setHoveredBin] = useState<WasteCategory | null>(null);

  const dragStartRef = useRef<{ x: number; y: number; pointerId: number } | null>(
    null
  );
  const binRefs = useRef<Partial<Record<WasteCategory, HTMLButtonElement | null>>>(
    {}
  );

  const activeBins: WasteCategory[] =
    binMode === '2bins' ? ['organik', 'anorganik'] : ['organik', 'anorganik', 'b3'];

  const currentItem = deck[currentIndex] || null;
  const currentTeamIndex =
    playMode === 'teams' && teams.length > 0 ? currentIndex % teams.length : 0;
  const activeTeam = playMode === 'teams' ? teams[currentTeamIndex] : null;

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.setEnabled(next);
    if (next) {
      soundEngine.playClick();
    }
  };

  const startNewGame = useCallback(() => {
    soundEngine.playClick();
    const totalQuestions =
      playMode === 'teams'
        ? teamCount * 3 // 3 giliran per tim (6, 9, atau 12 soal)
        : binMode === '2bins'
          ? 8
          : 10;

    const newDeck = buildDeck(binMode, totalQuestions);
    setDeck(newDeck);
    setCurrentIndex(0);
    setSoloScore(0);
    setSoloCorrect(0);
    setStreak(0);
    setShowHint(false);
    setFeedback(null);
    setConfettiActive(false);
    setBinFeedbackMap({ organik: 'idle', anorganik: 'idle', b3: 'idle' });
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
    setHoveredBin(null);

    if (playMode === 'teams') {
      setTeams(
        TEAM_PRESETS.slice(0, teamCount).map((preset) => ({
          ...preset,
          score: 0,
          correctCount: 0,
          totalTurns: 0,
        }))
      );
    } else {
      setTeams([]);
    }

    setScreen('PLAYING');
  }, [playMode, teamCount, binMode]);

  const handleSortChoice = useCallback(
    (chosenCategory: WasteCategory) => {
      if (!currentItem || feedback) return;

      const isCorrect = currentItem.category === chosenCategory;
      const nextStreak = isCorrect ? streak + 1 : 0;
      const streakBonus = isCorrect && nextStreak >= 3 ? 5 : 0;
      const pointsEarned = isCorrect ? 10 + streakBonus : 0;

      if (isCorrect) {
        soundEngine.playCorrect();
        setConfettiActive(true);
        setTimeout(() => setConfettiActive(false), 900);
      } else {
        soundEngine.playWrong();
      }

      setStreak(nextStreak);
      setBinFeedbackMap({
        organik:
          chosenCategory === 'organik'
            ? isCorrect
              ? 'correct'
              : 'wrong'
            : 'idle',
        anorganik:
          chosenCategory === 'anorganik'
            ? isCorrect
              ? 'correct'
              : 'wrong'
            : 'idle',
        b3:
          chosenCategory === 'b3' ? (isCorrect ? 'correct' : 'wrong') : 'idle',
      });

      if (playMode === 'teams') {
        setTeams((prev) =>
          prev.map((team, idx) =>
            idx === currentTeamIndex
              ? {
                  ...team,
                  score: team.score + pointsEarned,
                  correctCount: team.correctCount + (isCorrect ? 1 : 0),
                  totalTurns: team.totalTurns + 1,
                }
              : team
          )
        );
      } else {
        setSoloScore((prev) => prev + pointsEarned);
        if (isCorrect) setSoloCorrect((prev) => prev + 1);
      }

      setFeedback({
        selectedCategory: chosenCategory,
        isCorrect,
        pointsEarned,
        streakBonus,
      });
    },
    [currentItem, feedback, streak, playMode, currentTeamIndex]
  );

  const handleNextQuestion = useCallback(() => {
    soundEngine.playClick();
    if (currentIndex + 1 >= deck.length) {
      soundEngine.playVictory();
      setScreen('ROUND_SUMMARY');
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setShowHint(false);
    setFeedback(null);
    setBinFeedbackMap({ organik: 'idle', anorganik: 'idle', b3: 'idle' });
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
    setHoveredBin(null);
  }, [currentIndex, deck.length]);

  // Keyboard shortcuts for Smartboard wireless presenter / keyboard (1, 2, 3, Enter)
  useEffect(() => {
    if (screen !== 'PLAYING') return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (feedback) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextQuestion();
        }
        return;
      }
      if (e.key === '1') handleSortChoice('organik');
      if (e.key === '2') handleSortChoice('anorganik');
      if (e.key === '3' && binMode === '3bins') handleSortChoice('b3');
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [screen, feedback, binMode, handleSortChoice, handleNextQuestion]);

  // Hit-testing helper for drag-and-drop over bins
  const detectHoveredBin = (clientX: number, clientY: number): WasteCategory | null => {
    for (const cat of activeBins) {
      const el = binRefs.current[cat];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (
        clientX >= rect.left - 12 &&
        clientX <= rect.right + 12 &&
        clientY >= rect.top - 12 &&
        clientY <= rect.bottom + 12
      ) {
        return cat;
      }
    }
    return null;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (feedback) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    soundEngine.playPickup();
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      pointerId: e.pointerId,
    };
    setIsDragging(true);
    setDragOffset({ x: 0, y: 0 });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setDragOffset({ x: dx, y: dy });
    setHoveredBin(detectHoveredBin(e.clientX, e.clientY));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const targetBin = detectHoveredBin(e.clientX, e.clientY);
    dragStartRef.current = null;
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    setHoveredBin(null);

    if (targetBin) {
      handleSortChoice(targetBin);
    }
  };

  const handlePointerCancel = () => {
    dragStartRef.current = null;
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    setHoveredBin(null);
  };

  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const topScore = sortedTeams[0]?.score ?? 0;
  const winners = sortedTeams.filter((t) => t.score === topScore);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8F5] text-slate-900">
      {/* Clean 3-Zone Top Bar */}
      <header className="w-full bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single text wordmark */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setScreen('TITLE_MENU');
            }}
            className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Pilah Sampah Ceria
          </button>

          {/* Zone 2: Concise navigation or unboxed active progress */}
          {screen === 'PLAYING' ? (
            <div className="hidden md:flex items-center gap-3 text-sm font-semibold text-slate-600 whitespace-nowrap shrink-0">
              {activeTeam ? (
                <span className="font-bold text-slate-900">
                  Giliran: {activeTeam.name}
                </span>
              ) : (
                <span className="font-bold text-slate-900">Mode Latihan</span>
              )}
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                Soal {currentIndex + 1} / {deck.length}
              </span>
              {playMode === 'solo' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums text-emerald-700 font-bold">
                    Skor {soloScore}
                  </span>
                </>
              )}
            </div>
          ) : (
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setScreen('TITLE_MENU');
                }}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  screen === 'TITLE_MENU' ? 'text-emerald-700 underline underline-offset-4' : ''
                }`}
              >
                Beranda
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setScreen('GUIDE');
                }}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  screen === 'GUIDE' ? 'text-emerald-700 underline underline-offset-4' : ''
                }`}
              >
                Kamus Sampah
              </button>
            </nav>
          )}

          {/* Zone 3: Sound / Primary Utility Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundEnabled ? 'Matikan suara game' : 'Nyalakan suara game'}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                  <span className="hidden sm:inline">Suara Nyala</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-500" />
                  <span className="hidden sm:inline">Suara Mati</span>
                </>
              )}
            </button>

            {screen === 'PLAYING' && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setScreen('TITLE_MENU');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Menu</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        {/* SCREEN 1: TITLE MENU */}
        {screen === 'TITLE_MENU' && (
          <section className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
            {/* 2D Schoolyard Illustrated Backdrop with resilient fallback */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50"
              aria-hidden="true"
            >
              {!backdropError && (
                <img
                  src={HERO_BACKDROP_PATH}
                  alt="Ilustrasi 2D halaman sekolah dasar yang asri dan hijau"
                  referrerPolicy="no-referrer"
                  onError={() => setBackdropError(true)}
                  className="w-full h-full object-cover opacity-35"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/80 to-[#F4F8F5]" />
            </div>

            {/* Main Setup Card */}
            <div className="relative z-10 w-full max-w-4xl bg-white/95 border-2 border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <p className="text-sm sm:text-base font-semibold text-emerald-700 mb-2">
                  IPAS Kelas 4 SD · Kelestarian Lingkungan & Pengelolaan Sampah
                </p>
                <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
                  Ayo Pilah Sampah Bersama!
                </h1>
                <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
                  Maju ke depan papan tulis pintar secara bergiliran, pilih atau geser gambar sampah ke tong yang tepat, dan pelajari cara menjaga bumi kita.
                </p>
              </div>

              {/* Classroom Turn & Bin Setup Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Mode Bermain */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h2 className="font-display text-lg font-bold text-slate-900 mb-3">
                    1. Pilih Mode Bermain
                  </h2>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setPlayMode('teams');
                      }}
                      className={`flex flex-col items-center justify-center gap-1.5 p-4 rounded-2xl border-2 font-bold transition-colors cursor-pointer ${
                        playMode === 'teams'
                          ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Users className="w-6 h-6" />
                      <span>Giliran Tim</span>
                      <span
                        className={`text-xs font-medium ${
                          playMode === 'teams' ? 'text-emerald-100' : 'text-slate-500'
                        }`}
                      >
                        Maju bergantian
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setPlayMode('solo');
                      }}
                      className={`flex flex-col items-center justify-center gap-1.5 p-4 rounded-2xl border-2 font-bold transition-colors cursor-pointer ${
                        playMode === 'solo'
                          ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <User className="w-6 h-6" />
                      <span>Latihan Cepat</span>
                      <span
                        className={`text-xs font-medium ${
                          playMode === 'solo' ? 'text-emerald-100' : 'text-slate-500'
                        }`}
                      >
                        1 pemain / kelas
                      </span>
                    </button>
                  </div>

                  {playMode === 'teams' && (
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-2">
                        Jumlah Tim di Kelas:
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[2, 3, 4].map((count) => (
                          <button
                            key={count}
                            type="button"
                            onClick={() => {
                              soundEngine.playClick();
                              setTeamCount(count);
                            }}
                            className={`py-2.5 px-3 rounded-xl border-2 font-bold text-sm transition-colors cursor-pointer ${
                              teamCount === count
                                ? 'bg-slate-900 border-slate-900 text-white'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {count} Tim
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pilihan Tong Sampah */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h2 className="font-display text-lg font-bold text-slate-900 mb-3">
                    2. Pilih Jenis Tong Sampah
                  </h2>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setBinMode('3bins');
                      }}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-colors cursor-pointer ${
                        binMode === '3bins'
                          ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-display font-bold text-base">
                        3 Tong Lengkap (Rekomendasi Kelas 4)
                      </div>
                      <div
                        className={`text-sm mt-0.5 ${
                          binMode === '3bins' ? 'text-emerald-100' : 'text-slate-500'
                        }`}
                      >
                        Organik · Anorganik · B3 (Berbahaya & Beracun)
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setBinMode('2bins');
                      }}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-colors cursor-pointer ${
                        binMode === '2bins'
                          ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-display font-bold text-base">
                        2 Tong Dasar (Pemanasan)
                      </div>
                      <div
                        className={`text-sm mt-0.5 ${
                          binMode === '2bins' ? 'text-emerald-100' : 'text-slate-500'
                        }`}
                      >
                        Organik (Sisa Alam) · Anorganik (Daur Ulang)
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Primary & Secondary Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={startNewGame}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-display text-xl font-extrabold shadow-md transition-transform cursor-pointer whitespace-nowrap"
                >
                  <Play className="w-6 h-6 fill-current" />
                  Mulai Bermain
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setScreen('GUIDE');
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white border-2 border-slate-300 hover:bg-slate-50 active:scale-[0.98] text-slate-800 font-display text-lg font-bold transition-transform cursor-pointer whitespace-nowrap"
                >
                  <BookOpen className="w-5 h-5 text-emerald-700" />
                  Buka Kamus Sampah
                </button>
              </div>
            </div>
          </section>
        )}

        {/* SCREEN 2: KAMUS SAMPAH */}
        {screen === 'GUIDE' && (
          <WasteGuideView
            onBack={() => setScreen('TITLE_MENU')}
            onStartGame={startNewGame}
          />
        )}

        {/* SCREEN 3: ACTIVE 2D SMARTBOARD GAMEPLAY */}
        {screen === 'PLAYING' && currentItem && (
          <section className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col justify-between gap-4">
            {/* Top Classroom Turn & Score Strip */}
            <div className="space-y-3">
              {/* Mobile/Tablet compact progress */}
              <div className="flex md:hidden items-center justify-between text-sm font-bold text-slate-700">
                <span>
                  {activeTeam ? `Giliran: ${activeTeam.name}` : 'Mode Latihan'}
                </span>
                <span className="font-mono tabular-nums">
                  Soal {currentIndex + 1} / {deck.length}
                </span>
              </div>

              {playMode === 'teams' ? (
                <div
                  className={`grid gap-3 ${
                    teams.length === 2
                      ? 'grid-cols-2'
                      : teams.length === 3
                        ? 'grid-cols-3'
                        : 'grid-cols-2 sm:grid-cols-4'
                  }`}
                >
                  {teams.map((team, idx) => {
                    const isTurn = idx === currentTeamIndex;
                    return (
                      <div
                        key={team.id}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl border-2 transition-all ${
                          isTurn
                            ? `${team.softClass} ring-2 ring-slate-900 shadow-sm`
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold uppercase tracking-wide opacity-80 truncate">
                            {isTurn ? 'Giliran Maju' : 'Menunggu'}
                          </div>
                          <div className="font-display font-extrabold text-base sm:text-lg truncate">
                            {team.name}
                          </div>
                        </div>
                        <div className="font-mono tabular-nums text-2xl font-extrabold pl-2">
                          {team.score}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-3">
                  <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-700">
                    <span className="font-mono tabular-nums font-bold text-slate-900">
                      Soal {currentIndex + 1} dari {deck.length}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Benar: {soloCorrect}</span>
                    {streak >= 2 && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-700 font-bold">
                          Beruntun {streak}x
                        </span>
                      </>
                    )}
                  </div>
                  <div className="font-display text-lg sm:text-xl font-extrabold text-emerald-700 font-mono tabular-nums">
                    Skor: {soloScore}
                  </div>
                </div>
              )}
            </div>

            {/* Center Stage: Either Draggable Waste Card OR Instant Educational Feedback */}
            <div className="relative flex-1 flex flex-col items-center justify-center py-2">
              <ConfettiBurst2D active={confettiActive} />

              {!feedback ? (
                <div className="w-full max-w-xl flex flex-col items-center">
                  <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 text-center mb-3 text-balance">
                    {activeTeam
                      ? `${activeTeam.name}, masukkan sampah ini ke tong yang benar!`
                      : 'Masukkan sampah ini ke tong yang benar!'}
                  </h2>

                  {/* Draggable 2D Waste Item Card */}
                  <div
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerCancel}
                    style={{
                      transform: isDragging
                        ? `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) scale(1.06)`
                        : 'translate3d(0, 0, 0) scale(1)',
                      transition: isDragging
                        ? 'none'
                        : 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className={`relative z-30 select-none touch-none w-full max-w-sm bg-white border-2 border-slate-300 rounded-3xl p-5 sm:p-6 flex flex-col items-center text-center cursor-grab active:cursor-grabbing ${
                      isDragging ? 'shadow-2xl border-emerald-500' : 'shadow-md hover:border-slate-400'
                    }`}
                  >
                    <WasteIllustration
                      id={currentItem.id}
                      className="w-32 h-32 sm:w-40 sm:h-40 pointer-events-none"
                    />
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                      {currentItem.name}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      Geser ke tong sampah, atau ketuk tong di bawah
                    </p>
                  </div>

                  {/* Optional Clue Toggle for Students */}
                  <div className="mt-3 min-h-[44px] flex items-center justify-center">
                    {!showHint ? (
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setShowHint(true);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-amber-50 hover:border-amber-300 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
                      >
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        Butuh Petunjuk?
                      </button>
                    ) : (
                      <div className="px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-sm sm:text-base font-medium text-center max-w-lg animate-pop-in">
                        <span className="font-bold">Petunjuk: </span>
                        {currentItem.shortClue}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Instant Educational Feedback Card */
                <div
                  className={`w-full max-w-3xl rounded-3xl border-2 p-5 sm:p-7 shadow-md animate-pop-in ${
                    feedback.isCorrect
                      ? 'bg-emerald-50 border-emerald-400'
                      : 'bg-rose-50 border-rose-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
                    <div className="flex items-center gap-3">
                      {feedback.isCorrect ? (
                        <CheckCircle2 className="w-10 h-10 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-10 h-10 text-rose-600 shrink-0" />
                      )}
                      <div>
                        <h3
                          className={`font-display text-2xl sm:text-3xl font-extrabold ${
                            feedback.isCorrect ? 'text-emerald-900' : 'text-rose-900'
                          }`}
                        >
                          {feedback.isCorrect
                            ? `Hebat! +${feedback.pointsEarned} Poin`
                            : 'Kurang Tepat!'}
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-slate-700">
                          {currentItem.name} termasuk{' '}
                          <span className="font-extrabold underline">
                            {BINS[currentItem.category].label}
                          </span>
                          {feedback.streakBonus > 0 && ' · Bonus Beruntun +5!'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-display text-lg font-bold shadow-sm transition-transform cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>
                        {currentIndex + 1 >= deck.length
                          ? 'Lihat Hasil Akhir'
                          : 'Soal Berikutnya'}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Educational Info Grid + Reaction Photo */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 mt-4 items-center">
                    <div className="sm:col-span-4 flex flex-col items-center">
                      <div
                        className={`relative w-36 h-40 sm:w-44 sm:h-48 rounded-2xl overflow-hidden border-2 shadow-sm bg-white ${
                          feedback.isCorrect
                            ? 'border-emerald-400'
                            : 'border-rose-400'
                        }`}
                      >
                        <img
                          src={
                            feedback.isCorrect
                              ? CORRECT_REACTION_PHOTO
                              : WRONG_REACTION_PHOTO
                          }
                          alt={
                            feedback.isCorrect
                              ? 'Foto reaksi jawaban benar'
                              : 'Foto reaksi jawaban salah'
                          }
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-8 space-y-3">
                      <div className="flex items-center gap-3 bg-white/80 rounded-2xl p-3 border border-black/10">
                        <WasteIllustration
                          id={currentItem.id}
                          className="w-14 h-14 shrink-0"
                        />
                        <p className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                          {currentItem.explanation}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1.5 text-sm text-slate-700 pt-1">
                        <span className="inline-flex items-center gap-1.5 font-semibold">
                          <Clock className="w-4 h-4 text-slate-600 shrink-0" />
                          Terurai: {currentItem.decompositionTime}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-800">
                          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                          Tips 3R: {currentItem.ecoTip}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Drop Zones: Huge 2D Illustrated Trash Bins */}
            <div
              className={`grid gap-4 sm:gap-6 ${
                activeBins.length === 2 ? 'grid-cols-2 max-w-3xl mx-auto w-full' : 'grid-cols-1 sm:grid-cols-3'
              }`}
            >
              {activeBins.map((cat) => (
                <TrashBin2D
                  key={cat}
                  bin={BINS[cat]}
                  isHovered={hoveredBin === cat}
                  feedbackState={binFeedbackMap[cat]}
                  disabled={Boolean(feedback)}
                  onSelect={handleSortChoice}
                  binRef={(el) => {
                    binRefs.current[cat] = el;
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* SCREEN 4: ROUND SUMMARY / VICTORY */}
        {screen === 'ROUND_SUMMARY' && (
          <section className="flex-1 flex items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-3xl bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm text-center animate-pop-in">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center mb-4">
                <Trophy className="w-10 h-10 text-amber-600" />
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                Permainan Selesai!
              </h2>

              {playMode === 'teams' ? (
                <>
                  <p className="text-lg text-slate-600 mt-2 mb-6">
                    {winners.length === 1
                      ? `Selamat kepada ${winners[0].name} sebagai juara pilah sampah hari ini!`
                      : `Luar biasa! ${winners.map((w) => w.name).join(' & ')} meraih skor tertinggi bersama!`}
                  </p>

                  <div className="space-y-3 text-left mb-8">
                    {sortedTeams.map((team, idx) => (
                      <div
                        key={team.id}
                        className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border-2 ${
                          team.score === topScore
                            ? `${team.softClass} ring-2 ring-amber-400`
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-display text-2xl font-extrabold font-mono tabular-nums w-8 text-center">
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="font-display text-xl font-extrabold">
                              {team.name}
                            </div>
                            <div className="text-sm font-medium opacity-80">
                              Jawaban benar: {team.correctCount} dari {team.totalTurns} giliran
                            </div>
                          </div>
                        </div>
                        <div className="font-display text-3xl font-extrabold font-mono tabular-nums">
                          {team.score}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg text-slate-600 mt-2 mb-6">
                    Hebat! Kamu sudah membantu menjaga kelestarian lingkungan sekolah.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                      <div className="text-sm font-bold text-emerald-800">
                        Total Skor
                      </div>
                      <div className="font-display text-4xl font-extrabold text-emerald-950 font-mono tabular-nums mt-1">
                        {soloScore}
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="text-sm font-bold text-slate-600">
                        Jawaban Benar
                      </div>
                      <div className="font-display text-4xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                        {soloCorrect} / {deck.length}
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                      <div className="text-sm font-bold text-amber-800">
                        Ketepatan
                      </div>
                      <div className="font-display text-4xl font-extrabold text-amber-950 font-mono tabular-nums mt-1">
                        {deck.length > 0
                          ? Math.round((soloCorrect / deck.length) * 100)
                          : 0}
                        %
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={startNewGame}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-display text-lg font-bold shadow-sm transition-transform cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-5 h-5" />
                  Bermain Lagi
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setScreen('GUIDE');
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border-2 border-slate-300 hover:bg-slate-50 text-slate-800 font-display text-lg font-bold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <BookOpen className="w-5 h-5 text-emerald-700" />
                  Kamus Sampah
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setScreen('TITLE_MENU');
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-display text-lg font-bold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Home className="w-5 h-5" />
                  Kembali ke Menu
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
