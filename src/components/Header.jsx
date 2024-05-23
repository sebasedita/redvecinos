// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Menu, MenuItem, Box, Typography, Button } from '@mui/material';
import { AccountCircle, Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar className="toolbar">
        <Box display="flex" alignItems="center" className="header__left">
        <Link to="/"> 
        <img src="./src/assets/logo.png" alt="Red de Vecinos Logo" className="header__logo" />
        </Link>
          <Typography variant="h6" className="header__title">Red de Vecinos</Typography>
        </Box>
        <Box className="header__middle">
        <Box className="search-bar">
         <InputBase
          placeholder="Buscar…"
          classes={{ root: 'search-input', input: 'input' }}
          inputProps={{ 'aria-label': 'search' }}
        />
  <IconButton type="submit" aria-label="search" sx={{ color: '#bb2020' }}>
    <SearchIcon />
  </IconButton>
</Box>

        </Box>
        <Box className="header__right">
          
          <Box display="flex" alignItems="center" className="user-menu">
            <IconButton
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
          
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/login">Iniciar sesión</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/register">Registrarse</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
