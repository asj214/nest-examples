# NestJs Example


### migrations
```sh
npm run typeorm migration:generate src/migrations/create-users-table
npm run typeorm migration:run
npm run typeorm migration:revert

npm run typeorm migration:generate src/migrations/create-posts-table
npm run typeorm migration:create src/migrations/modify-posts-table
```