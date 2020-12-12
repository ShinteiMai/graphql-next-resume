import { Errors } from "@tools/errors";
import { Context } from "@tools/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context.req.session?.userId) return Errors.UnauthorizedException();
  return next();
};
