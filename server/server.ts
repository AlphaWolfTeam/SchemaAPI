import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import config from './config';
import AppRouter from './router';

export default class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  private constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(AppRouter);
    this.app.listen(config.server.port, () => {
      console.log(
        `Server running on port ${config.server.port}`,
      );
    });
  }
}