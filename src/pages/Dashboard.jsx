import React, { useState, useEffect } from 'react';
import { Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the API
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleEdit = (userId) => {
    // Logic to edit user
  };

  const handleDelete = (userId) => {
    // Logic to delete user
  };

  const handleSaveChanges = () => {
    // Logic to save changes
  };

  return (
    <Container>
      <Box mt={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre completo</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Profesión</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Servicios</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.nombreCompleto}</TableCell>
                  <TableCell>{user.correoElectronico}</TableCell>
                  <TableCell>{user.telefono}</TableCell>
                  <TableCell>{user.profesion}</TableCell>
                  <TableCell>{user.direccion}</TableCell>
                  <TableCell>{user.servicios}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(user.id)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleSaveChanges}>
            Guardar cambios
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
