import { useState, useCallback } from 'react';
import GalleryHeader from '../components/GalleryHeader/GalleryHeader';
import GalleryNav from '../components/GalleryNav/GalleryNav';
import GallerySection from '../components/GallerySection/GallerySection';
import GalleryLightbox from '../components/GalleryLightbox/GalleryLightbox';
import { galleryTopics } from '../data/galleryData';

function Galeria() {
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    topicId: null,
    imageIndex: 0,
  });

  const currentTopic = galleryTopics.find((t) => t.id === lightbox.topicId);
  const currentImages = currentTopic?.images || [];

  const handleImageClick = useCallback((topicId, imageIndex) => {
    setLightbox({ isOpen: true, topicId, imageIndex });
  }, []);

  const handleClose = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handlePrev = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      imageIndex:
        prev.imageIndex > 0 ? prev.imageIndex - 1 : currentImages.length - 1,
    }));
  }, [currentImages.length]);

  const handleNext = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      imageIndex:
        prev.imageIndex < currentImages.length - 1
          ? prev.imageIndex + 1
          : 0,
    }));
  }, [currentImages.length]);

  return (
    <div className="bg-white min-h-screen">
      <GalleryHeader />
      <GalleryNav />

      <div className="gallery-sections">
        {galleryTopics.map((topic) => (
          <GallerySection
            key={topic.id}
            topic={topic}
            onImageClick={handleImageClick}
          />
        ))}
      </div>

      <GalleryLightbox
        images={currentImages}
        currentIndex={lightbox.imageIndex}
        isOpen={lightbox.isOpen}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}

export default Galeria;
