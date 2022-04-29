FROM node:14-alpine

ENV APP_PATH /front
RUN mkdir $APP_PATH

WORKDIR $APP_PATH

COPY . $APP_PATH

RUN apk update && apk add bash

RUN yarn global add expo-cli