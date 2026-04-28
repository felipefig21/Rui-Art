import SobreQuemSou from '../components/SobreQuemSou/SobreQuemSou';
import SobreManifesto from '../components/SobreManifesto/SobreManifesto';
import SobreArtista from '../components/SobreArtista/SobreArtista';
import SobreDisciplinas from '../components/SobreDisciplinas/SobreDisciplinas';

function Sobre() {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <SobreQuemSou />
      <SobreManifesto />
      <SobreArtista />
      <SobreDisciplinas />
    </div>
  );
}

export default Sobre;
