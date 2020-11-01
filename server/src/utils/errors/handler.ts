import * as express from "express";
import { ServerError, UserError } from "./application";

const userErrorHandler = (
  error: Error,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (error instanceof UserError) {
    res.status(error.status).send({
      type: error.name,
      message: error.message,
    });
    next();
  } else {
    next(error);
  }
};

const serverErrorHandler = (
  error: Error,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (error instanceof ServerError) {
    res.status(error.status).send({
      type: error.name,
      message: error.message,
    });

    next();
  } else {
    next(error);
  }
};

// export function rabbitmqErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
//     if (error instanceof RabbitmqError) {
//         res.status(error.status).send({
//             type: error.name,
//             message: error.message,
//         });

//         next();
//     } else {
//         next(error);
//     }
// }

const unknownErrorHandler = (
  error: any,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(error && error.status ? error.status : 500).send({
    type: error.name,
    message: error.message,
  });

  next(error);
};

export { userErrorHandler, serverErrorHandler, unknownErrorHandler };
