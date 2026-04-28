import { Link } from 'react-router-dom';
import './ExploreGallery.css';

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

function ExploreGallery() {
  return (
    <section className="explore-gallery-section">
      <div className="explore-container">
        <div className="explore-line" />
        
        <Link to="/galeria" className="explore-link group">
          <span className="explore-text">
            Explorar a Galeria
          </span>
          <ArrowIcon />
        </Link>
        
        <div className="explore-line-bottom" />
      </div>
    </section>
  );
}

export default ExploreGallery;
