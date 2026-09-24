import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Eye, 
  Shield, 
  ArrowRight, 
  Heart, 
  Compass, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Play, 
  Pause, 
  RotateCcw,
  BookOpen,
  FileText
} from 'lucide-react';
import type { ProtocolQuestion } from '../data/questions36';
import { TARGET_PROFILES, COLD_READINGS, VOSS_TECHNIQUES } from '../data/arsenal';
import { sounds } from '../utils/audio';

interface DashboardProps {
  completedQuestions: number[];
  currentIndex: number;
  currentQ: ProtocolQuestion;
  selectedProfileId: string;
  onNavigate: (section: 'dashboard' | 'scenography' | 'questions' | 'arsenal' | 'climax') => void;
  onJumpToQuestion: (index: number) => void;
  onJumpToSet: (setNumber: 1 | 2 | 3) => void;
  timeLeft: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onCopySnippet: (text: string, id: string) => void;
  copiedId: string | null;
}

interface FieldNote {
  id: string;
  text: string;
  timestamp: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  completedQuestions,
  currentIndex,
  currentQ,
  selectedProfileId,
  onNavigate,
  onJumpToQuestion,
  onJumpToSet,
  timeLeft,
  isTimerRunning,
  onToggleTimer,
  onCopySnippet,
  copiedId
}) => {
  // Profil sélectionné
  const selectedProfile = TARGET_PROFILES.find((p) => p.id === selectedProfileId) || TARGET_PROFILES[0];

  // Notes de terrain tactiques (stockées en localStorage)
  const [notes, setNotes] = useState<FieldNote[]>(() => {
    try {
      const saved = localStorage.getItem('shadow_field_notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [newNoteText, setNewNoteText] = useState('');

  // Mode Camouflage (Fake Notes screen)
  const [isCamouflageActive, setIsCamouflageActive] = useState(false);

  // Chronomètre de session (temps total du date)
  const [sessionSeconds, setSessionSeconds] = useState<number>(() => {
    const saved = localStorage.getItem('shadow_session_time');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isSessionRunning, setIsSessionRunning] = useState<boolean>(true);

  useEffect(() => {
    let interval: any = null;
    if (isSessionRunning) {
      interval = setInterval(() => {
        setSessionSeconds((prev) => {
          const next = prev + 1;
          localStorage.setItem('shadow_session_time', next.toString());
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionRunning]);

  const formatSessionTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    sounds.playClick(900);
    const note: FieldNote = {
      id: Date.now().toString(),
      text: newNoteText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [note, ...notes];
    setNotes(updated);
    localStorage.setItem('shadow_field_notes', JSON.stringify(updated));
    setNewNoteText('');
  };

  const handleDeleteNote = (id: string) => {
    sounds.playClick(600);
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem('shadow_field_notes', JSON.stringify(updated));
  };

  // Calcul du score d'intimité émotionnelle
  const completionRatio = completedQuestions.length / 36;
  const intimacyScore = Math.min(100, Math.round(completionRatio * 100));

  // Répartition par pilier psychologique
  const p1 = [1, 4, 8, 9, 11, 12]; // Légèreté & Imaginaire
  const p2 = [13, 14, 15, 16, 20, 21, 24]; // Réciprocité & Valeurs
  const p3 = [17, 23, 27, 31, 35]; // Famille & Passé
  const p4 = [25, 26, 28, 29, 30, 32, 33, 34, 36]; // Vulnérabilité Absolue

  const calcPillarPct = (arr: number[]) => {
    const done = arr.filter((id) => completedQuestions.includes(id)).length;
    return Math.round((done / arr.length) * 100);
  };

  // Cartouche de relance recommandée (selon l'avancement)
  const currentSet = currentQ.set;
  const quickWeapon = currentSet === 1 
    ? COLD_READINGS[0] // Curiosité & Première impression
    : currentSet === 2 
    ? VOSS_TECHNIQUES[1] // Miroir Chris Voss
    : COLD_READINGS[1]; // Paradoxe force/sensibilité

  // Écran de Camouflage (Fake Notes Apple)
  if (isCamouflageActive) {
    return (
      <div 
        onClick={() => setIsCamouflageActive(false)}
        style={{
          minHeight: '80vh',
          padding: '24px 18px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: '24px',
          border: '1px solid var(--border-subtle)',
          cursor: 'pointer',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: '600' }}>
            📒 Notes Personnelles • iCloud
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
            Touchez pour déverrouiller
          </span>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
          To-Do Semaine & Idées
        </h2>
        <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: '2', color: 'var(--text-secondary)' }}>
          <li>Rappel : réserver révision voiture jeudi</li>
          <li>Acheter café en grains & lait d'avoine</li>
          <li>Finir la lecture du chapitre 4</li>
          <li>Envoyer le compte-rendu projet</li>
          <li>Rangement placard entrée</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      {/* 1. Cockpit Header Bar */}
      <div className="glass-panel" style={{
        padding: '16px 20px',
        borderRadius: '20px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="pulse-dot" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: '900', letterSpacing: '0.8px', color: 'var(--accent)' }}>
                SESSION DE RENDEZ-VOUS EN COURS
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: '800',
                padding: '2px 7px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                color: 'var(--accent-emerald)'
              }}>
                LIVE
              </span>
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              Phase actuelle : <strong style={{ color: 'var(--text-primary)' }}>Série {currentSet} ({currentSet === 1 ? 'Brise-glace' : currentSet === 2 ? 'Intimité' : 'Vulnérabilité'})</strong>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Chronomètre Date */}
          <div className="glass-pill" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--text-primary)'
          }}>
            <Clock size={13} color="var(--accent)" />
            <span>{formatSessionTime(sessionSeconds)}</span>
            <button
              onClick={() => setIsSessionRunning(!isSessionRunning)}
              title={isSessionRunning ? 'Mettre en pause' : 'Reprendre'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', display: 'flex' }}
            >
              {isSessionRunning ? <Pause size={11} /> : <Play size={11} />}
            </button>
            <button
              onClick={() => setSessionSeconds(0)}
              title="Remettre à zéro"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', display: 'flex' }}
            >
              <RotateCcw size={11} />
            </button>
          </div>

          {/* Bouton Écran Camouflage */}
          <button
            onClick={() => {
              sounds.playClick(600);
              setIsCamouflageActive(true);
            }}
            title="Masquer l'écran discrètement (Faux bloc-notes)"
            className="glass-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              color: 'var(--text-secondary)'
            }}
          >
            <Shield size={13} color="var(--accent-gold)" />
            <span className="text-desktop-only">Camouflage</span>
          </button>
        </div>
      </div>

      {/* 2. Top Bento Grid (4 Cartes Maîtresses) */}
      <div className="dashboard-bento">
        {/* Card 1: Score d'Intimité */}
        <div className="glass-panel" style={{
          padding: '20px',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-tertiary)', letterSpacing: '0.8px' }}>
                INTIMITÉ ÉMOTIONNELLE
              </span>
              <Heart size={14} color="var(--accent)" />
            </div>
            <div style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              {intimacyScore}%
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {intimacyScore < 30 ? 'Palier 1 : Sécurisation & Rires' :
               intimacyScore < 70 ? 'Palier 2 : Déconstruction du masque' :
               'Palier 3 : Fusion & Vulnérabilité pure'}
            </p>
          </div>

          <div style={{ marginTop: '16px' }}>
            <div style={{ height: '4px', backgroundColor: 'var(--border-subtle)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                width: `${intimacyScore}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #e11d48, #f43f5e)',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>
        </div>

        {/* Card 2: Question en cours & Accès Direct */}
        <div className="glass-panel" style={{
          padding: '20px',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-tertiary)', letterSpacing: '0.8px' }}>
                QUESTION ACTIVE
              </span>
              <span style={{
                fontSize: '10.5px',
                fontWeight: '900',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent)'
              }}>
                Q{currentQ.id}/36
              </span>
            </div>
            <p style={{
              fontSize: '13px',
              fontWeight: '700',
              lineHeight: '1.45',
              color: 'var(--text-primary)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              "{currentQ.question}"
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick(900);
              onJumpToQuestion(currentIndex);
              onNavigate('questions');
            }}
            style={{
              marginTop: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '9px 12px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #e11d48, #be123c)',
              border: 'none',
              color: '#fff',
              fontSize: '11.5px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(225, 29, 72, 0.28)'
            }}
          >
            <span>Ouvrir la question</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Card 3: Profil Greene Actif */}
        <div className="glass-panel" style={{
          padding: '20px',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-tertiary)', letterSpacing: '0.8px' }}>
                PROFIL CIBLE (GREENE)
              </span>
              <BookOpen size={14} color="var(--accent-gold)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>{selectedProfile.avatar}</span>
              <div>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {selectedProfile.name}
                </h4>
                <p style={{ fontSize: '10.5px', color: 'var(--text-tertiary)' }}>
                  {selectedProfile.subtitle}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick(750);
              onNavigate('scenography');
            }}
            className="glass-pill"
            style={{
              marginTop: '14px',
              padding: '8px 10px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: '700',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            Changer le profil →
          </button>
        </div>

        {/* Card 4: Climax 4 Minutes */}
        <div className="glass-panel" style={{
          padding: '20px',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-tertiary)', letterSpacing: '0.8px' }}>
                CLIMAX (REGARD 4 MIN)
              </span>
              <Eye size={14} color="var(--accent)" />
            </div>
            <div style={{
              fontSize: '26px',
              fontWeight: '900',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-primary)'
            }}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
              {isTimerRunning ? '🔥 Épreuve en cours...' : 'Prêt à déclencher au sommet'}
            </p>
          </div>

          <button
            onClick={() => {
              if (!isTimerRunning) onToggleTimer();
              sounds.playGong();
              onNavigate('climax');
            }}
            className="glass-pill"
            style={{
              marginTop: '14px',
              padding: '8px 10px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: '800',
              color: 'var(--accent)',
              borderColor: 'var(--accent-border)',
              backgroundColor: 'var(--accent-light)',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            Lancer le Climax →
          </button>
        </div>
      </div>

      {/* 3. Section 2-Colonnes : Timeline Chronologique + Carnet de Terrain */}
      <div className="dashboard-bento-2col">
        {/* Colonne Gauche : Timeline Interactive des 5 Jalons */}
        <div className="glass-panel" style={{ padding: '22px 20px', borderRadius: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={16} color="var(--accent)" />
              <h3 style={{ fontSize: '15.5px', fontWeight: '800', letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>
                Timeline Stratégique du Date
              </h3>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
              {completedQuestions.length}/36 franchies
            </span>
          </div>

          <div className="timeline-track" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Jalon 1 */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '-28px',
                top: '2px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface)',
                border: '2px solid var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: '900',
                color: 'var(--accent)'
              }}>
                1
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>
                    Avant le Date : Calibrage & Lieu
                  </h4>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    Angle 90°, pont de Capilano & Profiler de cibles
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('scenography')}
                  className="glass-pill"
                  style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10.5px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Voir
                </button>
              </div>
            </div>

            {/* Jalon 2 */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '-28px',
                top: '2px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface)',
                border: completedQuestions.filter((q) => q <= 12).length >= 6 ? '2px solid var(--accent-emerald)' : '2px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: '900',
                color: completedQuestions.filter((q) => q <= 12).length >= 6 ? 'var(--accent-emerald)' : 'var(--text-tertiary)'
              }}>
                2
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>
                      Série I : Brise-glace (Q1-Q12)
                    </h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                      ({completedQuestions.filter((q) => q <= 12).length}/12)
                    </span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    Cadence, légèreté, rires & tests d'imaginaire
                  </p>
                </div>
                <button
                  onClick={() => {
                    onJumpToSet(1);
                    onNavigate('questions');
                  }}
                  className="glass-pill"
                  style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10.5px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Ouvrir
                </button>
              </div>
            </div>

            {/* Jalon 3 */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '-28px',
                top: '2px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface)',
                border: completedQuestions.filter((q) => q > 12 && q <= 24).length >= 6 ? '2px solid var(--accent-emerald)' : '2px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: '900',
                color: completedQuestions.filter((q) => q > 12 && q <= 24).length >= 6 ? 'var(--accent-emerald)' : 'var(--text-tertiary)'
              }}>
                3
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>
                      Série II : Intimité (Q13-Q24)
                    </h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                      ({completedQuestions.filter((q) => q > 12 && q <= 24).length}/12)
                    </span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    Réciprocité, valeurs clés & premiers secrets
                  </p>
                </div>
                <button
                  onClick={() => {
                    onJumpToSet(2);
                    onNavigate('questions');
                  }}
                  className="glass-pill"
                  style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10.5px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Ouvrir
                </button>
              </div>
            </div>

            {/* Jalon 4 */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '-28px',
                top: '2px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface)',
                border: completedQuestions.filter((q) => q > 24).length >= 6 ? '2px solid var(--accent-emerald)' : '2px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: '900',
                color: completedQuestions.filter((q) => q > 24).length >= 6 ? 'var(--accent-emerald)' : 'var(--text-tertiary)'
              }}>
                4
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>
                      Série III : Vulnérabilité (Q25-Q36)
                    </h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                      ({completedQuestions.filter((q) => q > 24).length}/12)
                    </span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    Confessions intimes, fragilités & attachement
                  </p>
                </div>
                <button
                  onClick={() => {
                    onJumpToSet(3);
                    onNavigate('questions');
                  }}
                  className="glass-pill"
                  style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10.5px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Ouvrir
                </button>
              </div>
            </div>

            {/* Jalon 5 */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '-28px',
                top: '2px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface)',
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: '900',
                color: 'var(--accent-gold)'
              }}>
                5
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>
                    Le Climax & Départ (Pic-Fin)
                  </h4>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    4 min de silence visuel & partir au sommet
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('climax')}
                  className="glass-pill"
                  style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10.5px', fontWeight: '700', cursor: 'pointer', color: 'var(--accent-gold)' }}
                >
                  Climax
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Droite : Bloc-Notes Tactique de Terrain (Field Notes) */}
        <div className="glass-panel" style={{ padding: '22px 20px', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} color="var(--accent)" />
              <h3 style={{ fontSize: '15.5px', fontWeight: '800', letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>
                Notes de Terrain Discrètes
              </h3>
            </div>
            <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-tertiary)' }}>
              LOCAL ONLY
            </span>
          </div>

          <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginBottom: '12px', lineHeight: '1.4' }}>
            Notez au vol un détail dit par la cible (peur d'enfance, rêve, nom d'un proche) pour le réutiliser en <strong>Callback</strong>.
          </p>

          {/* Saisie rapide */}
          <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Ex: Passion cachée pour l'astronomie..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: '10px',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0 12px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: 'var(--accent)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Plus size={15} />
            </button>
          </form>

          {/* Liste des notes */}
          <div style={{ flex: 1, maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {notes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 10px', color: 'var(--text-tertiary)', fontSize: '11.5px' }}>
                Aucune note enregistrée pour l'instant.
              </div>
            ) : (
              notes.map((note) => (
                <div key={note.id} style={{
                  padding: '9px 12px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: '500' }}>
                      {note.text}
                    </span>
                    <span style={{ fontSize: '9.5px', color: 'var(--text-tertiary)', display: 'block', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                      {note.timestamp}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    title="Supprimer"
                    style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 4. Répartition Psychologique & Cartouche de Secours */}
      <div className="dashboard-bento-2col" style={{ marginBottom: 0 }}>
        {/* Piliers Thématiques */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '24px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '14px' }}>
            Équilibre des Piliers Psychologiques
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>🎭 Légèreté & Imaginaire</span>
                <span style={{ color: 'var(--text-tertiary)', fontWeight: '700' }}>{calcPillarPct(p1)}%</span>
              </div>
              <div style={{ height: '4px', backgroundColor: 'var(--border-subtle)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${calcPillarPct(p1)}%`, height: '100%', backgroundColor: 'var(--accent)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>🤝 Réciprocité & Valeurs</span>
                <span style={{ color: 'var(--text-tertiary)', fontWeight: '700' }}>{calcPillarPct(p2)}%</span>
              </div>
              <div style={{ height: '4px', backgroundColor: 'var(--border-subtle)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${calcPillarPct(p2)}%`, height: '100%', backgroundColor: 'var(--accent-emerald)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>🧬 Famille & Blessures d'Enfance</span>
                <span style={{ color: 'var(--text-tertiary)', fontWeight: '700' }}>{calcPillarPct(p3)}%</span>
              </div>
              <div style={{ height: '4px', backgroundColor: 'var(--border-subtle)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${calcPillarPct(p3)}%`, height: '100%', backgroundColor: 'var(--accent-gold)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>💔 Vulnérabilité & Amour Absolu</span>
                <span style={{ color: 'var(--text-tertiary)', fontWeight: '700' }}>{calcPillarPct(p4)}%</span>
              </div>
              <div style={{ height: '4px', backgroundColor: 'var(--border-subtle)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${calcPillarPct(p4)}%`, height: '100%', backgroundColor: '#ec4899' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Cartouche Rapide 1-Click */}
        <div className="glass-panel" style={{
          padding: '20px',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '10.5px', fontWeight: '900', color: 'var(--accent)', letterSpacing: '0.8px' }}>
                ⚡ CARTOUCHE DE RELANCE RECOMMANDÉE
              </span>
              <button
                onClick={() => onCopySnippet(
                  'phrase' in quickWeapon ? quickWeapon.phrase : quickWeapon.script,
                  quickWeapon.id
                )}
                style={{
                  background: 'none',
                  border: 'none',
                  color: copiedId === quickWeapon.id ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {copiedId === quickWeapon.id ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedId === quickWeapon.id ? 'Copié' : 'Copier'}</span>
              </button>
            </div>

            <p style={{
              fontSize: '13px',
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: '1.5',
              marginBottom: '10px'
            }}>
              "{ 'phrase' in quickWeapon ? quickWeapon.phrase : quickWeapon.script }"
            </p>

            <span style={{ fontSize: '10.5px', color: 'var(--text-tertiary)' }}>
              🎯 Impact : {'psychologicalImpact' in quickWeapon ? quickWeapon.psychologicalImpact : quickWeapon.context}
            </span>
          </div>

          <button
            onClick={() => onNavigate('arsenal')}
            className="glass-pill"
            style={{
              marginTop: '12px',
              padding: '8px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: '700',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            Consulter tout l'Arsenal →
          </button>
        </div>
      </div>
    </div>
  );
};
