const express = require('express');
const routes = require('./routes');

class App {
    constructor() {
        console.log("iniciado");
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        console.log("middlewares");
        this.server.use(express.json());
    }

    routes(){
        console.log("routes");
        this.server.use(routes);
    }
}

module.exports = new App().server;
