import { Context } from "@tools/types";
import { MiddlewareFn } from "type-graphql";

export const logger: MiddlewareFn<Context> = async ({ args }, next) => {
  console.log("args: " + args);
  return next();
};
