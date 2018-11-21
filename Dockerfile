FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN yarn install

RUN yarn run build

EXPOSE 8080

CMD [ "node", "app.js" ]
