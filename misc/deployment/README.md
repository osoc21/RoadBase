# RoadBase - Deployment documentation
## Applications
RoadBase consists of the following services that need to be deployed:
### Frontend
The frontend is a simple Ember application that runs in a docker container.

### Backend
The RoadBase backend consists of multiple services:
- semtech/mu-identifier:1.9.1
- semtech/mu-dispatcher:2.0.0
  - Mounted volumes: ./config/dispatcher:/config
- tenforce/virtuoso:virtuoso7.2.5
  - Environment variables: SPARQL_UPDATE & DEFAULT_GRAPH
  - Mounted volumes: ./data/db:/data and ./config/virtuoso.ini:/data/virtuoso.ini
- semtech/mu-cl-resources:1.20.0
  - Mounted volumes: ./config/resources:/config
- semtech/mu-migrations-service:0.7.0
  - Mounted volumes: ./config/migrations:/data/migrations
  - Environment variables: BATCH_SIZE (Otherwise virtuoso will create pretty long SQL queries and keep retrying with a smaller batch size until it succeeds)

### Caddy
open source web server with automatic HTTPS written in Go. Also running in a docker container.

## Github actions
All docker images are build and pushed to docker hub using github actions ([roadbase-main.yml](https://github.com/osoc21/RoadBase/blob/master/.github/workflows/roadbase-main.yml)).

If you want to change which docker hub repository the images are pushed to, change DOCKER_PASSWORD and DOCKER_USER in the github "secrets" settings:

![github secrets](https://i.imgur.com/YCqEylB.png)

## Deployment
To setup deployment on any server, a [docker-compose.yml](https://github.com/osoc21/RoadBase/blob/master/misc/deployment/docker-compose.yml) has been created in this folder. If the docker hub repository has changed, don't forget to edit the image links in this file as well.

## Server
_Issue: Importing the accident database and migrating it to linked open data generates a huge load on the server which causes the docker compose to fail if not enough memory is available (tried using 1gb of RAM on a digital ocean droplet). The current fix was to only migrate a small part of this dataset to prove technical viability._

The way this deployment is setup, no source is needed on the server itself. The only file that is necessary is the docker-compose.yml file.

### Full setup
- Install docker on the server: [Docker documentation](https://docs.docker.com/engine/install/ubuntu/)
- Copy the [docker-compose.yml](https://github.com/osoc21/RoadBase/blob/master/misc/deployment/docker-compose.yml) file to the server and edit it to use the correct docker hub images.
- If the docker hub repository is private, don't forget to login using "docker login -u your_username -p your_password"
- Run the "docker-compose up" command in the directory on the server that contains the docker-compose.yml file. This will also spin up the Caddy server image so no nginx is needed.
- If desired, follow the watchtower documentation for automatic deployment to the server.

## Automatic deployment
For the automatic deployment, [watchtower](https://github.com/containrrr/watchtower) will be used to automate the refresh of the images after they are pushed to docker hub.

Run the following command to start the watchtower docker container and pol for the change of images every 2 mins:

````
docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower \
  --interval 120
````

(more documentation to be added while doing the actual deploy)

## Current server
164.90.192.163
roadbase.osoc.be
