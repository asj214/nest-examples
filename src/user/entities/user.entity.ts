import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, OneToMany } from "typeorm";
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { PostEntity } from "src/post/entities/post.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Category } from "src/categories/entities/category.entity";
import { Product } from "src/product/entities/product.entity";
import * as argon2 from 'argon2';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'last_login_at', nullable: true })
  lastLoginAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany(type => PostEntity, post => post.user)
  posts: PostEntity[];

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(type => Category, category => category.user)
  categories: Category[];

  @OneToMany(type => Product, product => product.user)
  products: Product[];

  constructor(partial?: Partial<User>) {
    if (partial) Object.assign(this, partial);
  }
}
