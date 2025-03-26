// src/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Review } from './review.entity';
import { Address } from './address.entity';
import { PaymentMethod } from './payment-method.entity';
import { Wishlist } from './wishlist.entity';
import { Payment } from './payment.entity';
import { RefreshToken } from './refreshToken.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SELLER = 'seller',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string; 

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.user)
  paymentMethods: PaymentMethod[];

  @OneToOne(() => Wishlist, (wishlist) => wishlist.user)
  @JoinColumn()
  wishlist: Wishlist;

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
  
  // @OneToMany(() => Payment, (payment) => payment.user)
  uuid: string;
}