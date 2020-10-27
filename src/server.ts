import express from "express";
import * as bodyParser from "body-parser";
import appRouter from "./router";
import {
  userErrorHandler,
  serverErrorHandler,
  unknownErrorHandler,
} from "./utils/errors/handler";
import cors from 'cors';

class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = Server.createExpressApp();
    this.port = port;
  }

  static createExpressApp() {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(userErrorHandler);
    app.use(serverErrorHandler);
    app.use(unknownErrorHandler);
    app.use(appRouter);

    return app;
  }

  async start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
