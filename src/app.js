import express from 'express';
import path from 'path'; //video 21 03
import routes from './routes';

import './database';

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
    this.server.use( ///video 21 03
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
