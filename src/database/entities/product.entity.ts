// src/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Category } from './category.entity';
import { OrderItem } from './order-item.entity';
import { Review } from './review.entity';
import { ProductVariant } from './product-variant.entity';
import { Tag } from './tag.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string; 

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

//   @ManyToMany(() => Tag, (tag) => tag.products)
//   @JoinTable()
//   tags: Tag[];
}