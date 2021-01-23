import { ApolloError } from "apollo-server-fastify";

// type MappedType<K, T> = {[K in keyof T]: {key: K, value: T[K]}}[keyof T];
type TErrors =
  | "NotFoundException"
  | "UnauthorizedException"
  | "InternalServerErrorException"
  | "RequestTimeoutException"
  | "ForbiddenException"
  | "ConflictException";

type TResponse = {
  [key in TErrors]: [string, string];
};

/** This were inspired by NestJS built-in HTTP Exceptions (Error Handling) */
const responses: TResponse = {
  NotFoundException: ["Resource was not found", "NOT_FOUND_EXCEPTION"],
  UnauthorizedException: ["You don't have the required permission", "UNAUTHORIZED_EXCEPTION"],
  InternalServerErrorException: ["An internal server error has happened", "INTERNAL_SERVER_ERROR_EXCEPTION"],
  RequestTimeoutException: ["Request Timeout", "REQUEST_TIMEOUT_EXCEPTION"],
  ConflictException: ["A Conflict Happened", "CONFLICT_EXCEPTION"],
  ForbiddenException: ["Forbidden Request", "FORBIDDEN_EXCEPTION"]
};

export class Errors extends ApolloError {
  constructor(type: TErrors, customMessage?: string) {
    super(!customMessage ? responses[type][0] : customMessage, type);
  }
}
