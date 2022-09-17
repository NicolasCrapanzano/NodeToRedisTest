FROM node:alpine

WORKDIR /app

COPY package.json tsconfig.json yarn.lock ./

RUN yarn install

COPY ./ ./

RUN yarn build

ENV PORT=5000

EXPOSE 5000

CMD [ "node", "build/index.js" ]