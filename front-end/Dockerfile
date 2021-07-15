FROM node:14-alpine

WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/

RUN npm i
RUN npm i -g ember-cli

COPY . /app/
RUN ember build --environment=production



FROM httpd:alpine

COPY --from=0 /app/dist /usr/local/apache2/htdocs/

RUN echo -e '<IfModule mod_rewrite.c>\nRewriteEngine On\nRewriteRule ^index\.html$ - [L]\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule (.*) index.html [L]\n</IfModule>' >> /usr/local/apache2/conf/httpd.conf
