import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  logging: true,
  synchronize: false,
  entities: [
    'dist/**/*.entity{.ts,.js}'
  ],
  migrations: ['dist/**/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations'
});

export default AppDataSource;