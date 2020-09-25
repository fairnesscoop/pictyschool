# Flashimages

## Technical stack

- [Node.js](https://nodejs.org) / [Nestjs](https://nestjs.com/)
- [TypeORM](https://typeorm.io)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) / [Ts-mockito](https://github.com/NagRock/ts-mockito)
- [Svelte](https://svelte.dev/) / [Sapper](https://sapper.svelte.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Prerequisites

You must have **[Docker](https://www.docker.com/)** and **[Docker Compose](https://docs.docker.com/compose/)**.

## Installation

At **the first launch**, just execute this command to install your application :

```bash
make install
```

For the **next times** you just need to execute this command to start your application :

```bash
make start

```

The server and client will be started:

- API documentation available on http://localhost:8080/api

## Helpers

This following command will display all available helpers :

```bash
make help
```

## Tests

Run the unit test suite with this following command:

```bash
make test
```

## Credits

Created by [Fairness](https://fairness.coop)
