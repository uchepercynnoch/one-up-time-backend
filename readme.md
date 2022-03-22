# HackerBay Backend Task API

- [Introduction](#intro)
    - [Design assumptions](#design-assumptions)
- [Instructions](#instructions)
    - [Requirements](#requirements)
    - [Database](#database)
    - [Build](#build)
    - [Run](#run)
    - [Test](#test)
    - [API endpoints](#api-calls)

## <a id="intro">Introduction</a>

Simple stateless microservice in Nodejs, with three major functionalities
 - Authentication
 - JSON patching
 - Image Thumbnail Generation

### Design assumptions

1. Login username and password are both _strings_ of any length
2. User can be created and saved in the database with username and password
3. Image can be created and saved in the database with url

---

## Instructions

First clone the repository, unzip, and open in your favourite IDE. Create files `.env` and `docker.env` for your configurations. File contents should look like so:
```
### .env ###
DB_DEV_URL=mongodb://localhost/dev_db
DB_PROD_URL=mongodb://localhost/prod_db
DB_TEST_URL=mongodb://localhost/test_db

### docker.env ###
DB_DEV_URL=mongodb://mongo/dev_db
DB_PROD_URL=mongodb://mongo/prod_db
DB_TEST_URL=mongodb://mongo/test_db

PORT=5000
JWT_KEY=<your jwt key>
JWT_EXPIRY=<your jwt expiry date>

NODE_ENV=<environment>

API_ROOT=/api/v1
```
The application runs different services as docker containers, so be sure to have __Docker__ installed globally on your PC. See
instructions on how to install for [Mac](https://docs.docker.com/desktop/mac/install/)
and [Windows](https://docs.docker.com/desktop/windows/install/). _Docker-Compose_ is used to orchestrate the service's containerization.

### <a id="requirements">Requirements</a>

 - Node.js@^14
 - MongoDB
 - Jest
 - Nginx
 - Docker
 - Swagger

### <a id="database">Database</a>

The application uses Mongodb database. The database configuration parameters are in the __.env__ and __docker.env__ files.  

### <a id="build">Build</a>

To build the application, open a terminal in the root directory of the application, then run the command `COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build &&  docker-compose up` or `./docker.sh`.
Where `docker.sh` bash file in the root directory of the application. Be sure to grant the file executable permissions e.g., on __MAC__, run `chmod +x docker.sh`. This will generate and run a docker image.

### <a id="run">Run</a>
To the run the application locally, run `npm start` on the terminal, whereas for the docker image, run `docker run image-name`

### <a id="test">Test</a>

To run tests, simply run on terminal `npm run test`.

### <a id="api-calls">API endpoints</a>
All API RESTFul resources  documented with Swagger and OpenAPI3 implementation, can be accessed using the endpoint `/api-docs`.

#### Request Body

_Login_

```json
{
  "username": "string",
  "password": "string"
}
```

_Generate image thumbnail_

```json
{
  "code": "string"
}
```

#### API endpoints table

| Name                                            | Method |                               Path                                |     Parameter(s)      |
| :---------------------------------------------- | :----: | :---------------------------------------------------------------: | :-------------------: |
| Login User                                      |  POST  |                             `/api/v1/login`                       |        `null`         |
| Generate Thumbnail                              |  POST  |                     `/api/v1/thumbnails`                          |        `null`         |
