import React from 'react';
import CardStack from '../CardStack/CardStack';

// Imagens dos cartões (da pasta assets/cards)
import card1 from '../../assets/cards/card1.jfif';
import card2 from '../../assets/cards/card2.png';
import card3 from '../../assets/cards/card3.jfif';
import card4 from '../../assets/cards/card4.png';
import card5 from '../../assets/cards/caard5.png';
import card6 from '../../assets/cards/card6.png';

const DISCIPLINES = [
  {
    id: 'arq',
    title: "Arquitetura",
    description: "Formado pela FAU/UFRJ, desenvolve projetos que investigam a relação entre forma construída, espaço habitado e narrativa visual.",
    image: card1,
  },
  {
    id: 'pin',
    title: "Pintura",
    description: "Prática central da pesquisa autoral, a pintura explora materialidade, cor e gesto — conquistando o 1.º lugar no concurso Novos Talentos em 2013.",
    image: card2,
  },
  {
    id: 'col',
    title: "Colagem",
    description: "Sobreposição de camadas, fragmentos e texturas que expandem a lógica construtiva para o plano da expressão plástica.",
    image: card3,
  },
  {
    id: 'bio',
    title: "Biográfico",
    description: "Individual \u201CBIOGRÁFICO\u201D Galeria Candido Portinari \u2014 UERJ \u2014 Rio de Janeiro.",
    image: card4,
  },
  {
    id: 'premio',
    title: "Novos Talentos",
    description: "1.º Lugar no Prêmio Cesgranrio NOVOS Talentos da Pintura.",
    image: card5,
    objectFit: 'contain',
  },
  {
    id: 'angulo',
    title: "Coletiva Angulo",
    description: "Coletiva Angulo — Rio de Janeiro. 2016.",
    image: card6,
  },
];

export default function SobreDisciplinas() {
  return (
    <CardStack cards={DISCIPLINES} />
  );
}
