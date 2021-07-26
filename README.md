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

### Server Deployment
For the server deployment, please visit [this guide](https://github.com/osoc21/RoadBase/blob/master/misc/deployment/README.md).

## Credits
### Technical Team

- Bo Robbrecht
    - [Linked](https://www.linkedin.com/in/borobbrecht/)
    - [GitHub](https://github.com/BT-Creator)
- Hans Vertriest
    - [LinkedIn](https://www.linkedin.com/in/hans-vertriest-a57763174/)
    - [GitHub](https://github.com/hansvertriest)
- Julia Van Der Kris
    - [LinkedIn](https://www.linkedin.com/in/sam-van-der-kris-041226168/)
    - [GitHub](https://github.com/samvdkris/)
- Sybren De Boever
    - [LinkedIn](https://www.linkedin.com/in/sybren-de-boever-27281b114/)
    - [Github](https://www.linkedin.com/in/sybren-de-boever-27281b114/)
- Lieselot Geirnaert
    - [LinkedIn](https://www.linkedin.com/in/lieselotgeirnaert/)
    - [Github](https://github.com/lieselotgeirnaert)
### Strategical Team
- Ilya Plyusnin
    - [LinkedIn](https://www.linkedin.com/in/ilya-plyusnin-6bba6911a/)
    - [Github](https://github.com/HungryHypnoHippo)
- Inés Elvira Pérez
    - [LinkedIn](https://www.linkedin.com/in/in%C3%A9s-elvira-797326135/)
    - [Github](https://github.com/seniep)
- Fien Goedman
    - [LinkedIn](https://www.linkedin.com/in/fien-goeman-9632a61b5/)
- Xuan Hung Dinh
    - [LinkedIn](https://www.linkedin.com/in/ameliodinh210/)
### Coaches
- Initi Valderas Caro
    - [LinkedIn](https://www.linkedin.com/in/inti-valderas-caro/)
- Jodi De Loof
    - [LinkedIn](https://www.linkedin.com/in/jodideloof/)
    - [GitHub](https://github.com/jodiDL)

## Additional Resources

For additional information, visit our [Engineering Wiki](https://roadbase.notion.site/Engineering-Wiki-f926251e176e4a8abecd464d30d8aea4).
