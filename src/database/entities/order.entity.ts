// src/entities/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
import { Shipping } from './shipping.entity';
import { Payment } from './payment.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string; 

  @Column()
  totalAmount: number;

  @Column()
  status: string; // e.g., 'pending', 'shipped', 'delivered'

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @OneToOne(() => Shipping, (shipping) => shipping.order)
  shipping: Shipping;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;
}