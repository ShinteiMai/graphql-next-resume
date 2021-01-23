import "reflect-metadata";
import { ProfileResolver } from "@modules/resolvers/profile";
import { AuthResolver, UserResolver } from "@modules/resolvers/user";
import { buildSchema } from "type-graphql";
import Container from "typedi";

/**
 * This will build all the GraphQL Schema based on all resolvers under the src/modules/* folder
 */
export const createSchema = () => {
  return buildSchema({
    resolvers: [ProfileResolver, UserResolver, AuthResolver],
    container: Container,
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
};
