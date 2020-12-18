# Dockerized Library API
Dockerized Rest API and GraphQL for a library with authentication, caching and messaging.

## Migrations and Seeds
- `npm run add-migration {MIGRATION_NAME}` to add a new migration.
- `npm run add-seed {SEED_NAME}` to add a new seed.
- `npm run run-migrations` to run all migrations.
- `npm run rollback-migrations` to rollback last migration.
- `npm run run-seed` to run all seeds.

## Run
- `npm run dev` to run locally. This will invoke the `scripts/dev.sh` bash script.
- `npm run clear-dev` if you want to clear all container and images.

## Requirements
- docker
- docker-compose

# WIP...