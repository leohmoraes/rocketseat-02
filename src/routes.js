import { Router } from 'express'; // importar

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post("/users", UserController.store);

export default routes;
