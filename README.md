## Description

Nest Project implemented with hexagonal arquitecture, docker, prisma ORM and testing with superTest to getting contracts list and create contracts in postgres database.


## Requirements
- Docker
- node 20.16.0.
- Set your postgres envs like in .env.template


## Installation

```bash
$ yarn install
```

## Running the app
Verify that your postgres instance is running in the defined port.

```bash
# development create database and run
$ docker-compose up -d

```bash
# development migrations database
$ npx prisma migrate dev

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Contact

- Author - Nicolas Carreño


## License

Nest is [MIT licensed](LICENSE).
