import { createSchema, redis, setupTypeORMConnection } from "@utils/main";
import { ApolloServer } from "apollo-server-fastify";
import connectRedis from "connect-redis";
import * as dotenv from "dotenv";
import fastify from "fastify";
import fastifyCookie from "fastify-cookie";
import cors from "fastify-cors";
import fastifySession from "fastify-session";
import * as path from "path";
import "reflect-metadata";
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
    context: ({ request, reply }: any) => ({ request, reply }),
    debug: !(process.env.NODE_ENV === "production"),
    playground: true,
    plugins: [
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection,
      }),
    ],
  });

  const app = fastify();

  /** 2. Session Setup w/ Redis */
  const RedisStore = connectRedis(fastifySession as any) as any;
  app.register(fastifyCookie);
  app.register(fastifySession, {
    store: new RedisStore({
      client: redis,
    }),
    cookieName: process.env.SESSION_NAME || "cookie",
    secret: process.env.SESSION_SECRET || "secret",
    cookie: {
      httpOnly: true,
      secure: !!(process.env.NODE_ENV === "production"),
      maxAge: 1000 * 60 * 60 * 24 * Number(process.env.COOKIE_MAX_AGE || 365),
    },
  });

  app.register(cors, {
    credentials: true,
    /** Enter your client's origin here */
    origin: process.env.ORIGIN || `http://localhost:3000`,
  });

  /** 3. Running the Apollo Server */
  console.log(
    `🚀 GraphQL API has started on http://localhost:${
      process.env.PORT || 8080
    }/graphql`
  );
  app.register(apolloServer.createHandler({ cors: true, path: "/graphql" }));
  await app.listen(process.env.PORT || 8080);
};

main().catch((err) => console.error(err));
