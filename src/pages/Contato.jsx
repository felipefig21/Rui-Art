import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import './Contato.css';
import san2728Img from '../assets/texturas/Obras Artista RCMARQUES SAN_2728 - 12 de fevereiro de 2026.webp';

gsap.registerPlugin(ScrollTrigger);

export default function Contato() {
  const pageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo('.contato__showcase-img-wrap', 
        { opacity: 0, y: 50, scale: 0.98 },
        { 
          opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: '.contato__showcase', start: "top 80%" }
        }
      );

      // Copy staggering
      gsap.fromTo('.contato__copy-block', 
        { opacity: 0, x: 30 },
        { 
          opacity: 1, x: 0, duration: 1, ease: "power2.out", stagger: 0.2,
          scrollTrigger: { trigger: '.contato__copy', start: "top 85%" }
        }
      );
      
      // CTA reveal
      gsap.fromTo('.contato__cta', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: '.contato__cta', start: "top 90%" }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div 
      className="contato"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      ref={pageRef}
    >
      <div className="contato__hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="contato__hero-label"
        >
          <span className="contato__hero-label-line" />
          <span>Coleção e Investimento</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="contato__hero-title"
        >
          A Presença da Arte<br/>no Seu Espaço.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="contato__hero-subtitle"
        >
          A tecnologia é movimento contínuo: instaura o novo e torna obsoleto o que, há pouco, era novo. Daí a necessidade da presença de objetos de arte em nossos ambientes. Eles permanecem.
        </motion.p>
      </div>

      <div className="contato__divider" />

      <section className="contato__showcase">
        {/* Left Column: Artwork Presentation */}
        <div className="contato__showcase-image">
          <div className="contato__showcase-img-wrap">
            <img src={san2728Img} alt="SAN_2728" className="contato__showcase-img" loading="lazy" />
          </div>
          <div className="contato__showcase-caption">
            <span className="contato__showcase-title">Artista Rui Costa Marques</span>
          </div>
        </div>

        {/* Right Column: Objection Breaking Copy */}
        <div className="contato__copy">
          <div className="contato__copy-block">
            <h3 className="contato__copy-title">Mais que Decoração. Uma Vivência.</h3>
            <p className="contato__copy-text">
              Adquirir uma obra original não é apenas preencher uma parede vazia. É trazer para o seu ambiente — seja corporativo ou residencial — um atrito, uma tensão que quebra a monotonia da técnica e do raciocínio. A arte não resolve problemas práticos: ela <strong>ocupa o vazio</strong> de sentido, gerando novas conexões e perspectivas para quem a observa diariamente.
            </p>
          </div>

          <div className="contato__copy-block">
            <h3 className="contato__copy-title">O Valor da Materialidade Autêntica</h3>
            <p className="contato__copy-text">
              Em um mundo tomado por reproduções em massa, as obras de Rui Costa Marques oferecem a exclusividade do gesto humano. O atrito do pincel, as texturas, a sobreposição única de recortes e colagens. São peças que exigem presença física para serem sentidas por completo, garantindo a você a posse de algo verdadeiramente singular.
            </p>
          </div>

          <div className="contato__copy-block">
            <h3 className="contato__copy-title">Trajetória Sólida (Desde 1974)</h3>
            <p className="contato__copy-text">
              Colecionar arte é também um investimento em patrimônio cultural. Formado na FAU/UFRJ e com passagem histórica pelos ateliês do MAM, Rui possui prêmios expressivos, como o 1.º lugar no <em>Prêmio Cesgranrio – Novos Talentos</em>. Sua presença contínua em mostras e galerias atesta a maturidade e valorização do seu trabalho ao longo das décadas.
            </p>
          </div>
        </div>
      </section>

      <section className="contato__cta">
        <h2 className="contato__cta-title">Vamos conversar sobre o seu ambiente?</h2>
        <p className="contato__cta-text">
          Estou disponível para entender o seu espaço e ajudar na escolha da obra ideal. Seja uma tela imponente, uma fotografia exclusiva ou uma colagem provocativa. Solicite o catálogo completo ou agende uma consultoria sem compromisso.
        </p>
        <a 
          href="https://wa.me/5521991244282?text=Ol%C3%A1%20gostaria%20de%20saber%20mais%20sobre%20as%20suas%20artes" 
          target="_blank" 
          rel="noopener noreferrer"
          className="contato__btn"
        >
          Iniciar Atendimento Exclusivo
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </section>
    </motion.div>
  );
}
