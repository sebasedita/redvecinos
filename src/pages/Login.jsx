import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import 'remixicon/fonts/remixicon.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

function Login() {
  const [formData, setFormData] = useState({
    correoElectronico: '',
    contraseña: ''
  });
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData);
      const { token, rol } = response.data;
      localStorage.setItem('token', token); // Guardar el token en el almacenamiento local
      console.log('Inicio de sesión exitoso');
      navigate('/profile'); // Redirigir al usuario al dashboard
    } catch (error) {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
    }
  };

  return (
    <Box className="login-container">
      <Box className="login-form" component="form" onSubmit={handleSubmit}>
        <div className="icono-login">
          <i className="ri-user-line"></i>
        </div>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          name="correoElectronico"
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          margin="normal"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          InputProps={{
            startAdornment: <AccountCircleIcon />,
            style: { borderColor: focused ? '#bb2020' : '' }
          }}
          InputLabelProps={{
            style: { color: focused ? '#bb2020' : '' }
          }}
        />
        <TextField
          name="contraseña"
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          InputProps={{
            startAdornment: <LockIcon />,
            style: { borderColor: focused ? '#bb2020' : '' }
          }}
          InputLabelProps={{
            style: { color: focused ? '#bb2020' : '' }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px', backgroundColor: '#bb2020' }}
          type="submit"
        >
          INICIAR SESIÓN
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
