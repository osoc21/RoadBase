FROM node:14-alpine

WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/

RUN npm i
RUN npm i -g ember-cli

COPY . /app/

ENTRYPOINT ["ember", "serve",  "--proxy http://identifier:80/"]
