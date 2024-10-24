import React from "react";
import Slider from "react-slick";
import BannerItem from "../../components/BannerItem";

// Definir el tipo de los datos de banners
interface BannerData {
  imageSrc: string;
}

// Definir los props de BannerList
interface BannerListProps {
  banners: BannerData[];
}

const BannerList: React.FC<BannerListProps> = ({ banners }) => {
  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false, // Desactiva el modo centrado
  };

  return (
    <Slider {...settings} style={{ marginTop: "140px" }}>
      {banners.map((banner, index) => (
        <div key={index}>
          <BannerItem imageSrc={banner.imageSrc} />
        </div>
      ))}
    </Slider>
  );
};

export default BannerList;
