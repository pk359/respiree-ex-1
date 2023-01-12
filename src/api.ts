import { Express } from 'express';
import { getPatients } from './controllers/patients.controller';

export const listenForApis = (server: Express) => {
  server.get('/api/shop/merchant-list', getPatients);
};
