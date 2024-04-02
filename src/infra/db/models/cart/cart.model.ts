import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductModel } from "../product/product.model";
import { UserModel } from "../user/user.model";

@Entity("cart", { schema: "ecommerce" })
export class CartModel {
  @PrimaryGeneratedColumn("increment", {
    name: "id",
    type: "integer",
    primaryKeyConstraintName: "cart_pkey",
  })
  id: number;

  @Column("character varying", { name: "product_name", nullable: true })
  productName: string | null;

  @Column("integer", { name: "price", nullable: true })
  price: number | null;

  @Column("integer", { name: "quantity", nullable: true })
  quantity: number | null;

  @Column("integer", { name: "shipping_fee", nullable: true })
  shippingFee: number | null;

  @Column("integer", { name: "total", nullable: true })
  total: number | null;

  @Column("character varying", { name: "description", nullable: true })
  description: string | null;

  @Column("integer", { name: "product_id", nullable: true })
  productId: number | null;

  @Column("integer", { name: "user_id", nullable: true })
  userId: number | null;

  @ManyToOne(() => ProductModel, (prodMod) => prodMod.cart)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  product: ProductModel;

  @ManyToOne(() => UserModel, (userMod) => userMod.cart)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: UserModel;
}
