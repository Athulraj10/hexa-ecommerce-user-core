// src/entities/wishlist.entity.ts
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn("uuid")
  id: string; 

  @OneToOne(() => User, (user) => user.wishlist)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}