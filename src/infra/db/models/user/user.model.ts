import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "@napi-rs/uuid";
import { UserPurchases } from "./user-purchases.model";
import { CartModel } from "../cart/cart.model";
@Entity("users", { schema: "ecommerce" })
export class UserModel {
  @PrimaryGeneratedColumn("increment", {
    name: "id",
    type: "integer",
    primaryKeyConstraintName: "users_pkey",
  })
  id: number;

  @Column("character varying", { name: "first_name", nullable: true })
  firstName: string | null;

  @Column("character varying", { name: "last_name", nullable: true })
  lastName: string | null;

  @Column("character varying", { name: "email", nullable: true })
  email: string | null;

  @Column("uuid", { name: "uuid" })
  uuid: string = uuidv4();

  @Column("character varying", { name: "phone_number", nullable: true })
  phoneNumber: string | null;

  @Column("character varying", { name: "address", nullable: true })
  address: string | null;

  @Column("integer", { name: "product_id", nullable: true })
  productId: number | null;

  @Column("character varying", { name: "city", nullable: true })
  city: string | null;

  @Column("character varying", { name: "password", nullable: false })
  password: string;

  @Column("character varying", { name: "confirm_password", nullable: true })
  confirmPassword: string | null;

  @Column("character varying", { name: "role", nullable: true })
  role: string | null;

  @OneToMany(() => UserPurchases, (purchases) => purchases.user, {
    nullable: false,
    cascade: true,
  })
  purchases: UserPurchases;

  @OneToMany(() => CartModel, (cart) => cart.user, {
    nullable: false,
    cascade: true,
  })
  cart: CartModel;
}
