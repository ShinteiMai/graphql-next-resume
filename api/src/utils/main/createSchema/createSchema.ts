import {
  ChangePasswordResolver,
  ConfirmUserResolver,
  ForgotPasswordResolver,
  LoginResolver,
  LogoutResolver,
  MeResolver,
  ProfilePictureResolver,
  RegisterResolver,
} from "@modules/user";
import { buildSchema } from "type-graphql";

/**
 * This will build all the GraphQL Schema based on all resolvers under the src/modules/* folder
 */
export const createSchema = () => {
  return buildSchema({
    resolvers: [
      LoginResolver,
      RegisterResolver,
      MeResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      ChangePasswordResolver,
      ProfilePictureResolver,
      LogoutResolver,
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
};
