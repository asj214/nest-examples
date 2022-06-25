# NestJs Example


### migrations
```sh
typeorm migration:create src/migrations/create-users

npm run typeorm migration:generate src/migrations/create-users-table

npm run typeorm migration:run

npm run typeorm migration:revert
```