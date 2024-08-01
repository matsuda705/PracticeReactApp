import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsNotEmpty({ message: 'idは必須項目です' })
    id: number;
}