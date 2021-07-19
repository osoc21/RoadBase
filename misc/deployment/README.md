# RoadBase - Deployment directions
## Applications
RoadBase consists of the following services that need to be deployed:
### Frontend
The frontend is a simple Ember application that runs in a docker container.

### Backend
The RoadBase backend (v3.4) consists of multiple containers that can be executed using docker compose:
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

