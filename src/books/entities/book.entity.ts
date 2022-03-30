import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  pagesCount: number;
  @Column()
  description: string;
  @Column({ default: false })
  availability: boolean;

  @ManyToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
  author: User;
}