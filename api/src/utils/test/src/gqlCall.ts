import { graphql, GraphQLSchema } from "graphql";

import { createSchema } from "../../main/createSchema/createSchema";
import { Maybe } from "graphql/jsutils/Maybe";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: number;
}

let schema: GraphQLSchema;

export const gqlCall = async ({ source, variableValues, userId }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      request: {
        session: {
          userId,
        },
      },
      reply: {
        clearCookie: jest.fn(),
      },
    },
  });
};
