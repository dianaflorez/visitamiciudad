import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CardItem from "../../components/CardItem";
import apiClient from "../../api/axiosConfig";

// Define una interfaz para los datos de las tarjetas
interface CardData {
  image_url: string;
  title: string;
  text: string;
  link: string;
}

interface CardListProps {
  subcategoryId: number | null; // Prop para la subcategoría seleccionada
}

const CardList: React.FC<CardListProps> = ({ subcategoryId }) => {
  const [cardsData, setCardsData] = useState<CardData[]>([]);

  // useEffect para manejar cambios en subcategoryId
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (subcategoryId !== null) {
          console.log(`Fetching cards for subcategory ID: ${subcategoryId}`);
          // Aquí se realiza la llamada a la API usando el subcategoryId
          const response = await apiClient.get(
            `http://localhost:3001/card/menu/${subcategoryId}`
          );
          console.log(response.data.data)
          setCardsData(response.data.data);
        } else {
          // Si no hay subcategoría seleccionada, mostrar los datos por defecto
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
        // Mostrar datos predeterminados en caso de error
      }
    };

    fetchData();
  }, [subcategoryId]);

  return (
    <Grid container spacing={3}>
      {cardsData.map((card, index) => (
        <CardItem
          key={index}
          imageSrc={`https://lomerezcotodo.com/wiwoweb/web/archivos/${card.image_url}`}
          title={card.title}
          text={card.text}
          link={"/sitios-descripcion"}
        />
      ))}
    </Grid>
  );
};

export default CardList;
