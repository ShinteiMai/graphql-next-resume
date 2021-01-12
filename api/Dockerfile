FROM node:12

# 1. Setup Container
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

# 2. Install dependencies
RUN yarn

# 3. Bundle App Source
COPY . .

# 4.  Run the server
EXPOSE 8080
RUN yarn build
CMD ["yarn", "start"]

