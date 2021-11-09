FROM node:14.17.6-buster-slim

WORKDIR /app

COPY package.json /app/

RUN npm install --production

COPY dist/prod.js /app/

ENV CLIENT_URL https://same-client-ui.herokuapp.com

ENV NODE_ENV production

CMD node prod.js --bind:0.0.0.0