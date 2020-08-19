import { Router } from 'express';

export interface ControllerInterface {
  path: string;

  router: Router;

  initRoutes: () => void
}
