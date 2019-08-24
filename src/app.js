import express from 'express';
import routes from './routes';

// nova sintaxe... usando no react js/native
// import express from 'express';
// ..para usar pode adicionar o babel...sucrase...  no desenvolvimento
// yarn add sucrase nodemon -D
// rodar: yarn sucrase-node src/server.js

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
