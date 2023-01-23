# Twitter clone server

A minimalist twitter clone server

## Installing / Getting started

The first time, you will need to run

```shell
npm install
cp .env.example .env
```

Then just start the server with

```shell
npm run start
```
It uses nodemon for hot reload.

## Developing

### Built With

- [express](https://expressjs.com/fr/): Fast, unopinionated, minimalist web 
framework for Node.js.

### Prerequisites

To get started, have [node](https://nodejs.org/en/) (tested with v16.14.2).

### Setting up Dev

In order to start developing the project further:

```shell
git clone https://github.com/hammenm/twitter-clone-setup.git
cd twitter-clone-setup/
npm install
```

It will install the dependencies for the project.

You can also setup the environment variables

```shell
cp .env.example .env
```

## Configuration

The configuration is indicated in the `.env` file. For now the available options are :

- `PORT`(Optional): Port where the server is running
