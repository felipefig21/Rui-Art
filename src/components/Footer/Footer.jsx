import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Coluna Logo / Branding */}
        <div className="md:col-span-1">
          <Link to="/" className="footer-logo">
            Rui Costa Marques
          </Link>
          <p className="text-white/40 text-sm font-light leading-relaxed pr-8">
            Investigação artística sobre materialidade, espaço e narrativa contemporânea.
          </p>
        </div>

        {/* Coluna Navegação */}
        <div className="footer-section">
          <h4>Menu</h4>
          <div className="footer-links">
            <Link to="/">Início</Link>
            <Link to="/sobre">O Artista</Link>
            <Link to="/galeria">Coleções</Link>
            <Link to="/contato">Contato</Link>
          </div>
        </div>

        {/* Coluna Social */}
        <div className="footer-section">
          <h4>Conectar</h4>
          <div className="footer-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">Vimeo</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        {/* Coluna Localização / Info */}
        <div className="footer-section">
          <h4>Estúdio</h4>
          <p className="text-white/40 text-sm font-light mb-4">
            Avenida das Artes, 123<br />
            São Paulo, Brasil
          </p>
          <a href="mailto:contato@ruiart.com" className="text-sm text-white/60 hover:text-white transition-colors">
            contato@ruiart.com
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} Rui Costa Marques Studio. Todos os direitos reservados.
        </p>
        <div className="flex gap-8 text-[9px] uppercase tracking-[0.2em] text-white/20">
          <a href="/politica">Política de Privacidade</a>
          <a href="/termos">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
