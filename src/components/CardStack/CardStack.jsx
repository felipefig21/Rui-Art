import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CardStack.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Exit animation configs por card ── */
const EXIT_CONFIGS = [
  { rotateX: 360, rotateY: 0,   curveDir:  1 },  // Card 0: Flip X, curva DIREITA
  { rotateX: 360, rotateY: 360, curveDir: -1 },  // Card 1: Kickflip X+Y, curva ESQUERDA
  { rotateX: 0,   rotateY: 360, curveDir:  1 },  // Card 2: Flip Y (porta), curva DIREITA
  { rotateX: 360, rotateY: 0,   curveDir: -1 },  // Card 3: Flip X, curva ESQUERDA
  { rotateX: 360, rotateY: 360, curveDir:  1 },  // Card 4: Kickflip, curva DIREITA
  { rotateX: 360, rotateY: 0,   curveDir:  1 },  // Card 5: Flip X, curva DIREITA
];

/* Peek: par=ESQUERDA, ímpar=DIREITA */
function getPeekX(activeIndex, peekAmount) {
  return activeIndex % 2 === 0 ? -peekAmount : peekAmount;
}

function getResponsiveValues() {
  const w = window.innerWidth;
  if (w >= 1024) return { peekAmount: 50, curveX: 300, curveY: -260, arcScale: 0.65 };
  if (w >= 768)  return { peekAmount: 40, curveX: 220, curveY: -200, arcScale: 0.7 };
  return { peekAmount: 28, curveX: 140, curveY: -150, arcScale: 0.75 };
}

/* ═══════════════════════════════════════════ */
export default function CardStack({ cards, label = 'Campos de Trabalho' }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const cardRefs = useRef([]);

  const setCardRef = useCallback((el, i) => {
    cardRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const numCards = cards.length;
    if (numCards === 0) return;

    const cardEls = cardRefs.current.filter(Boolean);
    const numTransitions = numCards - 1;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const rv = getResponsiveValues();

      /* ── Estado Inicial (gsap.set, sem animação) ── */
      cardEls.forEach((el, i) => {
        if (i === 0) {
          gsap.set(el, { x: 0, y: 0, opacity: 1, zIndex: 10, rotateX: 0, rotateY: 0, scale: 1, visibility: 'visible' });
        } else if (i === 1) {
          gsap.set(el, { x: getPeekX(0, rv.peekAmount), y: 0, opacity: 1, zIndex: 9, rotateX: 0, rotateY: 0, scale: 0.95, visibility: 'visible' });
        } else {
          gsap.set(el, { x: 0, y: 0, opacity: 0, zIndex: 1, rotateX: 0, rotateY: 0, scale: 0.9, visibility: 'hidden' });
        }
      });

      /* ── Master Timeline (scrub-driven) ── */
      const masterTl = gsap.timeline();

      for (let i = 0; i < numTransitions; i++) {
        const exitIdx = i;
        const enterIdx = i + 1;
        const peekIdx = i + 2 < numCards ? i + 2 : null;
        const config = EXIT_CONFIGS[exitIdx % EXIT_CONFIGS.length];

        // Posição base deste segmento na timeline
        const pos = i;

        // Peek X do card que está entrando (ele era o peek do segmento anterior)
        const enterFromPeekX = i === 0
          ? getPeekX(0, rv.peekAmount)                 // Card 1 começa como peek do card 0
          : getPeekX(exitIdx, rv.peekAmount);           // Peek calculado pelo card anterior

        const exitEl = cardEls[exitIdx];
        const enterEl = cardEls[enterIdx];

        if (prefersReduced) {
          /* ── Modo reduzido: fade simples ── */
          masterTl.fromTo(exitEl,
            { opacity: 1 },
            { opacity: 0, visibility: 'hidden', duration: 0.5, ease: 'power2.inOut', immediateRender: false },
            pos
          );
          masterTl.fromTo(enterEl,
            { x: enterFromPeekX, opacity: 1, scale: 0.95 },
            { x: 0, opacity: 1, scale: 1, zIndex: 10, duration: 0.5, ease: 'power2.inOut', immediateRender: false },
            pos
          );
        } else {
          /*
           * ANIMAÇÃO DE SAÍDA — 4 fases de arco visível
           * O card sobe, curva pelo ar POR CIMA da pilha,
           * e desce suavemente atrás dela.
           * Cada fase = 0.25 da duração do segmento (1.0 total)
           */

          const cX = config.curveDir * rv.curveX;
          const halfRotX = config.rotateX * 0.5;
          const halfRotY = config.rotateY * 0.5;

          /* Fase 1 (0-0.25): Levanta do centro — começa a subir e rodar */
          masterTl.fromTo(exitEl,
            { x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1, zIndex: 20, opacity: 1, visibility: 'visible' },
            {
              x: cX * 0.4, y: rv.curveY * 0.6,
              rotateX: halfRotX * 0.4, rotateY: halfRotY * 0.4,
              scale: 0.85, opacity: 1,
              duration: 0.25, ease: 'power2.in', immediateRender: false,
            },
            pos
          );

          /* Fase 2 (0.25-0.5): Pico do arco — máxima altura, passando por cima */
          masterTl.to(exitEl, {
            x: cX * 0.9, y: rv.curveY,
            rotateX: halfRotX, rotateY: halfRotY,
            scale: 0.75, opacity: 1,
            duration: 0.25, ease: 'none',
          }, pos + 0.25);

          /* Fase 3 (0.5-0.75): Descendo do outro lado — voltando ao centro */
          masterTl.to(exitEl, {
            x: cX * 0.3, y: rv.curveY * 0.3,
            rotateX: config.rotateX * 0.8, rotateY: config.rotateY * 0.8,
            scale: 0.8, opacity: 0.7, zIndex: 1,
            duration: 0.25, ease: 'none',
          }, pos + 0.5);

          /* Fase 4 (0.75-1.0): Aterrissa suavemente atrás da pilha */
          masterTl.to(exitEl, {
            x: 0, y: 0,
            rotateX: config.rotateX, rotateY: config.rotateY,
            scale: 0.88, opacity: 0, visibility: 'hidden',
            duration: 0.25, ease: 'power2.out',
          }, pos + 0.75);

          /* ── Card entrando: peek → centro (suave, acompanha o arco) ── */
          masterTl.fromTo(enterEl,
            { x: enterFromPeekX, y: 0, scale: 0.95, zIndex: 9, opacity: 1, visibility: 'visible' },
            {
              x: 0, y: 0, scale: 1, zIndex: 10, opacity: 1, visibility: 'visible',
              duration: 1, ease: 'power3.inOut', immediateRender: false,
            },
            pos
          );

          /* ── Linhas decorativas ── */
          const enterAccent = enterEl.querySelector('.card-stack__card-accent');
          const exitAccent = exitEl.querySelector('.card-stack__card-accent');
          if (enterAccent) {
            masterTl.fromTo(enterAccent,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.6, ease: 'power3.out', immediateRender: false },
              pos + 0.4
            );
          }
          if (exitAccent) {
            masterTl.to(exitAccent, { scaleX: 0, duration: 0.3 }, pos);
          }
        }

        /* ── Novo peek aparece (se existir) ── */
        if (peekIdx !== null) {
          const peekEl = cardEls[peekIdx];
          const newPeekX = getPeekX(enterIdx, rv.peekAmount);
          masterTl.fromTo(peekEl,
            { x: 0, y: 0, opacity: 0, visibility: 'hidden', rotateX: 0, rotateY: 0, scale: 0.9 },
            {
              x: newPeekX, y: 0, scale: 0.95, zIndex: 9, opacity: 1, visibility: 'visible',
              duration: 0.7, ease: 'power3.inOut', immediateRender: false,
            },
            pos + 0.3
          );
        }

        // Label para snap
        masterTl.addLabel('card' + enterIdx, pos + 1);
      }

      // Label inicial
      masterTl.addLabel('card0', 0);

      /* ── Counter update via onUpdate ── */
      const counterEl = sectionRef.current?.querySelector('.card-stack__counter-current');
      let lastStep = 0;

      /* ── ScrollTrigger: pin + scrub + snap ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        animation: masterTl,
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        start: 'top top',
        end: `+=${numTransitions * 100}%`,
        snap: {
          snapTo: 1 / numTransitions,
          duration: { min: 0.4, max: 1 },
          delay: 0.1,
          ease: 'power3.inOut',
        },
        onUpdate: (self) => {
          const step = Math.min(
            Math.round(self.progress * numTransitions),
            numTransitions
          );
          if (step !== lastStep) {
            lastStep = step;
            if (counterEl) {
              counterEl.textContent = String(step + 1).padStart(2, '0');
            }
          }
        },
      });

      /* ── Reset quando sai da viewport (troca de rota) ── */
      const intersectionObs = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) {
              // Reseta a timeline para o início
              masterTl.progress(0);
              lastStep = 0;
              if (counterEl) counterEl.textContent = '01';
            }
          });
        },
        { threshold: 0 }
      );
      if (sectionRef.current) intersectionObs.observe(sectionRef.current);

      // Cleanup do IntersectionObserver
      return () => {
        intersectionObs.disconnect();
      };

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [cards]);

  return (
    <div className="card-stack" ref={sectionRef}>

      {/* Header overlay */}
      <div className="card-stack__header">
        <div className="card-stack__label">
          <span className="card-stack__label-line" />
          <span>{label}</span>
        </div>
        <span className="card-stack__header-count">{cards.length} disciplinas</span>
      </div>

      {/* Counter */}
      <div className="card-stack__counter" aria-live="polite">
        <span className="card-stack__counter-current">01</span>
        <span> / {String(cards.length).padStart(2, '0')}</span>
      </div>

      <div className="card-stack__viewport" ref={viewportRef}>
        {cards.map((card, i) => (
          <div
            key={card.id || i}
            className="card-stack__card"
            ref={(el) => setCardRef(el, i)}
            role="group"
            aria-label={`Card ${i + 1}: ${card.title || ''}`}
          >
            <div className="card-stack__card-inner">
              <div className="card-stack__card-image-wrap">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title || `Card ${i + 1}`}
                    className="card-stack__card-image"
                    loading="lazy"
                    style={card.objectFit ? { objectFit: card.objectFit } : undefined}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e0e0e0, #ccc)' }} aria-hidden="true" />
                )}
              </div>
              <div className="card-stack__card-body">
                {card.title && <h3 className="card-stack__card-title">{card.title}</h3>}
                {card.description && <p className="card-stack__card-desc">{card.description}</p>}
              </div>
              <div className="card-stack__card-accent" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>

      <div className="card-stack__scroll-hint" aria-hidden="true">
        <div className="card-stack__scroll-dot" />
        <span>Scroll</span>
      </div>
    </div>
  );
}
