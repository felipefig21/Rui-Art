/* ─────────────────────────────────────────────────────────────
   galleryData.js · Dados centralizados da galeria por tópico
   ───────────────────────────────────────────────────────────── */

// Import via glob (Vite resolve em build-time)
const obrasModules = import.meta.glob(
  '../assets/obras_ambientadas/*.webp',
  { eager: true }
);

const modulosModules = import.meta.glob(
  '../assets/modulos_digitais/*.webp',
  { eager: true }
);

const pbModules = import.meta.glob(
  '../assets/Fotografias_P&B/*.webp',
  { eager: true }
);

const corModules = import.meta.glob(
  '../assets/forosemcor/*.webp',
  { eager: true }
);

const texturasModules = import.meta.glob(
  '../assets/texturas/*.webp',
  { eager: true }
);

/**
 * Processa os módulos do glob, filtrando cópias e exclusões específicas.
 * Retorna array de { id, src }.
 */
const processImages = (modules, exclude = []) => {
  return Object.entries(modules)
    .filter(([path]) => {
      const lowerPath = path.toLowerCase();
      if (lowerPath.includes('copia')) return false;
      if (exclude.some(ex => lowerPath.includes(ex.toLowerCase()))) return false;
      return true;
    })
    .map(([, mod], index) => ({
      id: index,
      src: mod.default,
    }));
};

export const galleryTopics = [
  {
    id: 'obras-ambientadas',
    index: '01',
    title: 'Obras Ambientadas',
    description:
      'Telas apresentadas em ambientes reais, em escala natural, para melhor leitura de proporção, cor e presença no espaço.',
    images: processImages(obrasModules, ['SAN_2701.webp']),
    comingSoon: false,
  },
  {
    id: 'superficies-texturas',
    index: '02',
    title: 'Superfícies e Texturas',
    description:
      'Investigações sobre materialidade, relevo e a poética das superfícies.',
    images: processImages(texturasModules),
    comingSoon: false,
  },
  {
    id: 'fotografias-pb',
    index: '03',
    title: 'Fotografias P&B',
    description:
      'Imagens fotográficas autorais, com recortes e colagens em P&B, de RuiArt.',
    images: processImages(pbModules),
    comingSoon: false,
  },
  {
    id: 'fotografias-cor',
    index: '04',
    title: 'Fotografias em Cor',
    description:
      'Registros fotográficos autorais em cor, capturando luz, matéria e composição.',
    images: processImages(corModules),
    comingSoon: false,
  },
  {
    id: 'modulos-digitais',
    index: '05',
    title: 'Módulos Digitais',
    description:
      'Módulos criados digitalmente, destinados à apreciação individual ou à formação de painéis.',
    images: processImages(modulosModules),
    comingSoon: false,
  },
];
