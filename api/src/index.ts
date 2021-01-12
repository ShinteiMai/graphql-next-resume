import "reflect-metadata";

import * as path from "path";
import * as dotenv from "dotenv";
import cors from "cors";
import Express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { createSchema, redis, setupTypeORMConnection } from "@utils/main";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { getConnection } from "typeorm";

const main = async () => {
  /** 0. ENV & Database Setup */
  dotenv.config({
    path: path.join(__dirname + `/../.env`),
  });
  await setupTypeORMConnection();

  /** 1. Apollo Server Setup */
  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
    uploads: false,
    debug: !(process.env.NODE_ENV === "production"),
    playground: true,
    introspection: true,
    plugins: [
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection,
      }),
    ],
  });

  const app = Express();

  /** 2. Session Setup w/ Redis */
  const RedisStore = connectRedis(session as any) as any;
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: process.env.SESSION_NAME || "cookie",
      secret: process.env.SESSION_SECRET || "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: !!(process.env.NODE_ENV === "production"),
        maxAge: 1000 * 60 * 60 * 24 * Number(process.env.COOKIE_MAX_AGE || 365),
      },
    })
  );

  app.use(
    "/graphql",
    graphqlUploadExpress({
      maxFileSize: Number(process.env.MAX_FILE_SIZE) || 10000000,
      maxFiles: Number(process.env.MAX_FILES) || 10,
    })
  );

  app.use(
    cors({
      credentials: true,
      /** Enter your client's origin here */
      origin: process.env.ORIGIN || `http://localhost:3000`,
    })
  );

  /** 3. Running the Apollo Server */
  apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });
  app.listen(process.env.PORT || 8080, () => {
    console.log(
      `🚀 Freshproduce GraphQL API has started on http://localhost:${
        process.env.PORT || 8080
      }/graphql`
    );
  });
};

main().catch((err) => console.error(err));
