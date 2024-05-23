// src/components/Card.jsx
import React from 'react';
import { Card as MuiCard, CardContent, Typography, CardMedia, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import './Card.css';

function Card({ image, name, service, rating }) {
  return (
    <MuiCard className="card">
      <CardMedia
        component="img"
        height="140"
        image={image || './src/assets/default-profile.jpg'} // Muestra una imagen por defecto si no hay imagen
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {service}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Rating value={rating} readOnly />
        </Box>
      </CardContent>
    </MuiCard>
  );
}

export default Card;
