import { Express } from 'express';
import { getPatients } from './controllers/patients.controller';

export const listenForApis = (server: Express) => {
  server.get('/api/get-patients', getPatients);
};
