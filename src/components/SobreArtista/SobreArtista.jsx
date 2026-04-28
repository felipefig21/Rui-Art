import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SobreArtista.css';
import artistImg from '../../assets/timeline/adaf7536-7a42-4b20-aceb-7e3c4632c351.jfif';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    year: "1974",
    label: "Formação",
    desc: "Início nos ateliês temporários com Ivan Serpa e posteriormente no Galpão do MAM, com Luiz Pizarro e Manfredo Souzanetto.",
  },
  {
    year: "1996",
    label: "Aprimoramento",
    desc: "Passagem pelo ateliê de João Magalhães e aulas com Sonia Ebling, Maruja Cachay e Lilian Sampaio.",
  },
  {
    year: "1997",
    label: "Portas Abertas",
    desc: "Participação no Terceiro Santa Teresa Gávea Portas Abertas e ateliê de Cecília Staubli (expressionismo abstrato).",
  },
  {
    year: "2000",
    label: "Exposição",
    desc: "Participação no Primeiro Gávea Portas Abertas.",
  },
  {
    year: "2013",
    label: "Reconhecimento",
    desc: "1.º lugar no Prêmio Cesgranrio – Novos Talentos da Pintura.",
  },
  {
    year: "2014",
    label: "Mostra",
    desc: "Participação na Mostra Artefacto, com obras em 4 ambientes no Casa Shopping, Rio de Janeiro.",
  },
  {
    year: "2015",
    label: "Individuais",
    desc: "Exposições individuais 'GYZ' (Galeria Canto da Carambola) e 'BIOGRÁFICO' (Galeria Candido Portinari – UERJ).",
  },
  {
    year: "2016",
    label: "Coletivas",
    desc: "Participação em 'Tiradentes - Singular & Plural', 'Quem Viver Verão' (Galeria Sergio Gonçalves) e 'Angulo'.",
  },
  {
    year: "2017",
    label: "Internacional",
    desc: "Coletiva 29º RIO BIKOO-TEN no Consulado Geral da Argentina, Rio de Janeiro.",
  },
  {
    year: "2018",
    label: "Leilão",
    desc: "Leilão na Galeria 'BB', localizada na Fábrica Bhering – Rio de Janeiro.",
  },
  {
    year: "2019",
    label: "Individual",
    desc: "Exposição individual na Galeria 'Medusa', na Fábrica Bhering – Rio de Janeiro.",
  },
  {
    year: "2020",
    label: "MUVUCATO",
    desc: "Participação na coletiva MUVUCATO na Galeria 'O Lugar Arte Contemporânea', Fábrica Bhering.",
  },
  {
    year: "2021",
    label: "Expansão",
    desc: "Jornada Internacional de Criatividade Solidária e início de participações na Galeria Portão Vermelho.",
  },
  {
    year: "2024",
    label: "Produção Atual",
    desc: "Presença em coletivas com curadoria de Raimundo Rodrigues e edições da Salve São Jorge (2024-2026).",
  },
];

export default function SobreArtista() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      let horizontalTween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressLineRef.current) {
              progressLineRef.current.style.width = `${self.progress * 100}%`;
            }
          }
        }
      });

      // Animate the content inside each item when they scroll into view horizontally
      gsap.utils.toArray('.sart__item-content-wrap').forEach((content) => {
        gsap.fromTo(content, 
          { opacity: 0, y: 40 }, 
          { 
            opacity: 1, y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: content.parentNode,
              containerAnimation: horizontalTween,
              start: "left 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
      
      // Animate the dots popping in
      gsap.utils.toArray('.sart__item-dot').forEach((dot) => {
        gsap.fromTo(dot, 
          { scale: 0 }, 
          { 
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: dot.parentNode,
              containerAnimation: horizontalTween,
              start: "left 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sart" ref={sectionRef}>
      <div className="sart__track" ref={trackRef}>
        
        {/* Intro Hero Area */}
        <div className="sart__intro">
          <div className="sart__intro-content">
            <div className="sart__intro-label">
              <span className="sart__intro-label-line" />
              <span>Trajetória</span>
            </div>
            <h2 className="sart__intro-title">Uma vida<br/>dedicada à<br/>arte.</h2>
            <p className="sart__intro-desc">
              De 1974 aos dias de hoje, acompanhe os marcos que moldaram a expressão plástica e a presença de Rui Costa Marques no cenário artístico.
            </p>
          </div>
          <div className="sart__intro-image-wrap">
            <img src={artistImg} alt="Rui Costa Marques trabalhando" className="sart__intro-image" />
            <span className="sart__corner sart__corner--tl" />
            <span className="sart__corner sart__corner--tr" />
            <span className="sart__corner sart__corner--bl" />
            <span className="sart__corner sart__corner--br" />
          </div>
        </div>

        {/* Horizontal Timeline Items */}
        <div className="sart__items-container">
          <div className="sart__timeline-line" />
          <div className="sart__timeline-progress" ref={progressLineRef} />
          
          {TIMELINE.map((item, i) => (
            <div className={`sart__item ${i % 2 === 0 ? 'is-top' : 'is-bottom'}`} key={i}>
              <div className="sart__item-connector" />
              <div className="sart__item-dot" />
              
              <div className="sart__item-content-wrap">
                <div className="sart__item-year">{item.year}</div>
                <div className="sart__item-label">{item.label}</div>
                <div className="sart__item-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* End Spacer to allow smooth scrolling exit */}
        <div className="sart__spacer"></div>

      </div>
      
      {/* Scroll Indicator */}
      <div className="sart__scroll-indicator">
        <span>Arraste para explorar</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </section>
  );
}
