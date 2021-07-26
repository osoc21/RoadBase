# Roadbase

## Introduction
Roadbase is a POC tool created for crowd-sourcing information about road marks in linked open data structure to enable (local) governments, companies & citizens to use and reuse this data, build new applications and create new roads to safety. This repository includes the tool meant for policy makers to design & request new signs & roadmarkings.

## Deployment
### Local deployment
> ❗ Make sure that **[ember-cli](https://cli.emberjs.com/release/)**, **[NodeJS](https://nodejs.org/en/)**, **[Git Bash](https://git-scm.com/downloads)** and **[Docker Desktop](https://www.docker.com/products/docker-desktop)** is installed on your system before continuing.

1. Open a terminal & clone this project to your system.
    ```bash
    git clone https://github.com/osoc21/RoadBase.git
    ```
2. Navigate to the folder where the project is located.
    ```bash
    cd ./RoadBase
    ```
3. Within the root of the project, run the Docker containers:
    ```bash
    docker-compose up
    ```
4. Navigate to the `front-end` directory and serve the ember application.
    > ❗ Make sure to include the proxy tag, otherwise the database cannot be contacted.
    
    >  🕓 Serving the application may take a while...
    ```bash
    ember s --proxy http://localhost:80
    ```
5. You can now access the application with the address the console returns. *(Normally, this should be http://localhost:4200)*

## Credits

## Additional Resources
