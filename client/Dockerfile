# build client
FROM node:14 AS build

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

ENV INLINE_RUNTIME_CHUNK=false

RUN npm run build
