import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from "motion/react";
import './Process.css';
import videoThumbnail from '../../assets/video_thumbnail.jpg';

const PlayPauseIcon = ({ isPlaying }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    {isPlaying ? (
      <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
    ) : (
      <path d="M8 5v14l11-7z" />
    )}
  </svg>
);

const RewindIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.5 3C7.81 3 4.02 6.42 3.15 10.8L1 9v6h6l-2.78-2.78C5.14 8.27 8.38 5 12.5 5c4.14 0 7.5 3.36 7.5 7.5S16.64 20 12.5 20c-2.9 0-5.42-1.65-6.68-4.07l-1.78.9C5.55 19.68 8.77 22 12.5 22c5.52 0 9.5-4.48 9.5-9.5S18.02 3 12.5 3z" />
    <text x="10" y="15.5" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="currentColor">10</text>
  </svg>
);

const ForwardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.5 3c4.69 0 8.48 3.42 9.35 7.8L23 9v6h-6l2.78-2.78C18.86 8.27 15.62 5 11.5 5 7.36 5 4 8.36 4 12.5S7.36 20 11.5 20c2.9 0 5.42-1.65 6.68-4.07l1.78.9C18.45 19.68 15.23 22 11.5 22 5.98 22 2 17.52 2 12.5S5.98 3 11.5 3z" />
    <text x="14" y="15.5" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="currentColor">10</text>
  </svg>
);

// Formata segundos para MM:SS
const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

function Process() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [timeDisplay, setTimeDisplay] = useState({ current: '0:00', total: '0:00' });
  
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const durationRef = useRef(0);
  
  // Refs para manipulação direta do DOM (performance)
  const progressRef = useRef(null);
  const knobRef = useRef(null);
  const tooltipRef = useRef(null);
  const timelineRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Atualiza a barra de progresso via DOM direto (sem re-render)
  const updateProgressBar = useCallback((fraction) => {
    const percent = Math.min(100, Math.max(0, fraction * 100));
    if (progressRef.current) {
      progressRef.current.style.width = `${percent}%`;
    }
    if (knobRef.current) {
      knobRef.current.style.left = `${percent}%`;
    }
  }, []);

  // Calcula a fração (0–1) a partir da posição X do mouse/touch na barra
  const getFractionFromEvent = useCallback((e) => {
    if (!timelineRef.current) return 0;
    const rect = timelineRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    return Math.min(1, Math.max(0, x / rect.width));
  }, []);

  // Seek para uma posição baseada na fração
  const seekToFraction = useCallback(async (fraction) => {
    if (!playerRef.current || !durationRef.current) return;
    const newTime = fraction * durationRef.current;
    await playerRef.current.setCurrentTime(newTime);
    updateProgressBar(fraction);
    setTimeDisplay(prev => ({ ...prev, current: formatTime(newTime) }));
  }, [updateProgressBar]);

  // Handlers de drag
  const handleDragStart = useCallback((e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    const fraction = getFractionFromEvent(e);
    updateProgressBar(fraction);
    seekToFraction(fraction);
  }, [getFractionFromEvent, updateProgressBar, seekToFraction]);

  const handleDragMove = useCallback((e) => {
    // Tooltip no hover (sempre ativo)
    if (timelineRef.current && tooltipRef.current) {
      const fraction = getFractionFromEvent(e);
      const time = fraction * durationRef.current;
      const rect = timelineRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const tooltipX = clientX - rect.left;
      
      tooltipRef.current.textContent = formatTime(time);
      tooltipRef.current.style.left = `${tooltipX}px`;
      tooltipRef.current.style.opacity = '1';
    }

    // Drag ativo
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const fraction = getFractionFromEvent(e);
    updateProgressBar(fraction);
    setTimeDisplay(prev => ({ ...prev, current: formatTime(fraction * durationRef.current) }));
  }, [getFractionFromEvent, updateProgressBar]);

  const handleDragEnd = useCallback((e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const fraction = getFractionFromEvent(e.changedTouches ? e.changedTouches[0] : e);
    seekToFraction(fraction);
  }, [getFractionFromEvent, seekToFraction]);

  const handleTimelineLeave = useCallback(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '0';
    }
  }, []);

  // Registra listeners globais para drag (mouse/touch)
  useEffect(() => {
    const handleGlobalMove = (e) => {
      if (isDraggingRef.current) {
        handleDragMove(e);
      }
    };
    const handleGlobalEnd = (e) => {
      if (isDraggingRef.current) {
        handleDragEnd(e);
      }
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleGlobalEnd);
    window.addEventListener('touchmove', handleGlobalMove, { passive: false });
    window.addEventListener('touchend', handleGlobalEnd);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchmove', handleGlobalMove);
      window.removeEventListener('touchend', handleGlobalEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  // Inicializa o player Vimeo
  useEffect(() => {
    let isMounted = true;

    const loadPlayerApi = () => {
      if (window.Vimeo?.Player) {
        return Promise.resolve(window.Vimeo.Player);
      }

      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.async = true;
        script.onload = () => resolve(window.Vimeo?.Player);
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initPlayer = async () => {
      if (!iframeRef.current) return;

      try {
        const Player = await loadPlayerApi();
        if (!Player || !isMounted) return;

        const player = new Player(iframeRef.current);
        playerRef.current = player;

        // Sem background=1, o vídeo carrega pausado no frame 0 naturalmente
        player.on('loaded', async () => {
          if (isMounted) {
            player.setCurrentTime(0);
            player.pause();
            
            // Obtém a duração total
            const dur = await player.getDuration();
            durationRef.current = dur;
            setTimeDisplay({ current: '0:00', total: formatTime(dur) });
            
            setTimeout(() => {
              if (isMounted) {
                setIsLoaded(true);
              }
            }, 800);
          }
        });

        // Atualiza o progresso em tempo real via DOM direto
        player.on('timeupdate', (data) => {
          if (isMounted && !isDraggingRef.current) {
            const fraction = data.percent;
            updateProgressBar(fraction);
            setTimeDisplay(prev => ({ ...prev, current: formatTime(data.seconds) }));
          }
        });

      } catch (error) {
        console.error("Vimeo API Error:", error);
        setIsLoaded(true); // Fallback
      }
    };

    initPlayer();

    return () => {
      isMounted = false;
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [updateProgressBar]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(true);
      setShowThumbnail(false);
    }
  };

  const seekBy = async (seconds) => {
    if (!playerRef.current) return;
    try {
      const currentTime = await playerRef.current.getCurrentTime();
      const duration = await playerRef.current.getDuration();
      const newTime = Math.max(0, Math.min(currentTime + seconds, duration));
      await playerRef.current.setCurrentTime(newTime);
    } catch (error) {
      console.error("Seek error:", error);
    }
  };

  return (
    <section className="process-section">
      <div className="process-container">
        <div className="process-layout">
          <div className="process-video-wrapper group/video">
            <AnimatePresence>
              {!isLoaded && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="process-loading-overlay"
                >
                  <motion.span 
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, letterSpacing: "0.6em" }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    className="process-loading-text"
                  >
                    RuiArt
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showThumbnail && isLoaded && (
                <motion.div
                  key="thumbnail"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="process-thumbnail-overlay"
                >
                  <img
                    src={videoThumbnail}
                    alt="Processo Criativo"
                    className="process-thumbnail-img"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <iframe
              ref={iframeRef}
              src="https://player.vimeo.com/video/1182298186?autoplay=0&loop=1&muted=0&title=0&byline=0&portrait=0&controls=0&transparent=1"
              className={`process-video-iframe ${isLoaded ? 'is-visible' : ''}`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              title="Processo Criativo"
            ></iframe>
            
            {isLoaded && (
              <>
                {/* Barra de timeline */}
                <div 
                  className={`process-timeline ${!isPlaying ? 'is-paused' : ''}`}
                  ref={timelineRef}
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseLeave={handleTimelineLeave}
                >
                  <div className="process-timeline-track" />
                  <div className="process-timeline-progress" ref={progressRef} />
                  <div className="process-timeline-knob" ref={knobRef} />
                  <div className="process-timeline-tooltip" ref={tooltipRef}>0:00</div>
                </div>

                {/* Controles */}
                <div className={`process-video-controls ${!isPlaying ? 'is-paused' : ''}`}>
                  <button
                    onClick={() => seekBy(-10)}
                    className="process-control-btn"
                    title="Voltar 10 segundos"
                  >
                    <RewindIcon />
                  </button>

                  <button 
                    onClick={togglePlay}
                    className="process-control-btn process-control-play"
                  >
                    <PlayPauseIcon isPlaying={isPlaying} />
                    {isPlaying ? 'Pausar' : 'Reproduzir'}
                  </button>

                  <button
                    onClick={() => seekBy(10)}
                    className="process-control-btn"
                    title="Avançar 10 segundos"
                  >
                    <ForwardIcon />
                  </button>

                  <span className="process-time-display">
                    {timeDisplay.current} / {timeDisplay.total}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="process-content">
            <h3 className="process-quote">
              "De seis performances em 45 minutos, emerge um vídeo de 2 — síntese de gesto e presença. Realizado na Galeria Candido Portinari (UERJ), o trabalho prolonga as visitas guiadas do Decult, transformando percepção em ..."
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
