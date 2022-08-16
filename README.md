# Simple Social Backend Server

Node.js social media application with rudimentary features inspired by existing social media platforms such as Facebook and Twitter 

## Features

- Content Management System for instructors to create courses, modules and their contents

- Course catalog where students can browse and enroll in different courses. 

- Students can access contents for their enrolled courses

- JSON RESTful API with endpoints to retrieve subjects, retrieve available courses and their contents, and enroll in a course

## SetUp Instructions

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
$ mongo
```

```
Run the development server

```bash
$ npm run dev
```

Open the API at [http://127.0.0.1:3000](http://127.0.0.1:3000)
