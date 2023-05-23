# NestJs Example

### environment
- Node v14.17.1
- mysql 5.7


### commands
```sh
# start
npm run start:dev
```



### migrations
```sh
npm run typeorm migration:generate src/migrations/create-users-table
npm run typeorm migration:run
npm run typeorm migration:revert

npm run typeorm migration:generate src/migrations/create-posts-table
npm run typeorm migration:create src/migrations/modify-posts-table
```