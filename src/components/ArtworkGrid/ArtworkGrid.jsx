import { motion, AnimatePresence } from "motion/react";
import './ArtworkGrid.css';

// ─── Dados da Galeria ────────────────────────────────────────────────────────
// "aspect" define o aspect-ratio CSS de cada imagem (largura/altura).
// Isso permite formatos distintos fluírem naturalmente no masonry.
const GALLERY_DATA = {
  ambientadas: {
    title: "Obras\nAmbientadas",
    description: "A integração da arte no espaço arquitetônico, criando diálogos entre a obra e o ambiente.",
    cols: "cols-2",
    items: [
      { id: 1,  title: "Luz e Sombra I",          meta: "2024", img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1200", aspect: "4/3"  },
      { id: 2,  title: "Fragmentos Urbanos",       meta: "2024", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200", aspect: "3/4"  },
      { id: 7,  title: "Diálogo Espacial",         meta: "2024", img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1200", aspect: "3/4"  },
      { id: 8,  title: "Intervenção II",           meta: "2023", img: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1200", aspect: "2/3"  },
      { id: 9,  title: "Contexto Arquitetônico",   meta: "2024", img: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1200", aspect: "16/9" },
      { id: 10, title: "Harmonia Ambiental",       meta: "2023", img: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1200", aspect: "4/5"  },
    ],
  },
  modulos: {
    title: "Módulos\nDigitais",
    description: "Explorações geométricas e composições geradas através de processos digitais contemporâneos.",
    cols: "cols-3",
    items: [
      { id: 3,  title: "Morfologia Abstrata",      meta: "2023", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200", aspect: "1/1"  },
      { id: 11, title: "Geometria Generativa",     meta: "2024", img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200", aspect: "1/1"  },
      { id: 12, title: "Padrões Digitais",         meta: "2024", img: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=1200", aspect: "3/2"  },
      { id: 13, title: "Sistema Modular",          meta: "2023", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200", aspect: "1/1"  },
      { id: 14, title: "Composição Algorítmica",   meta: "2024", img: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?q=80&w=1200", aspect: "3/2"  },
      { id: 15, title: "Estrutura Digital",        meta: "2023", img: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=1200", aspect: "1/1"  },
    ],
  },
  pb: {
    title: "Fotografias\nP&B",
    description: "O contraste puro e a captura da essência através da ausência de cor.",
    cols: "cols-2",
    items: [
      { id: 5,  title: "Silêncio Visual",          meta: "2023", img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200", aspect: "2/3"  },
      { id: 16, title: "Contrastes Urbanos",       meta: "2024", img: "https://images.unsplash.com/photo-1504198266287-1659872e6590?q=80&w=1200", aspect: "2/3"  },
      { id: 17, title: "Luz Natural",              meta: "2024", img: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=1200", aspect: "4/5"  },
      { id: 18, title: "Sombras Projetadas",       meta: "2023", img: "https://images.unsplash.com/photo-1476304884326-cd2c88572c5f?q=80&w=1200", aspect: "2/3"  },
      { id: 19, title: "Formas Essenciais",        meta: "2024", img: "https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?q=80&w=1200", aspect: "4/5"  },
      { id: 20, title: "Perspectiva Monócroma",    meta: "2023", img: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1200", aspect: "2/3"  },
    ],
  },
  cor: {
    title: "Fotografias\nem Cor",
    description: "A vibração cromática e a luz como elementos narrativos principais.",
    cols: "cols-2",
    items: [
      { id: 4,  title: "Ritmos Cromáticos",        meta: "2024", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1200", aspect: "4/3"  },
      { id: 21, title: "Paleta Vibrante",          meta: "2024", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200", aspect: "4/5"  },
      { id: 22, title: "Saturação Controlada",     meta: "2023", img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1200", aspect: "16/9" },
      { id: 23, title: "Tons Complementares",      meta: "2024", img: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1200", aspect: "4/5"  },
      { id: 24, title: "Gradiente Natural",        meta: "2024", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200", aspect: "2/3"  },
      { id: 25, title: "Espectro Visual",          meta: "2023", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200", aspect: "4/5"  },
    ],
  },
  texturas: {
    title: "Superfícies\ne Texturas",
    description: "A investigação da materialidade e o detalhe tátil em composições visuais.",
    cols: "cols-3",
    items: [
      { id: 6,  title: "Trama Tátil",              meta: "2024", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200", aspect: "1/1"  },
      { id: 26, title: "Superfície Orgânica",      meta: "2024", img: "https://images.unsplash.com/photo-1554072675-66db59dce614?q=80&w=1200", aspect: "1/1"  },
      { id: 27, title: "Padrão Material",          meta: "2023", img: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1200", aspect: "4/5"  },
      { id: 28, title: "Detalhe Estrutural",       meta: "2024", img: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=1200", aspect: "1/1"  },
      { id: 29, title: "Textura Natural",          meta: "2024", img: "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?q=80&w=1200", aspect: "4/5"  },
      { id: 30, title: "Camadas Visuais",          meta: "2023", img: "https://images.unsplash.com/photo-1557682268-e3955ed5d83f?q=80&w=1200", aspect: "1/1"  },
    ],
  },
};

// ─── Card Individual ─────────────────────────────────────────────────────────
function ArtworkCard({ art, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.07,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="artwork-card"
    >
      {/* Imagem com aspect-ratio natural da obra */}
      <div
        className="artwork-img-wrap"
        style={{ aspectRatio: art.aspect }}
      >
        <motion.img
          src={art.img}
          alt={art.title}
          loading="lazy"
          className="artwork-img"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* Legenda minimalista */}
      <div className="artwork-caption">
        <h3 className="artwork-title">{art.title}</h3>
        <span className="artwork-year">{art.meta}</span>
      </div>
    </motion.article>
  );
}

// ─── Grid Principal ───────────────────────────────────────────────────────────
function ArtworkGrid({ activeTab }) {
  const data = GALLERY_DATA[activeTab];

  return (
    <section className="gallery-section">
      <div className="gallery-inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          >

            {/* ── Cabeçalho do tópico ── */}
            <div className="topic-header">
              <h2
                className="topic-title"
                style={{ whiteSpace: 'pre-line' }}
              >
                {data.title}
              </h2>

              <div className="topic-meta">
                <div className="topic-rule" aria-hidden="true" />
                <p className="topic-description">{data.description}</p>
              </div>
            </div>

            {/* ── Masonry ── */}
            <div className={`masonry-grid ${data.cols}`}>
              {data.items.map((art, index) => (
                <ArtworkCard key={art.id} art={art} index={index} />
              ))}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ArtworkGrid;
