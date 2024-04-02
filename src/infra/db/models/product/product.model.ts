import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartModel } from "../cart/cart.model";

@Entity("products", { schema: "ecommerce" })
export class ProductModel {
  @PrimaryGeneratedColumn("increment", {
    name: "id",
    type: "integer",
    primaryKeyConstraintName: "products_pkey",
  })
  id: number;

  @Column("character varying", { name: "make", nullable: true })
  make: string | null;

  @Column("integer", { name: "model", nullable: true })
  model: number | null;

  @Column("integer", { name: "price", nullable: true })
  price: number | null;

  @Column("character varying", { name: "description", nullable: true })
  description: string | null;

  @Column("character varying", { name: "sex", nullable: true })
  sex: string | null;

  @Column("character varying", { name: "color", nullable: true })
  color: string | null;

  @Column("integer", { name: "size", nullable: true })
  size: number | null;

  @Column("boolean", { name: "is_available", nullable: true })
  isAvailable: boolean | null;

  // @OneToMany(() => UserPurchases, (purchases) => purchases.product, {
  //   nullable: false,
  //   cascade: true,
  // })
  // purchases: UserPurchases;

  @OneToMany(() => CartModel, (cart) => cart.product, {
    nullable: false,
    cascade: true,
  })
  cart: CartModel[];
}
