// src/entities/discount.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn("uuid")
  id: string; 

  @Column()
  code: string;

  @Column('decimal', { precision: 5, scale: 2 })
  percentage: number;

  @Column()
  validUntil: Date;

  @ManyToMany(() => Order)
  @JoinTable()
  orders: Order[];
}