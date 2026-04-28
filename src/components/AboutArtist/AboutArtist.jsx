import { Link } from 'react-router-dom';
import './AboutArtist.css';
import { motion } from "motion/react";
import aboutImg from '../../assets/about_artist_img.png';

const ArrowIcon = () => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

function AboutArtist() {
  return (
    <section className="about-artist">
      <div className="about-content">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="about-title-large"
        >
          Rui Costa Marques
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="about-grid-text"
        >
          <div className="about-column">
            <p className="about-description">
              Diplomado pela FAU/UFRJ, Rui Costa Marques transita com fluidez entre a precisão da arquitetura e a expressividade das artes visuais. Sua produção investiga a materialidade e o espaço, com foco especial na pintura e na colagem.
            </p>
          </div>
          <div className="about-column">
            <p className="about-description">
              Premiado com o primeiro lugar no concurso Novos Talentos na Pintura (Cezgranrio, 2013), o artista assina como Rui Marques, consolidando sua pesquisa autoral no domínio ruiart <a href="http://www.ruiart.com.br" target="_blank" rel="noopener noreferrer" className="about-link">www.ruiart.com.br</a>.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="about-actions"
        >
          <Link to="/sobre" className="about-cta group">
            <span className="about-cta-text">Mais sobre Rui</span>
            <ArrowIcon />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutArtist;
