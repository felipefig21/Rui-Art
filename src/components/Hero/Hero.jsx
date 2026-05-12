import { motion } from "motion/react";
import './Hero.css';
import heroImage from '../../assets/Heroimg.webp';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src={heroImage}
          alt="Rui Costa Marques"
          className="hero-image"
          fetchpriority="high"
        />
        <div className="hero-overlay" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="hero-content"
      >
        <h1 className="hero-title">
          ruiart.com.br
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="hero-bottom-right"
      >
        <span className="hero-name">Rui Costa Marques</span>
        <span className="hero-location">Rio de Janeiro - Brasil</span>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="hero-scroll-indicator" 
      />
    </section>
  );
}

export default Hero;
