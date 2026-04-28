import { motion } from "motion/react";
import './GalleryHeader.css';
import mariaJuliaImg from '../../assets/1 Maria_Júlia.png';

function GalleryHeader() {
  const title = "Galeria";
  
  const charVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1,
        delay: i * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      }
    })
  };

  return (
    <header 
      className="gallery-header"
      style={{ backgroundImage: `url("${mariaJuliaImg}")` }}
    >
      <div className="gallery-overlay" />
      
      <div className="gallery-container">
        <div className="flex overflow-hidden py-2 justify-start relative z-10">
          {title.split("").map((char, i) => (
            <motion.h1
              key={i}
              custom={i}
              variants={charVariants}
              initial="hidden"
              animate="visible"
              className="gallery-title inline-block"
              style={{ perspective: "1000px" }}
            >
              {char}
            </motion.h1>
          ))}
        </div>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="gallery-description relative z-10"
        >
          Explore o universo visual de Rui Costa Marques
        </motion.p>
      </div>
    </header>
  );
}

export default GalleryHeader;
