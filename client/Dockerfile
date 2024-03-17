# build client
FROM node:14 AS build

WORKDIR /client

COPY package*.json /client

RUN npm install

COPY . /client

ARG REACT_APP_SERVER_URL

ENV REACT_APP_SERVER_URL=${REACT_APP_SERVER_URL}

RUN npm run build

RUN npm install -g serve
