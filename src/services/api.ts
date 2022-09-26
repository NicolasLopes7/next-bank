import axios, { HeadersDefaults } from 'axios';

export const api = axios.create({
  baseURL: 'https://sql-node-project.up.railway.app',
});

export interface CommonHeaderProps extends HeadersDefaults {
  authorization: string;
}
