// src/entities/shipping.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Shipping {
  @PrimaryGeneratedColumn("uuid")
  id: string; 

  @Column()
  method: string; // e.g., 'standard', 'express'

  @Column()
  trackingNumber: string;

  @Column()
  status: string; // e.g., 'shipped', 'in transit', 'delivered'

  @OneToOne(() => Order, (order) => order.shipping)
  @JoinColumn()
  order: Order;
}