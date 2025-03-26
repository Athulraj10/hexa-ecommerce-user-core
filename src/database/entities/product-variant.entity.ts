// src/entities/product-variant.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductVariant {
  @PrimaryGeneratedColumn("uuid")
  id: string; 

  @Column()
  name: string; // e.g., 'Color', 'Size'

  @Column()
  value: string; // e.g., 'Red', 'Large'

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;
}