import { ApolloError } from "apollo-server-express";

/** This were inspired by NestJS built-in HTTP Exceptions (Error Handling) */
class GraphQLErrors {
  /** If resource was not found in the database   */
  NotFoundException(message?: string) {
    throw new ApolloError(
      message || "Resource was not found",
      "NOT_FOUND_EXCEPTION"
    );
  }

  /** If user tried to access restricted  */
  UnauthorizedException(message?: string) {
    throw new ApolloError(
      message || "You don't have the required permission",
      "UNAUTHORIZED_EXCEPTION"
    );
  }

  /** If an internal server error has happened  */
  InternalServerErrorException(message?: string) {
    throw new ApolloError(
      message || "An internal server error has happened",
      "INTERNAL_SERVER_ERROR_EXCEPTION"
    );
  }

  /** If there is a timeout error */
  RequestTimeoutException(message?: string) {
    throw new ApolloError(
      message || "Request timeout",
      "REQUEST_TIMEOUT_EXCEPTION"
    );
  }

  /** If there is a conflict */
  ConflictException(message?: string) {
    throw new ApolloError(
      message || "A conflict happened",
      "CONFLICT_EXCEPTION"
    );
  }

  /** If requested request is forbidden */
  ForbiddenException(message?: string) {
    throw new ApolloError(
      message || "Forbidden Request",
      "FORBIDDEN_EXCEPTION"
    );
  }
}

export const Errors = new GraphQLErrors();
