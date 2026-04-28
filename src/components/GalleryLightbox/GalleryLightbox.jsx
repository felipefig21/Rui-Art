import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './GalleryLightbox.css';

function GalleryLightbox({ images, currentIndex, isOpen, onClose, onPrev, onNext }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!images || images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div className="lightbox__backdrop" onClick={onClose} />

          {/* Botão Fechar */}
          <button
            className="lightbox__close"
            onClick={onClose}
            aria-label="Fechar visualização"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Conteúdo Central */}
          <div className="lightbox__content">
            {images.length > 1 && (
              <button
                className="lightbox__nav lightbox__nav--prev"
                onClick={onPrev}
                aria-label="Obra anterior"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]?.src}
                alt=""
                className="lightbox__image"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>

            {images.length > 1 && (
              <button
                className="lightbox__nav lightbox__nav--next"
                onClick={onNext}
                aria-label="Próxima obra"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Contador */}
          <div className="lightbox__counter">
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>

          {/* Botão de Contato */}
          <Link to="/contato" className="lightbox__contact-btn">
            Entrar em Contato
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GalleryLightbox;
