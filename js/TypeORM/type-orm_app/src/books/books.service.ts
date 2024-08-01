import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) { }

  /**
   * @summary 登録機能
   * @param createBookDto
   */
  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookRepository
      .save({ id: createBookDto.id })
      .catch((e) => {
        throw new InternalServerErrorException(e.message);
      });
  }

  /**
   * @summary 全件取得
   */
  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find().catch((e) => {
      throw new InternalServerErrorException(e.message);
    });
  }

  /**
   * @summary 該当ID取得
   * @param id
   */
  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException(
        `${id}に一致するデータが見つかりませんでした。`,
      );
    }
    return book;
  }

  /**
   * @summary 該当ID更新
   * @param id
   */
  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    {
      await this.bookRepository
        .update(id, { id: updateBookDto.id })
        .catch((e) => {
          throw new InternalServerErrorException(e.message);
        });
      const updatedPost = await this.bookRepository.findOneBy({ id });
      if (updatedPost) {
        return updatedPost
      }
      throw new NotFoundException('${id}に一致するデータが見つかりませんでした。');
    }
  }

  /**
   * @summary 削除
   * @param id
   */
  async remove(id: number): Promise<DeleteResult> {
    const response = await this.bookRepository.delete(id).catch((e) => {
      throw new InternalServerErrorException(e.message);
    });
    if (!response.affected) {
      throw new NotFoundException(`${id} was not found`);
    }
    return response;
  }
}
