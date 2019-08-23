const { Router } = require('express');  //importar 

const routes = new Router();

routes.get('/', (req,res) => {
    return res.json({ message: 'Hello World'});
});

module.exports = routes;