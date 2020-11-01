import { Router } from 'express';

export abstract class ControllerInterface {
  path: string;

  router: Router;

  initRoutes: () => void;
}
