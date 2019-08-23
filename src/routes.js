import { Router } from 'express';  //importar 

const routes = new Router();

routes.get('/', (req,res) => {
    return res.json({ message: 'Hello World'});
});

export default routes;