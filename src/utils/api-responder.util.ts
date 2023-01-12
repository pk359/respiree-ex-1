import { Request, Response } from 'express';
import { IApiResponse } from '../types';


export class ApiResponder {
  private _hasError = false;
  private request: Request;
  private response: Response;
  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }

  public get hasError() {
    return this._hasError;
  }

  public set hasError(hasError: boolean) {
    this._hasError = hasError;
  }

  public sendApiRes<T>(response: IApiResponse<T>) {
    const {
      error: { code },
    } = response;

    this.response
      .status(code || 200)
      .json(response)
      .end();
  }
}
