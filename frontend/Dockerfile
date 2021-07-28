FROM node:14-alpine

WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/

RUN npm i
RUN npm i -g ember-cli

COPY . /app/
RUN ember build --environment=production



FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html

# Server config (overwrite routing to /index.html)
RUN echo -e 'server {\n    listen 80;\n    server_name localhost;\n    location / {\n        root /usr/share/nginx/html;\n        try_files $uri $uri/ /index.html;\n    }\n}' > /etc/nginx/conf.d/default.conf

# Change BACKEND_URL to environment variable on runtime (hacky shit but it works)
RUN echo -e '#!/bin/sh\n\nsed -i "s|http://localhost:8000|$BACKEND_URL|" $(find /usr/share/nginx/html/assets/ -type f)\nsed -i -r "s/integrity=\"sha256-.{44} sha512-.{88}\" //" /usr/share/nginx/html/index.html' > /docker-entrypoint.d/api_domain_from_env.sh
RUN chmod +x /docker-entrypoint.d/api_domain_from_env.sh
