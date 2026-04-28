import { motion } from 'motion/react';
import GalleryGrid from '../GalleryGrid/GalleryGrid';
import './GallerySection.css';

function GallerySection({ topic, onImageClick }) {
  return (
    <section id={topic.id} className="gallery-section">
      {/* Header do Tópico */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className="gallery-section__header"
      >
        <div className="gallery-section__meta">
          <span className="gallery-section__index">{topic.index} /</span>
        </div>
        <h2 className="gallery-section__title">{topic.title}</h2>
        <p className="gallery-section__description">{topic.description}</p>
        <div className="gallery-section__line" />
      </motion.div>

      {/* Conteúdo: Grid ou Em Breve */}
      {topic.comingSoon ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="gallery-section__coming-soon"
        >
          <div className="gallery-section__coming-soon-inner">
            <span className="gallery-section__coming-soon-text">Em Breve</span>
            <span className="gallery-section__coming-soon-sub">
              Novas obras estão sendo preparadas para esta coleção
            </span>
          </div>
        </motion.div>
      ) : (
        <GalleryGrid
          images={topic.images}
          onImageClick={onImageClick}
          topicId={topic.id}
        />
      )}
    </section>
  );
}

export default GallerySection;
