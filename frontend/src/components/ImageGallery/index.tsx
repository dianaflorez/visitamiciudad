import React from 'react';
import './ImageGallery.css'; // Archivo CSS para los estilos de la galería

type ImageGalleryProps = {
  images: string[]; // Array de URLs de imágenes
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="gallery-grid">
      {images.slice(0, 15).map((image, index) => (
        <div key={index} className="image-container">
          <img src={image} alt={`Image ${index + 1}`} className="gallery-image" />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
