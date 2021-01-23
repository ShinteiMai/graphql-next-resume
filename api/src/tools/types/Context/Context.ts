import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { IncomingMessage, Server, ServerResponse } from "http";
export interface Context {
  request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage> & {
    session: { userId?: string };
    /** Allows to destroy the session in the store. */
    destroySession(callback: (err?: Error) => void): void;
  };
  reply: FastifyReply<
    Server,
    IncomingMessage,
    ServerResponse,
    RouteGenericInterface,
    unknown
  >;
  next: HookHandlerDoneFunction;
}
