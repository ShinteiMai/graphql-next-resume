import "reflect-metadata";
import { ProfileResolver } from "@modules/resolvers/profile";
import {
  ChangePasswordResolver,
  ConfirmUserResolver,
  ForgotPasswordResolver,
  LoginResolver,
  LogoutResolver,
  MeResolver,
  RegisterResolver
} from "@modules/resolvers/user";
import { buildSchema } from "type-graphql";
import Container from "typedi";

/**
 * This will build all the GraphQL Schema based on all resolvers under the src/modules/* folder
 */
export const createSchema = () => {
  return buildSchema({
    resolvers: [
      ProfileResolver,
      LoginResolver,
      RegisterResolver,
      MeResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      ChangePasswordResolver,
      LogoutResolver,
    ],
    container: Container,
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
};
