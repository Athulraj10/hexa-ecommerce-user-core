// src/entities/address.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string; 

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;

  @Column({ default: 'shipping' })
  type: string; // e.g., 'shipping', 'billing'

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}