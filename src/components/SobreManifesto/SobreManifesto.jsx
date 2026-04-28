import { motion, useInView } from "motion/react";
import { useRef } from "react";
import './SobreManifesto.css';

function SobreManifesto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section className="smani" ref={ref}>

      {/* Texto lateral decorativo */}
      <div className="smani__side" aria-hidden="true">
        Rio de Janeiro · Brasil · ruiart.com.br
      </div>

      <div className="smani__inner">

        {/* Linha superior */}
        <motion.div
          className="smani__rule"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Quote */}
        <motion.blockquote
          className="smani__quote"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>"A arte — o sensível, o singular — traz ao mundo e às pessoas vivências que não exigem revalidação. Permanecem.</p>
          <p>A tecnologia, ao contrário, é movimento contínuo: instaura o novo ao mesmo tempo em que torna obsoleto o que, há pouco, era novo.</p>
          <p>Daí a necessidade da presença de objetos de arte em nossos ambientes, internos e externos. Em atrito, muitas vezes, geram ruído e tensionam o que o raciocínio e a técnica procuram estabilizar.</p>
          <p>Desse choque emergem novas experiências — do mundo e das relações — sob outra ótica."</p>
          <p className="smani__quote-final">"A arte, então, não resolve: ocupa o vazio."</p>
        </motion.blockquote>

        {/* Linha inferior */}
        <motion.div
          className="smani__rule"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Rodapé */}
        <motion.div
          className="smani__foot"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.65 }}
        >
          <span className="smani__attribution">— Rui Costa Marques</span>
          <span className="smani__foot-tag">Arquitetura · Pintura · Colagem</span>
        </motion.div>

      </div>
    </section>
  );
}

export default SobreManifesto;
