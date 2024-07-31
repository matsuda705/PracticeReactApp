import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'mysql',
        host: '172.21.0.3',
        port: 3306,
        username: 'develop',
        password: 'password',
        database: 'develop',
        entities: [Book],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
