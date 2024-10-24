import React from 'react';
import { Modal, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Estilo del modal
const modalStyle = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', // Ajusta el ancho si es necesario
  maxHeight: '80%', // Limitar la altura máxima del modal
  overflowY: 'auto', // Permitir el desplazamiento vertical
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '12px', // Bordes redondeados
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column'
};

interface ModalRutaProps {
  open: boolean;
  handleClose: () => void;
  content: string;
}

const ModalRuta: React.FC<ModalRutaProps> = ({ open, handleClose, content }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <IconButton
          onClick={handleClose}
          aria-label="cerrar"
          style={{ position: 'fixed', top: 8, right: 8, zIndex: 10, color: '#A10303' }} // Posiciona el botón en la esquina superior izquierda
        >
          <CloseIcon />
        </IconButton>
        <div id="modal-description" dangerouslySetInnerHTML={{ __html: content }} />
        <Button onClick={handleClose} variant="contained" color="secondary">
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalRuta;
