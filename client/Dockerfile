FROM node:14 AS build

WORKDIR /client

ENV REACT_APP_SERVER_URL="ebat: ${SERVER_URL}"

COPY package*.json ./

RUN npm install

COPY . /client

RUN npm run build

RUN npm install -g serve