import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://sql-node-project.up.railway.app',
});
