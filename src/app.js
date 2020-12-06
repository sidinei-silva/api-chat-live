import express from 'express';
import 'dotenv/config';

import { handlerError } from './app/middleware/index';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use((err, req, res, _next) => {
      return handlerError(err, req, res);
    });
  }
}

export default new App().server;
