import Hero from '../components/Hero/Hero';
import AboutArtist from '../components/AboutArtist/AboutArtist';
import Process from '../components/Process/Process';
import ExploreGallery from '../components/ExploreGallery/ExploreGallery';

function Home() {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <Hero />
      <AboutArtist />
      <Process />
      <ExploreGallery />
    </div>
  );
}

export default Home;
