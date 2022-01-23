# Technical test - Backend

Hello! This is my propusal for an API development in backend. It uses:

- Node.js (JavaScript)
- TypeScript
- MySQL
- Sequelize
- Docker (with Docker compose)
- Jest (for unit testing, code coverage)

## Idea

This code is thinking starting as a monolithic project. The modules are thinking as an soon evolution of microservices.

We have a folder called `Server`. This is an instance of an http server and in the future will going separated with a module. Starting as a monolithic project all modules are in the same server.

A module is, in the most simple form, a table in a database. The implementation contains (generally, it can change in the future):

- Routing for an API
- Controllers for business logic
- Database for the instance
  - Functions to access to the same database
  - A singleton instance to access to the database
  - Interfaces for mapping fields between layers
  - A unique model for the module
- A folder to utils in the module (optional)

## Starting up

If you are in a Linux/OSX machine, open a terminal in the root of the project and type:

- `make build`
- `make up`

You MUST have installed [Docker Desktop](https://www.docker.com/products/docker-desktop) to run the commands.

To stop the docker instance: `make down`

In case that you are using a Windows machine you need to execute:

- `docker-compose build`
- `docker-compose up -d`

To stop: `docker-compose down`

## API Routing

### GET /user

Return a list of active users

### GET /user/:id

Return a list of a user with its ID.

### POST /user

Save a user in database

### PUT /user/:id

Update an existing user in database

### DELETE /user/:id

Make a soft delete in a user
