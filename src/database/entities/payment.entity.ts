// src/entities/payment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { User } from './user.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string; 

  @Column()
  method: string; // e.g., 'credit_card', 'paypal'

  @Column()
  transactionId: string; // Unique ID for the payment transaction

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number; // The amount paid

  @Column()
  status: string; // e.g., 'pending', 'completed', 'failed'

  @Column()
  createdAt: Date; // Timestamp for when the payment was created

  @Column({ nullable: true })
  updatedAt: Date; // Timestamp for when the payment was last updated

  // Relationship with Order (One-to-One)
  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn()
  order: Order;

  // Relationship with User (Many-to-One)
  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}