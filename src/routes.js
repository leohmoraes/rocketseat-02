import { Router } from 'express'; // importar

import multer from 'multer'; // v19 = 03 ideo 01
import multerConfig from './config/mutter'; // v19 = 03 video 01

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth'; // video 15

const routes = new Router();

const upload = multer(multerConfig); // v19 = 03 video 01

routes.post('/users', UserController.store); // sem restricao //video 15
routes.post('/sessions', SessionController.store); // sem restricao //video 15

routes.use(authMiddleware); // aplica este middleware para todas as rotas abaixo //video 15
// routes.put('/users', authMiddleware, UserController.update); //poderia ser via middleware individual //video 15

routes.put('/users', UserController.update); // protegida

routes.post('/files', upload.single('file'), (req, res) => {
  // v19 = 03 video 01
  return res.json({ ok: true });
});

export default routes;
