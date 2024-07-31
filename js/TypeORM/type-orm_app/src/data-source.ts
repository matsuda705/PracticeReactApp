import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Book } from './books/entities/book.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '172.21.0.3',
  port: 3306,
  username: 'develop',
  password: 'password',
  database: 'develop',
  synchronize: true,
  logging: false,
  entities: [Book],
  migrations: ['src/migration/*.ts'],
});
