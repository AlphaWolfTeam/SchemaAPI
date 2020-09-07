import { Request, Response, NextFunction } from 'express';

export const wrapAsync = (func: any)=> {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(next);
    };
}
