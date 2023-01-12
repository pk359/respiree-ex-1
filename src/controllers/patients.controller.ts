import { Request, Response } from 'express';
import { ApiResponder } from '../utils';

import { DatabaseService } from '../database/connection';

export const getPatients = async (request: Request, response: Response) => {
  const sar = new ApiResponder(request, response);
  
};
