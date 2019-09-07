import express from 'express';
import path from 'path'; // video 21 03
import Youch from 'youch'; // Video 39 21 tratamento de erros

import * as Sentry from '@sentry/node'; // Video 39 21 tratamento de erros
import 'express-async-errors'; // Video 39 21 tratamento de erros

import routes from './routes';
import sentryConfig from './config/sentry'; // Video 39 21 tratamento de erros

import './database';

// nova sintaxe... usando no react js/native
// import express from 'express';
// ..para usar pode adicionar o babel...sucrase...  no desenvolvimento
// yarn add sucrase nodemon -D
// rodar: yarn sucrase-node src/server.js

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig); // Video 39 21 tratamento de erros
    this.middlewares();
    this.routes();

    this.exceptionHandler(); // Video 39 21 tratamento de erros

  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler()); // Video 39 21 tratamento de erros
    this.server.use(express.json());
    this.server.use(
      // /video 21 03
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.requestHandler()); // Video 39 21 tratamento de erros
  }

  exceptionHandler() { // Video 39 21 tratamento de erros
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON(); // toHTML();

      return res.status(500).json(errors);
    });
  }
}

export default new App().server;
