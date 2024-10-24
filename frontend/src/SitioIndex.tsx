import { useEffect, useState } from "react";
import CardTable from "./components/CardTable";
import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const SitioIndex = () => {
  interface Card {
    id: number;
    menu_id: number;
    menu_name?: string;
    created_id?: number;
    order_no: number;
    title: string;
    image_url: string;
    description: string;
    home: boolean;
    type: string;
    active: boolean;
  }

  const [cards, setCards] = useState<Card[]>([]);

  const mock = [
    {
      id: 1,
      menu_id: 2,
      menu_name: "Main Menu",
      created_id: 3,
      order_no: 1,
      title: "Sample Card 1",
      image_url: "https://via.placeholder.com/150",
      description: "This is a sample description for card 1.",
      home: true,
      type: "Vertical",
      active: true,
    },
    {
      id: 2,
      menu_id: 3,
      menu_name: "Sub Menu",
      created_id: 4,
      order_no: 2,
      title: "Sample Card 2",
      image_url: "https://via.placeholder.com/150",
      description: "This is a sample description for card 2.",
      home: false,
      type: "Horizontal",
      active: false,
    },
  ];

  useEffect(() => {
    // Obtener role_id de localStorage
    const roleId = localStorage.getItem("role_id");
    const userId = localStorage.getItem("id"); // Suponiendo que también esté en localStorage

    const fetchCards = async () => {
      try {
        let response;

        // Si roleId es 2, traer todas las cartas
        if (roleId === "2") {
          response = await axios.get("http://localhost:3001/cards");
          console.log("Todas las cartas:", response.data.data.rows);
          setCards(response.data.data.rows);
        }
        // Si roleId es 3, traer solo las cartas del usuario actual
        else if (roleId === "3" && userId) {
          response = await axios.get(
            `http://localhost:3001/cards/user/${userId}`
          );
          console.log("Cartas del usuario:", response.data.data);
          setCards(response.data.data);
        }
      } catch (error) {
        console.error("Error al obtener las cartas:", error);
      }
    };

    fetchCards();
  }, []); // Ejecutar solo al cargar el componente

  // Función para manejar la edición
  const handleEdit = (id: number) => {
    console.log("Editing card with id:", id);
    // Aquí puedes navegar a una página de edición o abrir un modal
  };

  // Función para manejar la eliminación
  const handleDelete = (id: number) => {
    console.log("Deleting card with id:", id);
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <Container>
      <Typography
        id="sitios"
        variant="h4"
        align="left"
        gutterBottom
        sx={{ marginTop: "20px" }}
      >
        <span style={{ color: "purple" }}>•</span> Lista de Cards/Sitios{" "}
        <span style={{ color: "purple" }}>•</span>
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/sitio-new"
        style={{ marginBottom: "20px" }}
      >
        Nuevo Card/Sitio
      </Button>

      <CardTable cards={cards} onEdit={handleEdit} onDelete={handleDelete} />
    </Container>
  );
};

export default SitioIndex;