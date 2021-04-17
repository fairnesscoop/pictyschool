PictySchool is an open source and eco design school photo management software

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/fairnesscoop/pictyschool/CI)
[![codecov](https://codecov.io/gh/fairnesscoop/pictyschool/branch/master/graph/badge.svg)](https://codecov.io/gh/fairnesscoop/pictyschool)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/fairnesscoop/pictyschool/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/fairnesscoop/pictyschool/?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9ff796f1fa614239a0990d5b4932fc49)](https://app.codacy.com/gh/fairnesscoop/pictyschool?utm_source=github.com&utm_medium=referral&utm_content=fairnesscoop/pictyschool&utm_campaign=Badge_Grade)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/fairnesscoop/pictyschool)
[![GitHub license](https://img.shields.io/github/license/fairnesscoop/pictyschool.svg)](https://github.com/fairnesscoop/pictyschool)

## Technical stack

-   [Node.js](https://nodejs.org) / [Nestjs](https://nestjs.com/)
-   [TypeORM](https://typeorm.io)
-   [Typescript](https://www.typescriptlang.org/)
-   [Jest](https://jestjs.io/) / [Ts-mockito](https://github.com/NagRock/ts-mockito)
-   [Svelte](https://svelte.dev/) / [Sapper](https://sapper.svelte.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Docker](https://www.docker.com/)

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

-   API available on http://localhost/api
-   Client available on http://localhost

## Security

The client must send the user `apiToken` in the Authorization header when making requests to protected resources : `Authorization: Bearer <apiToken>`

At the installation of the project a default user was created :

```json
{
    "email": "john@doe.com",
    "password": "john"
}
```

To retrieve the `apiToken`, make a post request on `/login` with a user email and password.

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
