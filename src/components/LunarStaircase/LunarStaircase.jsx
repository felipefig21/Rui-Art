import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './LunarStaircase.css';

const SECTIONS = [
  { word: 'Obras Ambientadas' },
  { word: 'Módulos Digitais' },
  { word: 'Fotografias P&B' },
  { word: 'Fotografias em Cor' },
  { word: 'Superfícies e Texturas' },
];

const X_STEP = 35;    
const Y_STEP = 65;    
const WORD_H = 45;    
const STAGGER = 0.42;

const romanIndices = ["I", "II", "III", "IV", "V"];

function LunarStaircase() {
  const stageRef = useRef(null);
  const wordsRef = useRef([]);
  const shadowsRef = useRef([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Cálculo da largura total da escada (distância horizontal do primeiro ao último ponto)
  const totalWidthSpan = (SECTIONS.length - 1) * X_STEP;

  useEffect(() => {
    const stage = stageRef.current;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setTimeout(runAnimation, 260);
          observer.disconnect();
        }
      });
    }, { threshold: 0.18 });

    observer.observe(stage);

    function runAnimation() {
      SECTIONS.forEach((_, i) => {
        const el = wordsRef.current[i];
        const shadow = shadowsRef.current[i];
        const delay = i * STAGGER;
        const finalTop = i * Y_STEP;

        gsap.fromTo(el,
          { x: -95, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.05,
            ease: 'power1.out',
            delay,
          }
        );

        gsap.fromTo(el,
          { y: -420 },
          {
            y: 0,
            duration: 1.7,
            ease: 'bounce.out',
            delay,
            onUpdate() {
              const currentY = gsap.getProperty(el, 'y');
              const currentBottom = finalTop + currentY + WORD_H + 30;
              const stageHeight = parseFloat(stage.style.height) || 0;
              if (currentBottom > stageHeight) {
                stage.style.height = `${currentBottom}px`;
              }
            },
            onComplete() {
              gsap.timeline()
                .to(el, { scaleY: 0.82, scaleX: 1.10, duration: 0.13, ease: 'power2.in' })
                .to(el, { scaleY: 1.06, scaleX: 0.95, duration: 0.20, ease: 'power1.out' })
                .to(el, { scaleY: 1.00, scaleX: 1.00, duration: 0.50, ease: 'elastic.out(1, 0.3)' });

              gsap.to(shadow, { opacity: 0.15, duration: 0.55 });
              el.classList.add('landed');
            }
          }
        );
      });
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div id="stage" ref={stageRef}>
      {SECTIONS.map((section, i) => {
        // Cálculo centralizado: 50% da largura - (largura_da_escada + largura_estimada_palavra) / 2
        // Subtraímos 130px extras para compensar a largura média das palavras
        const leftPos = `calc(50% - ${totalWidthSpan / 2}px - 130px + ${i * X_STEP}px)`;
        const finalTop = i * Y_STEP;
        const zIndex = 30 - i * 5;

        return (
          <div key={i}>
            <div
              ref={el => shadowsRef.current[i] = el}
              className="word-shadow"
              style={{
                left: `calc(${leftPos} + 10px)`,
                top: `${finalTop + WORD_H}px`,
                background: '#111111',
              }}
            />
            <div
              ref={el => wordsRef.current[i] = el}
              className="word-el"
              style={{
                left: leftPos,
                top: `${finalTop}px`,
                zIndex,
                color: '#111111',
              }}
            >
              <span className="word-index">{romanIndices[i]}</span>
              <span className="word-text">{section.word}</span>
              <div className="word-stroke" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LunarStaircase;
