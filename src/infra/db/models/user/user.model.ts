import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductModel } from '../product/product.model';

@Entity('users', { schema: 'ecommerce' })
export class UserModel {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'integer' })
  id: number;

  @Column('character varying', { name: 'first_name', nullable: true })
  firstName: string | null;

  @Column('character varying', { name: 'last_name', nullable: true })
  lastName: string | null;

  @Column('character varying', { name: 'emai', nullable: false })
  email: string;

  @Column('character varying', { name: 'phone_number', nullable: true })
  phoneNumber: string | null;

  @Column('character varying', { name: 'address', nullable: true })
  address: string | null;

  @Column('character varying', { name: 'city', nullable: true })
  city: string | null;

  @Column('character varying', { name: 'password', nullable: false })
  password: string;

  @ManyToOne(
    () => ProductModel,
    (prodMod) => prodMod.users,
  )
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: number;
}
