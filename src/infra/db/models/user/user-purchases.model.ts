import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductModel } from "../product/product.model";
import { UserModel } from "./user.model";

@Entity("user_purchases", { schema: "ecommerce" })
export class UserPurchases {
  @PrimaryGeneratedColumn("increment", {
    name: "id",
    type: "integer",
  })
  id: number;

  @Column("integer", { name: "user_id", nullable: false })
  userId: number;

  @Column("integer", { name: "product_id", nullable: false })
  productId: number;

  @ManyToOne(() => ProductModel, (prodMod) => prodMod.purchases)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  product: ProductModel;

  @ManyToOne(() => UserModel, (userMod) => userMod.purchases)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: UserModel;
}
