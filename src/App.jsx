// src/App.jsx
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile'; // Asegúrate de que la ruta y el nombre sean correctos
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute'; // Ajusta la ruta según sea necesario

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
      </Routes>
    </div>
  );
};

export default App;
