import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // Todas las solicitudes serán prefijadas con /api
});

export default instance;
