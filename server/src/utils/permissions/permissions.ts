import { Request, Response, NextFunction } from "express";
// import { PermissionDeniedError } from "../errors/user";

export const checkPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
  permission: number
): Promise<void> => {
  // req.body.currentUser?.permission?.includes(permission)
  //   ? next()
  //   : res.json(new PermissionDeniedError());
  if(res&&req&&permission){

  }
  next()
};
