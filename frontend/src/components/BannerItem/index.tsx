import React from 'react';
import { Box } from '@mui/material';

// Definir los tipos para las propiedades
interface BannerItemProps {
  imageSrc: string;
}

const BannerItem: React.FC<BannerItemProps> = ({ imageSrc }) => {
  return (
    <Box 
      component="img"
      src={imageSrc}
      alt="banner"
      sx={{
        width: '100%',
        height: '130px',
        objectFit: 'cover',
      }}
    />
  );
};

export default BannerItem;
