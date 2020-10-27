import { Request, Response, NextFunction } from "express";
import { PermissionDeniedError } from "../errors/user";

export const checkPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
  permission: number
): Promise<void> => {
  console.log('req body ' , req.body)
  req.body.currentUser?.permissions?.includes(permission)
    ? next()
    : res.json(new PermissionDeniedError());
};
