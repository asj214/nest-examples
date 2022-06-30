import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from "src/user/entities/user.entity";

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => User, user => user.posts)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  @IsNotEmpty()
  title: string;

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

  constructor(partial?: Partial<PostEntity>) {
    if (partial) Object.assign(this, partial);
  }
}
