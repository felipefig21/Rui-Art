import { useState, useEffect } from 'react';
import { galleryTopics } from '../../data/galleryData';
import './GalleryNav.css';

function GalleryNav() {
  const [activeId, setActiveId] = useState(galleryTopics[0]?.id);

  useEffect(() => {
    const observers = [];

    galleryTopics.forEach((topic) => {
      const el = document.getElementById(topic.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(topic.id);
          }
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="gallery-nav" aria-label="Categorias da galeria">
      <div className="gallery-nav__container">
        {galleryTopics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleClick(topic.id)}
            className={`gallery-nav__item ${activeId === topic.id ? 'is-active' : ''}`}
          >
            <span className="gallery-nav__index">{topic.index}</span>
            <span className="gallery-nav__label">{topic.title}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default GalleryNav;
