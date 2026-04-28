import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import './Header.css';

const NAV_ITEMS = [
  { to: "/", label: "Inicio" },
  { to: "/galeria", label: "Galeria" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
];

function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Detecção de Topo
    setIsAtTop(latest < 50);

    // Detecção de Direção para Visibilidade
    if (latest > previous && latest > 150) {
      setIsVisible(false); // Rolando para baixo -> Esconde
    } else {
      setIsVisible(true);  // Rolando para cima -> Mostra
    }
  });

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isHome = location.pathname === "/";
  const isGallery = location.pathname === "/galeria";
  const headerStateClass = ((isHome || isGallery) && isAtTop) ? "is-at-top" : "is-solid";

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible || isMenuOpen ? 0 : -120 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`site-header ${headerStateClass} ${isMenuOpen ? "menu-open" : ""}`}
    >
      <div className="site-header__frame">
        <nav className="site-header__nav" aria-label="Principal">
          <div className="site-header__brand-left">
            {/* Texto movido para o Hero conforme solicitado */}
          </div>

          <div className="site-header__actions">
            <div className="site-header__links">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.to);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`site-header__link ${active ? "is-active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className="site-header__link-line" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              className="site-header__menu-toggle"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation"
              key="mobile-navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="site-header__mobile-panel"
            >
              <div className="site-header__mobile-links">
                {NAV_ITEMS.map((item, index) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`site-header__mobile-link ${isActive(item.to) ? "is-active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className="site-header__mobile-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Header;
