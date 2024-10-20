import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { ContactForm, Footer } from "./components";
import  CardList  from "./components/CardList";
import BannerList from './components/BannerList';

const Sitios = () => {

  const bannerData = [
    { imageSrc: './images/banner1.jpg' },
    { imageSrc: './images/banner2.jpg' },
    { imageSrc: './images/banner3.jpg' },
    { imageSrc: './images/banner4.jpg' },
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

        <CardList />
      </Container>
      <ContactForm />
      <Footer />
    </>
  );
};

export default Sitios;
