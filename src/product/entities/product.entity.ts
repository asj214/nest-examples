import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany
} from "typeorm";
import { IsNumber, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from "src/user/entities/user.entity";
import { Category } from "src/categories/entities/category.entity";

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => User, user => user.products)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToMany(() => Category)
  categories: Category[];

  constructor(partial?: Partial<Product>) {
    if (partial) Object.assign(this, partial);
  }
}
