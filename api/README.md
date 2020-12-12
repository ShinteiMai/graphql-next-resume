# GraphQL API Boilerplate

An awesome boilerplate for initializing a GraphQL API with modern technologies!

## Technologies
- TypeScript
- apollo-server-express 
- TypeGraphQL
- TypeORM
- PostgreSQL

## Development Guideline
We are using `yarn` as our package manager, please don't use `npm` as it will generate `package-lock.json`.
#### Pre-requisites for Development
- Make sure to install [redis](https://redis.io/download), as it's needed to cache user sessions 
- Create a database for `development` and `testing`. checkout `ormconfig.json` for the database configuration
- Setup the .env files and name the development environment as `env.development`. Check `.env.sample` for the required variables
- Install recommended extensions as it will help you in developing a GraphQL API

#### Commands
- `yarn` to install dependencies 
- `yarn dev` to start development
- `yarn test` to start testing
- `yarn start` to start production server

#### GraphQL Playground
When starting the development server, you can access the GraphQL Playground in [http://localhost:8080/graphql](http://localhost:8080/graphql).

**Enabling Cookies for Authentication in GraphQL Playground**
In GraphQL Playground Settings, make sure that you set the `"request.credentials"` header to: ` "request.credentials": "same-origin"`. Otherwise, the playground won't save the cookie that was sent by the server. 

## Deploying Guideline 
We are using `docker` and `docker-compose` to handle our zero-configuration deployment, so make sure that you install both of those either in your *local machine* or in the *production container*.

#### 1. Setting up environment variables for production
0. Create a .env file in root directory called `.env.production` and copy the contents of the .env.sample to that file.
1. Please adjust the `Production Database Configuration` .env section with your production configuration in `ormconfig.json`

#### 2. Orchestrating the docker-compose
Run `yarn deploy` and wait while the image is being built, after the process ends the production server will run in the background and you can verify it by running `docker ps`

#### 3. Reverse-proxy the GraphQL API Docker Container with nginx
Just do the usual stuff with nginx, I have prepared `nginx.conf` so you don't have to make your own reverse-proxy config again.



