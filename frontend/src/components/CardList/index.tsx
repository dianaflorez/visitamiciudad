import React from 'react';
import { Grid } from '@mui/material';
import CardItem from '../../components/CardItem';

// Define una interfaz para los datos de las tarjetas
interface CardData {
  imageSrc: string;
  title: string;
  text: string;
  link: string;
}

const CardList: React.FC = () => {
  const cardData: CardData[] = [
    {
      imageSrc: 'https://www.turismopasto.com/wp-content/uploads/2018/04/laguna-cocha-lanchas-turismo-pasto-700x466.jpg',
      title: 'Laguna de La Cocha',
      text: 'La Laguna de la Cocha es uno de los principales atractivos turísticos.',
      link: '/sitios-descripcion'
    },
    {
      imageSrc: 'https://www.turismopasto.com/wp-content/uploads/2018/04/volcan-galeras-turismo-pasto-700x466.jpg',
      title: 'Volcán Galeras',
      text: 'El volcán Galeras es uno de los más activos de Colombia.',
      link: '/sitios-descripcion'
    },
    {
      imageSrc: 'https://www.turismopasto.com/wp-content/uploads/2018/04/santuario-las-lajas-turismo-pasto-700x466.jpg',
      title: 'Santuario de Las Lajas',
      text: 'Uno de los santuarios más hermosos del mundo, ubicado en el sur de Colombia.',
      link: '/sitios-descripcion'
    },
    {
      imageSrc: 'https://www.turismopasto.com/wp-content/uploads/2018/04/catedral-pasto-turismo-pasto-700x466.jpg',
      title: 'Catedral de Pasto',
      text: 'La Catedral de Pasto es una joya arquitectónica en el corazón de la ciudad.',
      link: '/sitios-descripcion'
    },
  ];

  return (
    <Grid container spacing={3}>
      {cardData.map((card, index) => (
        <CardItem
          key={index}
          imageSrc={card.imageSrc}
          title={card.title}
          text={card.text}
          link={card.link}
        />
      ))}
    </Grid>
  );
};

export default CardList;
