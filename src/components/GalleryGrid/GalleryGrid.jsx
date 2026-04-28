import React from 'react';
import './GalleryGrid.css';

function GalleryGrid({ images, onImageClick, topicId }) {
  return (
    <div className="gallery-grid__container">
      <div className={`gallery-grid ${topicId === 'superficies-texturas' ? 'gallery-grid--spaced' : ''}`}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className="gallery-grid__item"
            onClick={() => onImageClick(topicId, index)}
          >
            <div className="gallery-grid__image-wrapper">
              <img
                src={image.src}
                alt=""
                className="gallery-grid__image"
                loading="lazy"
              />
            </div>
            <div className="gallery-grid__overlay" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryGrid;
