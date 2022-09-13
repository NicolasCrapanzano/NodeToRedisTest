FROM node

WORKDIR /app

COPY package.json ./

RUN "npm install"

COPY . .

ENV PORT=6379

EXPOSE 6379

CMD [ "npm", "start"]