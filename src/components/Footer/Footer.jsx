import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Coluna Logo / Branding */}
        <div className="max-w-md">
          <div className="footer-logo">
            Rui Costa Marques
          </div>
          <p className="text-white/40 text-sm font-light leading-relaxed pr-8">
            Investigação artística sobre materialidade, espaço e narrativa contemporânea.
          </p>
        </div>

        {/* Coluna Contato */}
        <div className="footer-section">
          <h4>Contato</h4>
          <div className="footer-links">
            <a href="https://wa.me/5521991244282?text=Ol%C3%A1%20gostaria%20de%20saber%20mais%20sobre%20as%20suas%20artes" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom justify-center">
        <p className="footer-copyright">
          © {currentYear} Rui Costa Marques Studio. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
