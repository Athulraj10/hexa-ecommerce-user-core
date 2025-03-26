import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn("uuid")
  id: string; 

  @ManyToOne(() => User, (user) => user.payments, { eager: true })
  user: User;

  @Column({ type: 'enum', enum: ['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'UPI', 'BANK_TRANSFER'] })
  method: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ default: false })
  isSuccessful: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
