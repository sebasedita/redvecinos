// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Card from '../components/Card';
import axios from 'axios';
import './Home.css';

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/hello')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching the message:', error);
      });
  }, []);

  const serviceProviders = [
    { image: './src/assets/image1.jpg', name: 'Antonia Ospina', service: 'Clases de física', rating: 0 },
    { image: './src/assets/image2.jpg', name: 'Miguel Cruz', service: 'Mecánico', rating: 4},
    { image: './src/assets/image3.jpg', name: 'Olga Diaz', service: 'Niñera por horas', rating: 3 },
    { image: './src/assets/image4.jpg', name: 'Gabriela', service: 'Clases de Guitarra', rating: 5 },
    { image: './src/assets/image5.jpg', name: 'Laura Orozco', service: 'Entrenadora', rating: 2 },
    { image: './src/assets/image6.jpg', name: 'Andres Ortiz', service: 'Servicio de impresión', rating: 4 },
    { image: './src/assets/image7.jpg', name: 'Cristian Gil', service: 'Creador de páginas web', rating: 4 },
    { image: './src/assets/image8.jpg', name: 'Carlos Muñoz', service: 'Fotógrafo profesional', rating: 0 },
    { image: './src/assets/image9.jpg', name: 'Maria Franco', service: 'Transporte aeropuerto', rating: 1 },
    { image: './src/assets/image10.jpg', name: 'Lina Montoya', service: 'Tratamientos de belleza', rating: 5 },
  ];

  return (
    <Container>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        {message}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {serviceProviders.map((provider, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <Card {...provider} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
  <Button 
    variant="contained" 
    sx={{ backgroundColor: '#bb2020', '&:hover': { backgroundColor: '#a01b1b' } }} 
    className="view-all"
  >
    Ver todos
  </Button>
</Box>

    </Container>
  );
}

export default Home;