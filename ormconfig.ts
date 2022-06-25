import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nest-examples',
  logging: true,
  synchronize: false,
  entities: [
    'dist/**/*.entity{.ts,.js}'
  ],
  migrations: ['dist/**/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  autoLoadEntities: true
};

export default typeORMConfig;