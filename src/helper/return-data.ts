import { Response } from 'express';
import { IUnifyResponse } from '../types/helper';

export function unifyResponse(res: Response, result: IUnifyResponse = {}, status = 200) {
  if (!result.profile) {
    result.profile = {};
  }
  if (!result.data) {
    result.data = null;
  }
  return res.status(status).json(result);
}

export function existResponse(res: Response, msg: string) {
  return res.status(400).json({ error: msg });
}

export function loginFailResponse(res: Response, msg: string) {
  return res.status(400).json({ error: msg });
}
