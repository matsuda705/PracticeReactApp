import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
