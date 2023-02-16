import { NextFunction, Request, Response } from "express";

export const cors = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.setHeader("access-control-allow-origin", "*");
  response.setHeader("access-control-allow-methods", "*");
  response.setHeader("access-control-allow-headers", "*");
  next();
};
