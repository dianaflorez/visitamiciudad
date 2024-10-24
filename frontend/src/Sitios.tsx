import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ContactForm, Footer } from "./components";
import CardList from "./components/CardList";
import BannerList from "./components/BannerList";

// Definición del tipo para las claves de subcategorías
type CategoryKey = "turisticos" | "culturales" | "gastronomia" | "entretenimiento";

// Definición de subcategorías
const subcategories: Record<CategoryKey, { id: number; name: string }[]> = {
  turisticos: [
    { id: 3, name: "Sitios Historicos" },
    { id: 4, name: "Sitios Geográficos" },
    { id: 5, name: "Sitios de Valor Espiritual" },
    { id: 6, name: "Sitios de Impacto Economico" },
  ],
  culturales: [
    { id: 8, name: "Artesanias" },
    { id: 9, name: "Musica" },
    { id: 10, name: "Carnaval" },
  ],
  gastronomia: [
    { id: 12, name: "Comida Tipica" },
    { id: 13, name: "Restaurantes" },
    { id: 14, name: "Comida Rapida" },
    { id: 15, name: "Heladería" },
  ],
  entretenimiento: [
    { id: 17, name: "Bares" },
    { id: 18, name: "Cines" },
    { id: 19, name: "Discotekas" },
    { id: 20, name: "Juegos Grupales" },
    { id: 21, name: "Cafes" },
  ],
};

// Función para normalizar el título
const normalizeTitle = (title: string): string =>
  title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, ""); // Elimina espacios

const Sitios = () => {
  const navigate = useNavigate();
  const { title } = useParams<{ title: string }>(); 
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);

  const validTitles = Object.keys(subcategories) as CategoryKey[];

  useEffect(() => {
    if (!title || !validTitles.includes(normalizeTitle(title) as CategoryKey)) {
      navigate("/"); 
    }

    setSelectedSubcategory(subcategories[title][0]?.id || null);

    return () => setSelectedSubcategory(null);
  }, [title, navigate, validTitles]);

  // Obtener las subcategorías basadas en el título
  const category = validTitles.find(
    (cat) => cat === normalizeTitle(title || "")
  ) as CategoryKey | undefined;
  const currentSubcategories = category ? subcategories[category] : [];

  const bannerData = [
    { imageSrc: "./images/banner1.jpg" },
    { imageSrc: "./images/banner2.jpg" },
    { imageSrc: "./images/banner3.jpg" },
    { imageSrc: "./images/banner4.jpg" },
  ];

  return (
    <>
      <Container>
        <BannerList banners={bannerData} />

        <Typography
          id="sitios"
          variant="h4"
          align="left"
          gutterBottom
          sx={{ marginTop: "20px" }}
        >
          <span style={{ color: "purple" }}>•</span> Sitios de Interés{" "}
          <span style={{ color: "purple" }}>•</span>
        </Typography>

        {/* Sub-navbar para subcategorías */}
        {currentSubcategories.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            {currentSubcategories.map((sub) => (
              <Button
                key={sub.id}
                variant={selectedSubcategory === sub.id ? "contained" : "outlined"}
                onClick={() => setSelectedSubcategory(sub.id)}
              >
                {sub.name}
              </Button>
            ))}
          </Box>
        )}

        {/* Pasar el ID de la subcategoría seleccionada a CardList */}
        <CardList subcategoryId={selectedSubcategory} />
      </Container>
      <ContactForm />
      <Footer />
    </>
  );
};

export default Sitios;
