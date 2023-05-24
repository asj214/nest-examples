import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from "src/user/entities/user.entity";

@Entity({ name: 'comments' })
@Index('commentable', ['commentableType', 'commentableId'])
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'commentable_type' })
  @IsNotEmpty()
  commentableType: string;

  @Column({ name: 'commentable_id' })
  @IsNotEmpty()
  commentableId: number;

  @ManyToOne(type => User, user => user.posts)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column('text')
  @IsNotEmpty()
  body: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  constructor(partial?: Partial<Comment>) {
    if (partial) Object.assign(this, partial);
  }
}
