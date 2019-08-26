import { Router } from 'express'; // importar

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth'; //video 15

const routes = new Router();

routes.post('/users', UserController.store); //sem restricao //video 15
routes.post('/sessions', SessionController.store); //sem restricao //video 15

routes.use(authMiddleware); //aplica este middleware para todas as rotas abaixo //video 15
//routes.put('/users', authMiddleware, UserController.update); //poderia ser via middleware individual //video 15

routes.put('/users', UserController.update); //protegida

export default routes;
