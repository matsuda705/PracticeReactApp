import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'smallint',
    comment: 'ID',
  })
  readonly id: number;

  @Column('varchar', { comment: '書籍名' })
  name: string;

  @Column('varchar', { comment: '著者名' })
  auther: string;

  @Column('varchar', { comment: '備考' })
  memo: string;
}
