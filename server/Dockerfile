# Stage 1: Install all de depenedencies needed for build
# and development
FROM node:16.14-alpine3.15 AS deps
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable

# Development: Only run in develompent mode
FROM deps as development
COPY . .
CMD yarn dev:server

# Stage 2: Build typescrip into node js
FROM deps as build
COPY tsconfig.base.json ./
COPY server/ ./server
RUN yarn build:server

# Stage 3: Run nodejs app
FROM node:16.14-alpine3.15
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn plugin import workspace-tools
RUN yarn workspaces focus --production
COPY --from=build /app/dist/server ./dist

CMD node dist/main.js
