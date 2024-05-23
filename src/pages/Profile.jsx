import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Avatar } from '@mui/material';
import axios from 'axios';
import './Profile.css'; // Asegúrate de tener este archivo CSS en el mismo directorio

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    direccion: '',
    telefono: '',
    profesion: '',
    servicios: '',
    perfilImage: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/profile/${userId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener el perfil del usuario:', error);
      });
  }, [userId]);

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Avatar
            alt={userData.nombreCompleto}
            src={userData.perfilImage}
            sx={{ width: 150, height: 150, marginRight: 4 }}
          />
          <Box>
            <Typography variant="h5">
              Nombre: {userData.nombreCompleto}
            </Typography>
            <Typography variant="h6">
              Profesión: {userData.profesion}
            </Typography>
            <Typography variant="h6">
              Servicio: {userData.servicios}
            </Typography>
            <Typography variant="h6">
              Valor: 40.000 / hora
            </Typography>
            <Typography variant="h6">
              WhatsApp: {userData.telefono}
            </Typography>
            <Typography variant="h6">
              Correo: {userData.correoElectronico}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
          <Button variant="contained" color="primary" sx={{ backgroundColor: '#bb2020', marginRight: 2 }}>
            Comentarios
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
