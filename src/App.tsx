import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Eye, 
  EyeOff, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Heart, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Compass, 
  CheckCircle2, 
  Command,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Search,
  Zap,
  ShieldAlert,
  Smile,
  HelpCircle,
  Sun,
  Moon,
  Sparkles,
  BookOpen,
  Radio,
  MapPin,
  Download,
  Share2,
  LayoutDashboard
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUESTIONS_36, EYE_CONTACT_EXERCISE } from './data/questions36';
import type { ProtocolQuestion } from './data/questions36';
import { TARGET_PROFILES, SCENOGRAPHY_RULES, COLD_READINGS, VOSS_TECHNIQUES, PEAK_END_RULE } from './data/arsenal';
import { sounds } from './utils/audio';
import { Dashboard } from './components/Dashboard';

type MainSection = 'dashboard' | 'scenography' | 'questions' | 'arsenal' | 'climax';

export default function App() {
  // Thème Light par défaut (Apple / OpenRouter)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('shadow_theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  // Section Principale Étenche
  const [currentSection, setCurrentSection] = useState<MainSection>('dashboard');

  // Protocole 36 Questions
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInsight, setShowInsight] = useState(false);
  const [activeInsightTab, setActiveInsightTab] = useState<'diagnostic' | 'signals' | 'script' | 'simulator'>('diagnostic');
  const [simulatedReaction, setSimulatedReaction] = useState<'evasive' | 'receptive' | 'guarded' | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  // Profiler Greene
  const [selectedProfileId, setSelectedProfileId] = useState<string>('idealist');

  // Arsenal Verbal
  const [activeArsenalTab, setActiveArsenalTab] = useState<'coldReading' | 'voss'>('coldReading');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Command Palette & Focus Mode
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isZenMode, setIsZenMode] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.getMuted());

  // Minuteur 4 Minutes
  const [timeLeft, setTimeLeft] = useState(EYE_CONTACT_EXERCISE.durationSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // PWA Installation
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);

  // Spotlight Effect
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });

  const currentQ: ProtocolQuestion = QUESTIONS_36[currentIndex];
  const selectedProfile = TARGET_PROFILES.find((p) => p.id === selectedProfileId) || TARGET_PROFILES[0];

  // Synchronisation du thème dans le DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('shadow_theme', theme);
  }, [theme]);

  // Détection PWA & Installation
  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    sounds.playClick(850);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    } else {
      setShowPwaModal(true);
    }
  };

  const toggleTheme = () => {
    sounds.playClick(theme === 'light' ? 950 : 700);
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Minuteur Climax
  useEffect(() => {
    let timer: any = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      sounds.playGong();
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#e11d48', '#f43f5e', '#fb7185', '#38bdf8', '#ffffff']
      });
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS_36.length - 1) {
      sounds.playClick(900);
      setCurrentIndex((prev) => prev + 1);
      setShowInsight(false);
      setSimulatedReaction(null);
    } else {
      sounds.playGong();
      setCurrentSection('climax');
    }
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      sounds.playClick(750);
      setCurrentIndex((prev) => prev - 1);
      setShowInsight(false);
      setSimulatedReaction(null);
    }
  }, [currentIndex]);

  const toggleInsight = useCallback(() => {
    setShowInsight((prev) => {
      const next = !prev;
      if (next) sounds.playReveal();
      else sounds.playClick(600);
      return next;
    });
  }, []);

  // Raccourcis Clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowCommandPalette((prev) => !prev);
        return;
      }
      if (showCommandPalette) {
        if (e.key === 'Escape') setShowCommandPalette(false);
        return;
      }
      if (currentSection === 'questions') {
        if (e.key === 'ArrowRight') {
          handleNext();
        } else if (e.key === 'ArrowLeft') {
          handlePrev();
        } else if (e.key === ' ') {
          e.preventDefault();
          toggleInsight();
        }
      }
      if (e.key.toLowerCase() === 'f') {
        setIsZenMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, toggleInsight, showCommandPalette, currentSection]);

  const jumpToQuestion = (index: number) => {
    sounds.playClick(850);
    setCurrentIndex(index);
    setShowInsight(false);
    setSimulatedReaction(null);
    setCurrentSection('questions');
    setShowCommandPalette(false);
  };

  const jumpToSet = (setNumber: 1 | 2 | 3) => {
    const idx = QUESTIONS_36.findIndex((q) => q.set === setNumber);
    if (idx !== -1) {
      jumpToQuestion(idx);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    sounds.playClick(1100);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playClick(800);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((currentIndex + 1) / QUESTIONS_36.length) * 100;
  const filteredQuestions = QUESTIONS_36.filter((q) => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.id.toString() === searchQuery.trim()
  );

  return (
    <div className="container-responsive" style={{
      maxWidth: isZenMode ? '820px' : '980px',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {/* 1. Dynamic Top Bar */}
      {!isZenMode && (
        <header className="header-responsive">
          {/* Brand & Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(225, 29, 72, 0.28)',
              flexShrink: 0
            }}>
              <Zap size={18} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '17px', fontWeight: '800', letterSpacing: '-0.4px', color: 'var(--text-primary)' }}>
                  L'OMBRE
                </h1>
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: '800',
                  padding: '2px 7px',
                  borderRadius: '20px',
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  border: '1px solid var(--accent-border)',
                  letterSpacing: '0.8px'
                }}>
                  ÉDITION STRATÈGE
                </span>
              </div>
              <p className="text-desktop-only" style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                Psychologie de la séduction & dynamiques relationnelles
              </p>
            </div>
          </div>

          {/* Quick Actions (Theme Switcher, Audio, Zen, Palette) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'nowrap' }}>
            <button
              onClick={toggleTheme}
              title={theme === 'light' ? "Passer en mode sombre (Dark)" : "Passer en mode clair (Light)"}
              className="glass-pill"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            <button
              onClick={toggleSound}
              title={isMuted ? "Activer les retours sonores" : "Couper le son"}
              className="glass-pill"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isMuted ? 'var(--text-tertiary)' : 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            <button
              onClick={() => setIsZenMode(true)}
              title="Mode Plein Écran Discret (Touche F)"
              className="glass-pill"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <Maximize2 size={15} />
            </button>

            {!isInstalled && (
              <button
                onClick={handleInstallClick}
                title="Installer comme application native (PWA)"
                className="glass-pill"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '0 9px',
                  height: '36px',
                  borderRadius: '10px',
                  color: 'var(--accent)',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  borderColor: 'var(--accent-border)',
                  backgroundColor: 'var(--accent-light)'
                }}
              >
                <Download size={13} />
                <span className="text-desktop-only">App</span>
              </button>
            )}

            <button
              onClick={() => setShowCommandPalette(true)}
              className="glass-pill"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 10px',
                height: '36px',
                borderRadius: '10px',
                color: 'var(--text-secondary)',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Command size={13} />
              <span>Index</span>
              <kbd className="text-desktop-only" style={{
                fontSize: '9.5px',
                padding: '2px 4px',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-mono)'
              }}>
                ⌘K
              </kbd>
            </button>
          </div>
        </header>
      )}

      {/* 2. LES GRANDES SECTIONS ÉTANCHES DU DATE */}
      {!isZenMode && (
        <nav className="tabs-scroll-container" style={{ marginBottom: '20px' }}>
          <button
            onClick={() => {
              sounds.playClick(900);
              setCurrentSection('dashboard');
            }}
            className="tab-btn-responsive"
            style={{
              backgroundColor: currentSection === 'dashboard' ? 'var(--accent-light)' : 'transparent',
              color: currentSection === 'dashboard' ? 'var(--accent)' : 'var(--text-secondary)',
              boxShadow: currentSection === 'dashboard' ? 'inset 0 0 0 1px var(--accent-border)' : 'none'
            }}
          >
            <LayoutDashboard size={13} />
            <span className="text-desktop-only">Cockpit Stratégique</span>
            <span className="text-mobile-only">Cockpit</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick(750);
              setCurrentSection('scenography');
            }}
            className="tab-btn-responsive"
            style={{
              backgroundColor: currentSection === 'scenography' ? 'var(--accent-light)' : 'transparent',
              color: currentSection === 'scenography' ? 'var(--accent)' : 'var(--text-secondary)',
              boxShadow: currentSection === 'scenography' ? 'inset 0 0 0 1px var(--accent-border)' : 'none'
            }}
          >
            <MapPin size={13} />
            <span className="text-desktop-only">1. Avant : Calibrage</span>
            <span className="text-mobile-only">1. Calibrage</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick(850);
              setCurrentSection('questions');
            }}
            className="tab-btn-responsive"
            style={{
              backgroundColor: currentSection === 'questions' ? 'var(--accent-light)' : 'transparent',
              color: currentSection === 'questions' ? 'var(--accent)' : 'var(--text-secondary)',
              boxShadow: currentSection === 'questions' ? 'inset 0 0 0 1px var(--accent-border)' : 'none'
            }}
          >
            <Sparkles size={13} />
            <span className="text-desktop-only">2. Pendant : 36 Questions</span>
            <span className="text-mobile-only">2. Questions</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick(800);
              setCurrentSection('arsenal');
            }}
            className="tab-btn-responsive"
            style={{
              backgroundColor: currentSection === 'arsenal' ? 'var(--accent-light)' : 'transparent',
              color: currentSection === 'arsenal' ? 'var(--accent)' : 'var(--text-secondary)',
              boxShadow: currentSection === 'arsenal' ? 'inset 0 0 0 1px var(--accent-border)' : 'none'
            }}
          >
            <Radio size={13} />
            <span className="text-desktop-only">3. Urgence : Armes</span>
            <span className="text-mobile-only">3. Armes</span>
          </button>

          <button
            onClick={() => {
              sounds.playGong();
              setCurrentSection('climax');
            }}
            className="tab-btn-responsive"
            style={{
              backgroundColor: currentSection === 'climax' ? 'var(--accent-light)' : 'transparent',
              color: currentSection === 'climax' ? 'var(--accent)' : 'var(--text-secondary)',
              boxShadow: currentSection === 'climax' ? 'inset 0 0 0 1px var(--accent-border)' : 'none'
            }}
          >
            <Clock size={13} />
            <span className="text-desktop-only">4. Fin : Climax</span>
            <span className="text-mobile-only">4. Climax</span>
          </button>
        </nav>
      )}

      {/* =========================================================================
          SECTION 0 : COCKPIT STRATÉGIQUE (DASHBOARD MODERNE)
          ========================================================================= */}
      {currentSection === 'dashboard' && (
        <Dashboard
          completedQuestions={completedQuestions}
          currentIndex={currentIndex}
          currentQ={currentQ}
          selectedProfileId={selectedProfileId}
          onNavigate={setCurrentSection}
          onJumpToQuestion={jumpToQuestion}
          onJumpToSet={jumpToSet}
          timeLeft={timeLeft}
          isTimerRunning={isTimerRunning}
          onToggleTimer={() => {
            if (!isTimerRunning) sounds.playClick(1000);
            else sounds.playClick(600);
            setIsTimerRunning(!isTimerRunning);
          }}
          onCopySnippet={(text, id) => copyToClipboard(text, id)}
          copiedId={copiedId}
        />
      )}

      {/* =========================================================================
          SECTION 1 : AVANT LE DATE (SCÉNOGRAPHIE & PROFILER ROBERT GREENE)
          ========================================================================= */}
      {currentSection === 'scenography' && (
        <div className="animate-slide-up">
          {/* A. Les 3 Règles d'Or de l'Ambiance */}
          <div className="glass-panel card-responsive" style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Compass size={16} color="var(--accent)" />
              <h2 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.3px' }}>
                L'Architecture Physique (Dutton & Aron / Capilano)
              </h2>
            </div>

            <div className="responsive-grid-cards">
              {SCENOGRAPHY_RULES.map((rule) => (
                <div key={rule.number} style={{
                  padding: '16px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: '900', color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                    RÈGLE {rule.number}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '800', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    {rule.title}
                  </div>
                  <div style={{ fontSize: '12px', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                    {rule.execution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* B. Le Profiler de Cibles Robert Greene */}
          <div className="glass-panel card-responsive">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} color="var(--accent)" />
                <h2 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.3px' }}>
                  Le Profiler de Cible (L'Art de la Séduction – Greene)
                </h2>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                Sélectionnez le tempérament en face de vous :
              </span>
            </div>

            {/* Sélecteur de profils */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
              {TARGET_PROFILES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    sounds.playClick(800);
                    setSelectedProfileId(p.id);
                  }}
                  className="glass-pill"
                  style={{
                    padding: '10px 14px',
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    border: selectedProfileId === p.id ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                    backgroundColor: selectedProfileId === p.id ? 'var(--accent-light)' : 'var(--bg-subtle)',
                    color: selectedProfileId === p.id ? 'var(--accent)' : 'var(--text-secondary)',
                    fontWeight: selectedProfileId === p.id ? '800' : '600',
                    fontSize: '12px'
                  }}
                >
                  <span>{p.avatar}</span>
                  <span>{p.name}</span>
                </button>
              ))}
            </div>

            {/* Carte Diagnostic du profil sélectionné */}
            <div style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>{selectedProfile.avatar}</span>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {selectedProfile.name}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    {selectedProfile.subtitle}
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.8px', color: 'var(--text-tertiary)' }}>
                  INDICES CARACTÉRISTIQUES :
                </span>
                <ul style={{ marginTop: '6px', paddingLeft: '18px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {selectedProfile.traits.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '12px',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <div>
                  <span style={{ fontSize: '10.5px', fontWeight: '900', color: 'var(--accent)', letterSpacing: '0.8px' }}>
                    ⚠️ PIÈGE MORTEL À ÉVITER :
                  </span>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', marginTop: '4px', lineHeight: '1.5' }}>
                    {selectedProfile.trapToAvoid}
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: '10.5px', fontWeight: '900', color: 'var(--accent-emerald)', letterSpacing: '0.8px' }}>
                    🛡️ POSTURE STRATÉGIQUE CONSEILLÉE :
                  </span>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', marginTop: '4px', lineHeight: '1.5' }}>
                    {selectedProfile.recommendedPosture}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  Questions du Protocole 36 à privilégier pour elle :
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {selectedProfile.priorityQuestions.map((qId) => (
                    <button
                      key={qId}
                      onClick={() => jumpToQuestion(qId - 1)}
                      className="glass-pill"
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        color: 'var(--accent)',
                        borderColor: 'var(--accent-border)'
                      }}
                    >
                      Q{qId} →
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 2 : PENDANT LE DATE (LE PROTOCOLE DES 36 QUESTIONS PUR & ÉPURÉ)
          ========================================================================= */}
      {currentSection === 'questions' && (
        <div>
          {/* Sous-navigation Séries I, II, III */}
          {!isZenMode && (
            <div style={{ marginBottom: '18px' }}>
              <div className="tabs-scroll-container">
                <button
                  onClick={() => jumpToSet(1)}
                  className="tab-btn-responsive"
                  style={{
                    backgroundColor: currentQ.set === 1 ? 'var(--accent-light)' : 'transparent',
                    color: currentQ.set === 1 ? 'var(--accent)' : 'var(--text-secondary)',
                    boxShadow: currentQ.set === 1 ? 'inset 0 0 0 1px var(--accent-border)' : 'none'
                  }}
                >
                  <Compass size={13} />
                  <span className="text-desktop-only">Série I : Brise-glace (1-12)</span>
                  <span className="text-mobile-only">Série I (1-12)</span>
                </button>

                <button
                  onClick={() => jumpToSet(2)}
                  className="tab-btn-responsive"
                  style={{
                    backgroundColor: currentQ.set === 2 ? 'var(--accent-light)' : 'transparent',
                    color: currentQ.set === 2 ? 'var(--accent)' : 'var(--text-secondary)',
                    boxShadow: currentQ.set === 2 ? 'inset 0 0 0 1px var(--accent-border)' : 'none'
                  }}
                >
                  <Flame size={13} />
                  <span className="text-desktop-only">Série II : Intimité (13-24)</span>
                  <span className="text-mobile-only">Série II (13-24)</span>
                </button>

                <button
                  onClick={() => jumpToSet(3)}
                  className="tab-btn-responsive"
                  style={{
                    backgroundColor: currentQ.set === 3 ? 'var(--accent-light)' : 'transparent',
                    color: currentQ.set === 3 ? 'var(--accent)' : 'var(--text-secondary)',
                    boxShadow: currentQ.set === 3 ? 'inset 0 0 0 1px var(--accent-border)' : 'none'
                  }}
                >
                  <Heart size={13} />
                  <span className="text-desktop-only">Série III : Vulnérabilité (25-36)</span>
                  <span className="text-mobile-only">Série III (25-36)</span>
                </button>
              </div>

              {/* Jauge fine */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ flex: 1, height: '3px', backgroundColor: 'var(--border-subtle)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${progressPercentage}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #e11d48, #f43f5e)',
                    transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }} />
                </div>
                <span style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                  {currentQ.id.toString().padStart(2, '0')}/36
                </span>
              </div>
            </div>
          )}

          {/* Spotlight Card */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass-panel spotlight-card card-responsive"
            style={{ position: 'relative' }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              background: `radial-gradient(550px circle at ${spotlightPos.x}px ${spotlightPos.y}px, var(--spotlight-glow), transparent 45%)`,
              opacity: spotlightPos.opacity,
              transition: 'opacity 0.3s ease'
            }} />

            {/* Header de la Carte */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '900',
                  color: 'var(--accent)',
                  letterSpacing: '1px',
                  backgroundColor: 'var(--accent-light)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1px solid var(--accent-border)'
                }}>
                  SÉRIE {currentQ.set} • Q{currentQ.id}
                </span>

                <span style={{
                  fontSize: '11.5px',
                  color: 'var(--text-secondary)',
                  fontWeight: '500',
                  fontStyle: 'italic'
                }}>
                  {currentQ.category}
                </span>
              </div>

              <button
                onClick={() => {
                  sounds.playClick(1000);
                  setCompletedQuestions((prev) =>
                    prev.includes(currentQ.id) ? prev.filter((i) => i !== currentQ.id) : [...prev, currentQ.id]
                  );
                }}
                className="glass-pill"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '5px 10px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  color: completedQuestions.includes(currentQ.id) ? 'var(--accent-emerald)' : 'var(--text-tertiary)',
                  borderColor: completedQuestions.includes(currentQ.id) ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-subtle)'
                }}
              >
                <CheckCircle2 size={13} />
                <span>{completedQuestions.includes(currentQ.id) ? 'Posée' : 'À poser'}</span>
              </button>
            </div>

            {/* Question Text */}
            <h2 className="question-text-responsive">
              "{currentQ.question}"
            </h2>

            {/* Bouton Révélation de l'Ombre */}
            <button
              onClick={toggleInsight}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                borderRadius: '14px',
                border: showInsight ? '1px solid var(--accent-border)' : '1px solid var(--border-subtle)',
                backgroundColor: showInsight ? 'var(--accent-light)' : 'var(--bg-subtle)',
                color: showInsight ? 'var(--accent)' : 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '0.8px',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: showInsight ? '0 0 25px var(--accent-light)' : 'none'
              }}
            >
              {showInsight ? <EyeOff size={15} /> : <Eye size={15} />}
              <span className="text-desktop-only">{showInsight ? "MASQUER L'ANALYSE" : "DÉVOILER LE DÉCRYPTAGE TACTIQUE (ESPACE)"}</span>
              <span className="text-mobile-only">{showInsight ? "MASQUER L'ANALYSE" : "DÉVOILER LE DÉCRYPTAGE"}</span>
            </button>

            {/* Tiroir Tactique Déroulé */}
            {showInsight && (
              <div className="animate-slide-up" style={{
                marginTop: '22px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <div className="insight-tabs-responsive">
                  <button
                    onClick={() => {
                      sounds.playClick(700);
                      setActiveInsightTab('diagnostic');
                    }}
                    className="insight-tab-btn"
                    style={{
                      backgroundColor: activeInsightTab === 'diagnostic' ? 'var(--bg-card)' : 'transparent',
                      color: activeInsightTab === 'diagnostic' ? 'var(--text-primary)' : 'var(--text-tertiary)',
                      boxShadow: activeInsightTab === 'diagnostic' ? 'var(--card-shadow)' : 'none'
                    }}
                  >
                    🧠 Diagnostic
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick(700);
                      setActiveInsightTab('signals');
                    }}
                    className="insight-tab-btn"
                    style={{
                      backgroundColor: activeInsightTab === 'signals' ? 'var(--bg-card)' : 'transparent',
                      color: activeInsightTab === 'signals' ? 'var(--text-primary)' : 'var(--text-tertiary)',
                      boxShadow: activeInsightTab === 'signals' ? 'var(--card-shadow)' : 'none'
                    }}
                  >
                    👁️ Signaux
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick(700);
                      setActiveInsightTab('script');
                    }}
                    className="insight-tab-btn"
                    style={{
                      backgroundColor: activeInsightTab === 'script' ? 'var(--accent-light)' : 'transparent',
                      color: activeInsightTab === 'script' ? 'var(--accent)' : 'var(--text-tertiary)'
                    }}
                  >
                    ⚡ Réplique
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick(700);
                      setActiveInsightTab('simulator');
                    }}
                    className="insight-tab-btn"
                    style={{
                      backgroundColor: activeInsightTab === 'simulator' ? 'var(--accent-light)' : 'transparent',
                      color: activeInsightTab === 'simulator' ? 'var(--accent)' : 'var(--text-tertiary)'
                    }}
                  >
                    🎯 Réaction
                  </button>
                </div>

                {activeInsightTab === 'diagnostic' && (
                  <div className="animate-slide-up" style={{ padding: '6px 2px' }}>
                    <h4 style={{ fontSize: '10.5px', fontWeight: '800', letterSpacing: '1px', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
                      SOUS-TEXTE PSYCHOLOGIQUE TESTÉ :
                    </h4>
                    <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', fontWeight: '400' }}>
                      {currentQ.tacticalInsight}
                    </p>
                  </div>
                )}

                {activeInsightTab === 'signals' && (
                  <div className="animate-slide-up" style={{ padding: '6px 2px' }}>
                    <h4 style={{ fontSize: '10.5px', fontWeight: '800', letterSpacing: '1px', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
                      INDICES CORPORELS & LAPSUS À DÉTECTER :
                    </h4>
                    <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', fontWeight: '400' }}>
                      {currentQ.signalsToWatch}
                    </p>
                  </div>
                )}

                {activeInsightTab === 'script' && (
                  <div className="animate-slide-up" style={{
                    backgroundColor: 'var(--accent-light)',
                    border: '1px solid var(--accent-border)',
                    borderRadius: '14px',
                    padding: '16px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ fontSize: '10.5px', fontWeight: '900', letterSpacing: '0.8px', color: 'var(--accent)' }}>
                        VOTRE RÉPLIQUE MAGNÉTIQUE :
                      </span>
                      <button
                        onClick={() => copyToClipboard(currentQ.suggestedAnswer, 'script')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: copiedId === 'script' ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        {copiedId === 'script' ? <Check size={13} /> : <Copy size={13} />}
                        <span>{copiedId === 'script' ? 'Copié !' : 'Copier'}</span>
                      </button>
                    </div>

                    <p style={{
                      fontSize: '14.5px',
                      lineHeight: '1.55',
                      color: 'var(--text-primary)',
                      fontStyle: 'italic',
                      fontWeight: '500'
                    }}>
                      "{currentQ.suggestedAnswer}"
                    </p>
                  </div>
                )}

                {activeInsightTab === 'simulator' && (
                  <div className="animate-slide-up">
                    <h4 style={{ fontSize: '10.5px', fontWeight: '800', letterSpacing: '1px', color: 'var(--text-tertiary)', marginBottom: '10px' }}>
                      COMMENT ELLE RÉAGIT ? (CLIQUEZ POUR AJUSTER) :
                    </h4>
                    <div className="simulator-buttons-responsive">
                      <button
                        onClick={() => {
                          sounds.playClick(650);
                          setSimulatedReaction('evasive');
                        }}
                        style={{
                          padding: '9px 12px',
                          borderRadius: '10px',
                          border: simulatedReaction === 'evasive' ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                          backgroundColor: simulatedReaction === 'evasive' ? 'var(--accent-light)' : 'var(--bg-subtle)',
                          color: simulatedReaction === 'evasive' ? 'var(--accent)' : 'var(--text-secondary)',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <ShieldAlert size={13} style={{ display: 'inline', marginRight: '6px' }} />
                        Elle esquive / blague
                      </button>

                      <button
                        onClick={() => {
                          sounds.playClick(650);
                          setSimulatedReaction('receptive');
                        }}
                        style={{
                          padding: '9px 12px',
                          borderRadius: '10px',
                          border: simulatedReaction === 'receptive' ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                          backgroundColor: simulatedReaction === 'receptive' ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-subtle)',
                          color: simulatedReaction === 'receptive' ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <Smile size={13} style={{ display: 'inline', marginRight: '6px' }} />
                        Elle sourit / s'ouvre
                      </button>

                      <button
                        onClick={() => {
                          sounds.playClick(650);
                          setSimulatedReaction('guarded');
                        }}
                        style={{
                          padding: '9px 12px',
                          borderRadius: '10px',
                          border: simulatedReaction === 'guarded' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                          backgroundColor: simulatedReaction === 'guarded' ? 'rgba(245, 158, 11, 0.12)' : 'var(--bg-subtle)',
                          color: simulatedReaction === 'guarded' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <HelpCircle size={13} style={{ display: 'inline', marginRight: '6px' }} />
                        Elle hésite / bloquée
                      </button>
                    </div>

                    {simulatedReaction && (
                      <div className="animate-slide-up" style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--bg-card)',
                        boxShadow: 'var(--card-shadow)',
                        borderLeft: `3px solid ${
                          simulatedReaction === 'evasive' ? 'var(--accent)' :
                          simulatedReaction === 'receptive' ? 'var(--accent-emerald)' : 'var(--accent-gold)'
                        }`
                      }}>
                        <p style={{ fontSize: '12.5px', lineHeight: '1.5', color: 'var(--text-primary)' }}>
                          {simulatedReaction === 'evasive' && (
                            "⚡ L'Ombre : Elle protège son cadre. Ne relance pas agressivement. Fais un sourire complice, dis : 'Je vois que tu esquives élégamment', et marque 3 secondes de silence sans rien ajouter."
                          )}
                          {simulatedReaction === 'receptive' && (
                            "⚡ L'Ombre : C'est le signal vert. Ancre ce moment avec un regard doux et posé. Valide son ouverture avec une phrase courte : 'J'apprécie ta franchise sur ce point', puis enchaîne."
                          )}
                          {simulatedReaction === 'guarded' && (
                            "⚡ L'Ombre : Elle craint d'être jugée. Normalise immédiatement la vulnérabilité en disant : 'Prends ton temps, c'est une question qui surprend' avec un ton bas et calme."
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Inférieure */}
          <div className="bottom-nav-responsive">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="glass-panel nav-btn-responsive"
              style={{
                color: currentIndex === 0 ? 'var(--text-tertiary)' : 'var(--text-primary)',
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: currentIndex === 0 ? 0.35 : 1
              }}
            >
              <ChevronLeft size={16} />
              <span>Précédente</span>
            </button>

            <span style={{
              fontSize: '11px',
              color: 'var(--text-tertiary)',
              fontWeight: '600',
              fontFamily: 'var(--font-mono)'
            }}>
              Q{currentIndex + 1}/36
            </span>

            <button
              onClick={handleNext}
              className="nav-btn-responsive"
              style={{
                background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
                border: 'none',
                color: '#fff',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(225, 29, 72, 0.3)',
                transition: 'transform 0.15s ease'
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <span>{currentIndex === QUESTIONS_36.length - 1 ? 'Épreuve Finale' : 'Suivante'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 3 : EN CAS DE BLOCAGE (ARMES VERBALES : COLD READING & VOSS)
          ========================================================================= */}
      {currentSection === 'arsenal' && (
        <div className="animate-slide-up">
          <div className="glass-panel card-responsive">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>
                  L'Arsenal Verbal d'Intervention Rapide
                </h2>
                <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                  À dégainer discrètement si la conversation ralentit ou pour créer un pic d'impact
                </p>
              </div>

              {/* Toggle sous-onglets Arsenal */}
              <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--bg-subtle)', padding: '3px', borderRadius: '10px', overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                <button
                  onClick={() => {
                    sounds.playClick(750);
                    setActiveArsenalTab('coldReading');
                  }}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: activeArsenalTab === 'coldReading' ? 'var(--bg-card)' : 'transparent',
                    color: activeArsenalTab === 'coldReading' ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    fontWeight: '700',
                    fontSize: '11px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    boxShadow: activeArsenalTab === 'coldReading' ? 'var(--card-shadow)' : 'none'
                  }}
                >
                  🔮 Cold Reading
                </button>

                <button
                  onClick={() => {
                    sounds.playClick(750);
                    setActiveArsenalTab('voss');
                  }}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: activeArsenalTab === 'voss' ? 'var(--bg-card)' : 'transparent',
                    color: activeArsenalTab === 'voss' ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    fontWeight: '700',
                    fontSize: '11px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    boxShadow: activeArsenalTab === 'voss' ? 'var(--card-shadow)' : 'none'
                  }}
                >
                  🎙️ Relances FBI (Voss)
                </button>
              </div>
            </div>

            {/* A. Cold Reading */}
            {activeArsenalTab === 'coldReading' && (
              <div className="responsive-grid-arsenal">
                {COLD_READINGS.map((item) => (
                  <div key={item.id} style={{
                    padding: '18px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent)', letterSpacing: '0.5px' }}>
                          {item.label}
                        </span>
                        <button
                          onClick={() => copyToClipboard(item.phrase, item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: copiedId === item.id ? 'var(--accent-emerald)' : 'var(--text-tertiary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}
                        >
                          {copiedId === item.id ? <Check size={13} /> : <Copy size={13} />}
                          <span>{copiedId === item.id ? 'Copié' : 'Copier'}</span>
                        </button>
                      </div>

                      <p style={{ fontSize: '13.5px', lineHeight: '1.55', color: 'var(--text-primary)', fontStyle: 'italic', marginBottom: '12px' }}>
                        "{item.phrase}"
                      </p>
                    </div>

                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                      ⚡ {item.psychologicalImpact}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* B. Relances Chris Voss */}
            {activeArsenalTab === 'voss' && (
              <div className="responsive-grid-arsenal">
                {VOSS_TECHNIQUES.map((tech) => (
                  <div key={tech.id} style={{
                    padding: '18px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent)', letterSpacing: '0.5px' }}>
                          {tech.name}
                        </span>
                        <button
                          onClick={() => copyToClipboard(tech.script, tech.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: copiedId === tech.id ? 'var(--accent-emerald)' : 'var(--text-tertiary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}
                        >
                          {copiedId === tech.id ? <Check size={13} /> : <Copy size={13} />}
                          <span>{copiedId === tech.id ? 'Copié' : 'Copier'}</span>
                        </button>
                      </div>

                      <p style={{ fontSize: '13.5px', lineHeight: '1.55', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '12px' }}>
                        "{tech.script}"
                      </p>
                    </div>

                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                      🎯 {tech.context}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 4 : FIN DU DATE (LE CLIMAX & LA RÈGLE PIC-FIN)
          ========================================================================= */}
      {currentSection === 'climax' && (
        <div className="animate-slide-up">
          {/* A. L'Épreuve des 4 Minutes */}
          <div className="glass-panel card-responsive" style={{
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '22px'
          }}>
            <h2 style={{ fontSize: 'clamp(22px, 5vw, 30px)', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '10px' }}>
              {EYE_CONTACT_EXERCISE.title}
            </h2>
            <p style={{
              fontSize: '13.5px',
              lineHeight: '1.6',
              color: 'var(--text-secondary)',
              maxWidth: '540px',
              margin: '0 auto 28px'
            }}>
              {EYE_CONTACT_EXERCISE.description}
            </p>

            {/* Horloge Circulaire Respirante */}
            <div className="animate-breathe" style={{
              width: 'clamp(180px, 45vw, 220px)',
              height: 'clamp(180px, 45vw, 220px)',
              borderRadius: '50%',
              background: 'var(--timer-gradient)',
              border: '2px solid var(--accent)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 30px',
              boxShadow: '0 0 45px var(--accent-light)'
            }}>
              <span style={{ fontSize: 'clamp(42px, 10vw, 54px)', fontWeight: '900', letterSpacing: '1px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {formatTimer(timeLeft)}
              </span>
              <span style={{
                fontSize: '9px',
                fontWeight: '900',
                letterSpacing: '1.5px',
                color: 'var(--accent)',
                marginTop: '4px'
              }}>
                SILENCE & CONTACT VISUEL
              </span>
            </div>

            {/* Boutons Minuteur */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  if (!isTimerRunning) sounds.playClick(1000);
                  else sounds.playClick(600);
                  setIsTimerRunning(!isTimerRunning);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  borderRadius: '14px',
                  background: isTimerRunning ? 'var(--text-tertiary)' : 'linear-gradient(135deg, #e11d48, #be123c)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: isTimerRunning ? 'none' : '0 8px 25px rgba(225, 29, 72, 0.35)'
                }}
              >
                {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
                <span>{isTimerRunning ? 'PAUSE' : 'LANCER LES 4 MINUTES'}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick(500);
                  setIsTimerRunning(false);
                  setTimeLeft(EYE_CONTACT_EXERCISE.durationSeconds);
                }}
                className="glass-pill"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '14px 20px',
                  borderRadius: '14px',
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={15} />
                <span>Réinitialiser</span>
              </button>
            </div>
          </div>

          {/* B. La Règle Pic-Fin (Kahneman) : Savoir Quitter au Climax */}
          <div className="glass-panel card-responsive">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sparkles size={16} color="var(--accent)" />
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
                {PEAK_END_RULE.title}
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.5' }}>
              {PEAK_END_RULE.principle}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PEAK_END_RULE.rules.map((rule, idx) => (
                <div key={idx} style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '12.5px',
                  color: 'var(--text-primary)',
                  lineHeight: '1.5',
                  borderLeft: '3px solid var(--accent)'
                }}>
                  {rule}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Command Palette Modal (⌘K / Ctrl+K) */}
      {showCommandPalette && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--modal-overlay)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '20px 14px',
          paddingTop: 'clamp(20px, 8vw, 70px)',
          zIndex: 9999
        }}>
          <div className="glass-panel animate-slide-up" style={{
            width: '100%',
            maxWidth: '620px',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: 'var(--modal-bg)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.2)'
          }}>
            {/* Input de recherche */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 18px',
              borderBottom: '1px solid var(--border-subtle)',
              gap: '10px'
            }}>
              <Search size={16} color="var(--text-tertiary)" />
              <input
                autoFocus
                placeholder="Rechercher une question ou un numéro (ex: 8)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              />
              <button
                onClick={() => setShowCommandPalette(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-tertiary)',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            {/* Liste de résultats */}
            <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '8px' }}>
              {filteredQuestions.map((q) => {
                const isSelected = q.id === currentQ.id;
                const isDone = completedQuestions.includes(q.id);
                const originalIndex = QUESTIONS_36.findIndex((item) => item.id === q.id);

                return (
                  <div
                    key={q.id}
                    onClick={() => jumpToQuestion(originalIndex)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? 'var(--accent-light)' : 'transparent',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10.5px',
                        fontWeight: '800',
                        fontFamily: 'var(--font-mono)',
                        backgroundColor: isDone ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-subtle)',
                        color: isDone ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                        flexShrink: 0
                      }}>
                        {q.id}
                      </span>
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-primary)' }}>
                          {q.question}
                        </div>
                        <div style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                          Série {q.set} • {q.category}
                        </div>
                      </div>
                    </div>

                    {isDone && <CheckCircle2 size={15} color="var(--accent-emerald)" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal Guide Installation PWA */}
      {showPwaModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--modal-overlay)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 16px',
          zIndex: 10000
        }}>
          <div className="glass-panel animate-slide-up" style={{
            width: '100%',
            maxWidth: '460px',
            borderRadius: '24px',
            padding: '26px',
            backgroundColor: 'var(--modal-bg)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowPwaModal(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'none',
                border: 'none',
                color: 'var(--text-tertiary)',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #e11d48, #be123c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(225, 29, 72, 0.35)'
              }}>
                <Zap size={22} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Installer L'Ombre
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                  Application native & 100% hors-ligne
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '800',
                  flexShrink: 0
                }}>1</span>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Sur <strong>iPhone (Safari)</strong> : touchez le bouton <strong>Partager</strong> <Share2 size={13} style={{ display: 'inline', margin: '0 2px' }} /> puis <strong>« Sur l'écran d'accueil »</strong> ➕.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '800',
                  flexShrink: 0
                }}>2</span>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Sur <strong>Android (Chrome)</strong> : appuyez sur le menu ⋮ puis <strong>« Installer l'application »</strong>.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '800',
                  flexShrink: 0
                }}>3</span>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  L'application s'ouvre alors en <strong>plein écran sans barre de navigation</strong> et fonctionne sans connexion internet.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPwaModal(false)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #e11d48, #be123c)',
                border: 'none',
                color: '#fff',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              C'est noté
            </button>
          </div>
        </div>
      )}

      {/* Bouton Quitter Zen Mode */}
      {isZenMode && (
        <button
          onClick={() => setIsZenMode(false)}
          className="glass-pill"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '20px',
            color: 'var(--text-secondary)',
            fontSize: '11px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <Minimize2 size={13} />
          <span>Quitter Focus (F)</span>
        </button>
      )}
    </div>
  );
}
