import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty({ message: 'idは必須項目です' })
    id: number;
}