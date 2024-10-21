import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { Link } from 'react-router-dom';

const CardTable = ({ cards, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="card table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Menu ID</TableCell>
            <TableCell>Menu Name</TableCell>
            <TableCell>Created ID</TableCell>
            <TableCell>Order No</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Home</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map((card) => (
            <TableRow key={card.id}>
              <TableCell>{card.id}</TableCell>
              <TableCell>{card.menu_id}</TableCell>
              <TableCell>{card.menu_name}</TableCell>
              <TableCell>{card.created_id}</TableCell>
              <TableCell>{card.order_no}</TableCell>
              <TableCell>{card.title}</TableCell>
              <TableCell>
                <img src={card.image_url} alt={card.title} style={{ width: '50px', height: '50px' }} />
              </TableCell>
              <TableCell>{card.description}</TableCell>
              <TableCell>{card.home ? 'Yes' : 'No'}</TableCell>
              <TableCell>{card.type}</TableCell>
              <TableCell>{card.active ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>
                <Link to={`../sitio-edit/${card.id}`}>
                    <IconButton onClick={() => onEdit(card.id)} color="primary">
                        <EditIcon />
                    </IconButton>
                </Link> {/* Redirige a la página de edición */}
                <Link to={`../sitio-detail-edit/${card.id}`}>
                    Detalle 
                </Link> 
                <Link to={`../sitio-galeria-add/${card.id}`}>
                    <IconButton onClick={() => onEdit(card.id)} color="primary">
                        <PhotoLibraryIcon />
                    </IconButton>
                </Link> 
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onDelete(card.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CardTable;
