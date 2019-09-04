import { Router } from 'express'; // importar

import multer from 'multer'; // v19 = 03 ideo 01
import multerConfig from './config/mutter'; // v19 = 03 video 01

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController'; // video 21 03
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController'; // video 27 09
import NotificationController from './app/controllers/NotificationController'; // video 30 12

import authMiddleware from './app/middlewares/auth'; // video 15

const routes = new Router();

const upload = multer(multerConfig); // v19 = 03 video 01

routes.post('/users', UserController.store); // sem restricao //video 15
routes.post('/sessions', SessionController.store); // sem restricao //video 15

routes.use(authMiddleware); // aplica este middleware para todas as rotas abaixo //video 15
// routes.put('/users', authMiddleware, UserController.update); //poderia ser via middleware individual //video 15

routes.put('/users', UserController.update); // protegida

routes.get('/providers', ProviderController.index); // lista de prestadores //video 21 03

routes.post('/appointments', AppointmentController.store); // video 23 05 - agendamento de servico
routes.get('/appointments', AppointmentController.index); // video 25 07 - listagem de agendamentos
routes.delete('/appointments/:id/', AppointmentController.delete); // video 32 14 cancelamento de agendamento
routes.get('/schedule', ScheduleController.index); // video 27 09 - listagem de agendamentos do dia do prestador

routes.get('/notifications', NotificationController.index); // Video 30 12 listando notificacoes do usuario
routes.put('/notifications/:id', NotificationController.update); // video 31 13 marcar notificacoes como lidas

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
