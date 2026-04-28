import { motion, useInView } from "motion/react";
import { useRef } from "react";
import './SobreQuemSou.css';

function SobreQuemSou() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section className="sqsou" ref={sectionRef}>

      {/* ── Watermark editorial: 1974 ── */}
      <motion.div
        className="sqsou__watermark"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.1 }}
      >
        1974
      </motion.div>

      <div className="sqsou__inner">

        {/* ── Label ── */}
        <motion.div
          className="sqsou__label"
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="sqsou__label-line" />
          <span>Sobre o artista</span>
        </motion.div>

        {/* ── h1 ── */}
        <motion.h1
          className="sqsou__title"
          initial={{ opacity: 0, y: 48 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.05, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          Quem sou
        </motion.h1>

        {/* ── Divisor FAU/UFRJ/1974 ── */}
        <motion.div
          className="sqsou__divider"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.38 }}
        >
          <motion.span
            className="sqsou__divider-line"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="sqsou__divider-year">FAU — UFRJ — 1974</span>
          <motion.span
            className="sqsou__divider-line"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* ── Bio — 2 colunas ── */}
        <motion.div
          className="sqsou__bio"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sqsou__bio-col">
            <p className="sqsou__paragraph">
              Rui Costa Marques, em 1974, diplomado pela FAU/UFRJ, desenvolveu sua trajetória
              entre a arquitetura e as artes visuais. Desde cedo dedicado à pintura e à colagem,
              frequentou ateliês e participou de mostras coletivas, consolidando uma produção
              marcada pelo diálogo entre construção e expressão plástica.
            </p>
          </div>

          <div className="sqsou__bio-col">
            <p className="sqsou__paragraph">
              Em 2013, recebeu o primeiro lugar no concurso Novos Talentos na Pintura, promovido
              pela Cesgranrio, marco que ampliou sua atuação no campo artístico.
              Paralelamente à atividade como arquiteto, realizou trabalhos sob encomenda, período
              em que adotou a assinatura Rui Marques. Atualmente reúne sua produção sob o
              domínio ruiart —{" "}
              <a
                href="http://www.ruiart.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="sqsou__link"
              >
                www.ruiart.com.br
              </a>{" "}
              — fase que representa maior dedicação e expansão de sua pesquisa visual.
            </p>
          </div>
        </motion.div>

        {/* ── Highlight do prêmio ── */}
        <motion.div
          className="sqsou__highlight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sqsou__highlight-accent" aria-hidden="true" />
          <div className="sqsou__highlight-content">
            <span className="sqsou__highlight-text">Reconhecimento</span>
            <p className="sqsou__highlight-award">
              1.º lugar — Novos Talentos na Pintura
            </p>
            <span className="sqsou__highlight-year">Cesgranrio · 2013</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default SobreQuemSou;
