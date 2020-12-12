import { Request, Response } from "express";

export interface Context {
  req: Request & { session: { userId?: string } };
  res: Response;
}
