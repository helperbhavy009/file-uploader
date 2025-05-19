# Project Name

This Project upload File and process the data on the basis of queue

## Features

- Login fetaure
- upload feature
- get uploaded file details


## Tech & Versions

- NestJS -> v10.0.0
- NodeJS -> v22.14.0
- Database -> PostgreSQL: v17.2
- ORM -> TypeOrm
- Typescript -> v5.1.3


## Installation Package

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
 
 ```

## Project Structure

```bash

src/
├── config/                      # Configuration files
│   ├── database.module.ts
│   ├── repository.service.ts
│   └── repository.service.spec.ts
│
├── entity/                      # TypeORM entity definitions
│   ├── file.entity.ts
│   └── user.entity.ts
│
├── guards/                      # Custom auth guards
│   ├── jwt.guard.ts
│   └── jwt.guard.spec.ts
│
├── helper/                      # Helper services and utilities
│   ├── bcrypt.service.ts
│   ├── bcrypt.service.spec.ts
│   ├── dao.service.ts
│   ├── dao.service.spec.ts
│   ├── job.processor.ts
│   ├── jwt-auth.service.ts
│   └── jwt-auth.service.spec.ts
│
├── module/                      # Feature modules
│   └── auth/
│       ├── controller/
│       │   ├── auth.controller.ts
│       │   └── auth.controller.spec.ts
│       ├── dto/
│       │   └── login.dto.ts
│       ├── service/
│       │   ├── auth.service.ts
│       │   └── auth.service.spec.ts
│       └── auth.module.ts
│
├── upload/                      # File upload feature module
│   ├── controller/
│   │   ├── file-upload.controller.ts
│   │   └── file-upload.controller.spec.ts
│   ├── dto/
│   │   └── upload-file.dto.ts
│   ├── service/
│   │   ├── file-upload.service.ts
│   │   └── file-upload.service.spec.ts
│   └── upload.module.ts
│
├── utils/                       # Utility constants and functions
│   └── message.ts
│
├── app.module.ts                # Root module
└── main.ts                      # App entry point
uploads/                         # Runtime folder for uploaded files

```

##Steps to run this Application in local

- Env is Already in this so you need to create database and alter accordingly
- Then make sure you are on Node version 22 
- After that you have install package with npm install command
- then run the npm run start:dev (it will create the tables automatically)
- then open your database and enter the below details in sql console for the user creation because we don't have any API.
- Insert Query (INSERT INTO public.users(email, password) VALUES ('jhon.doe@example.com',$2a$12$1Lav1JDdkQA10e3UgzVQZus.fxDJM9BMJ.G3amHrjqD5ajXHqRNQi)) 
- above encrypted password is (abcd@123). you can use this in the login.
- Now you ready test these API on Swagger. Swagger url is  :- (http://localhost:3000/api-docs)