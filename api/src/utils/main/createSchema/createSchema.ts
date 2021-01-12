import "reflect-metadata";
import { ProductResolver } from "@modules/resolvers/product";
import {
  ChangePasswordResolver,
  ConfirmUserResolver,
  ForgotPasswordResolver,
  LoginResolver,
  LogoutResolver,
  MeResolver,
  ProfilePictureResolver,
  RegisterResolver,
} from "@modules/resolvers/user";
import { buildSchema } from "type-graphql";
import Container from "typedi";

/**
 * This will build all the GraphQL Schema based on all resolvers under the src/modules/* folder
 */
export const createSchema = () => {
  return buildSchema({
    resolvers: [
      ProductResolver,
      LoginResolver,
      RegisterResolver,
      MeResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      ChangePasswordResolver,
      ProfilePictureResolver,
      LogoutResolver,
    ],
    container: Container,
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
};
