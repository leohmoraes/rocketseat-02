import { Router } from 'express'; // importar
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  // testando criar um usuario, uasr o await quando acessar o bd

  const user = await User.create({
    name: 'Leo Moraes',
    email: Math.random(0,4) + 'leo@intradebook.com',
    password_hash: '123456',
  });

  return res.json(user);
});

export default routes;
