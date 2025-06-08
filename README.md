## Description

real time bus tracking system using NestJS, Socket.io, and MongoDB. This project allows users to track buses in real-time, providing live updates on bus locations and estimated arrival times.
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Entity-Relationship Diagram (ERD)
+-----------+           +----------+          +------------+
|   Bus     |<--------- |  Trip    | -------->|  Route     |
+-----------+           +----------+          +------------+
| id        |           | id       |          | name       |
| numberPlate|          | busId FK |          | origin     |
| operatorName|         | route    |          | destination|
| handicapSeatsTotal |  | startTime|          +------------+
| handicapSeatsAvailable| status   |
+-----------+           +----------+

Other potential tables (if extended):
+--------+       +--------+
| Stop   |       | Location (Realtime) |
+--------+       +---------------------+
| id     |       | id                  |
| name   |       | tripId FK           |
| lat    |       | lat, lng            |
| lng    |       | timestamp           |
| route  |       | handicapAvailability|
+--------+       +---------------------+

```sh
- Bus 1:N Trip: One bus can have multiple trips
- Trip contains the current trip information including route and startTime
- Route (optional entity) can hold metadata for route names and stops if you expand
```
[Screenshot 2025-06-07 at 10.54.44 PM.png](../../Desktop/Screenshot%202025-06-07%20at%2010.54.44%E2%80%AFPM.png) "ERD Diagram"
