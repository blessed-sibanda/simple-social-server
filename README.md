# Simple Social Backend Server

Node.js social media application with rudimentary features inspired by existing social media platforms such as Facebook and Twitter 

## Features

- Users can sign-up and sign-in 

- Users can update their profiles with a description and profile photo

- Users can follow each other

- Users can post messages (with photos)

- Users can read, comment and like/unlike posts from followed users

## Set-Up Instructions

### Install [Git](https://git-scm.com/downloads)

Clone this repo and `cd` into it

```bash
$ git clone https://github.com/blessed-sibanda/simple-social-server
$ cd simple-social-server
```

### Install [Node.js](https://nodejs.org/en/) (version 16 or later)

Install NPM dependencies

```bash
$ npm install
```

### Run MongoDB Using [Docker](https://www.docker.com/get-started/)

```bash
$ docker run -p27017:27017 --name local-mongo mongo:4.4.2
```

Access MongoDB Shell

```bash
$ docker exec -it local-mongo sh
# mongo
```

Run the development server

```bash
$ npm run dev
```

Open the API at [http://127.0.0.1:3000](http://127.0.0.1:3000)

#### To Run the Frontend, clone this [repo](https://github.com/blessed-sibanda/simple-social) and follow instructions
