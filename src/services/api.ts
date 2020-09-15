import axios from 'axios';

const api = axios.create({
  baseURL: 'http://secundario.logiquesistemas.com.br:8097/desafio-api/v1',
});

export default api;
