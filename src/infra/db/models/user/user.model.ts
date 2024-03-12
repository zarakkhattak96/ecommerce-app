import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductModel } from '../product/product.model';
import { v4 as uuidv4 } from '@napi-rs/uuid';

@Entity('users', { schema: 'ecommerce' })
export class UserModel {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'integer' })
  id: number;

  @Column('character varying', { name: 'first_name', nullable: true })
  firstName: string | null;

  @Column('character varying', { name: 'last_name', nullable: true })
  lastName: string | null;

  @Column('character varying', { name: 'email', nullable: true })
  email: string | null;

  @Column('uuid', { name: 'uuid', nullable: true })
  uuid: string | null = uuidv4();

  @Column('character varying', { name: 'phone_number', nullable: true })
  phoneNumber: string | null;

  @Column('character varying', { name: 'address', nullable: true })
  address: string | null;

  @Column('integer', { name: 'product_id', nullable: true })
  productId: number | null;

  @Column('character varying', { name: 'city', nullable: true })
  city: string | null;

  @Column('character varying', { name: 'password', nullable: true })
  password: string | null;


  @Column("character varying", { name: "confirm_password", nullable: true })
  confirmPassword: string | null;

  @ManyToOne(
    () => ProductModel,
    (prodMod) => prodMod.users,
  )
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: number;
}
