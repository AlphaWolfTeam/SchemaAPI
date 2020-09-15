// import * as http from 'http';
import express from 'express';
import * as bodyParser from 'body-parser';
// import * as helmet from 'helmet';
// import * as logger from 'morgan';
// import { once } from 'events';
// import { errorMiddleware } from './utils/error';
import appRouter from './router';
import {
  userErrorHandler,
  serverErrorHandler,
  unknownErrorHandler
} from './utils/errors/handler';

class Server {
    private app: express.Application;

    // private http: http.Server;

    private port: number;

    constructor(port: number) {
        this.app = Server.createExpressApp();
        this.port = port;
    }

    static createExpressApp() {
        const app = express();
        // app.use(helmet());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        // app.use(logger('dev'));
        app.use(userErrorHandler);
        app.use(serverErrorHandler);
        app.use(unknownErrorHandler);
        app.use(appRouter);
        // app.use(errorMiddleware);

        return app;
    }

    async start() {
      this.app.listen(this.port, () => {
        console.log(
          `Server running on port ${this.port}`,
        );
      });
      
        // this.http = this.app.listen(this.port);
        // await once(this.http, 'listening');
    }
}

export default Server;
