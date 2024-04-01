import {
  CartBaseInterface,
  CartInterface,
} from "@domain/interfaces/cart/cart.interface";
import { EntityManager, Repository } from "typeorm";
import { CartModel } from "../models/cart/cart.model";
import ds from "@infra/config/connection.config";
import { InvalidData, NotFoundError } from "@app/app.errors";

export class CartRepositoryClass implements CartBaseInterface {
  private cartRepo: Repository<CartModel>;

  constructor() {
    this.cartRepo = new Repository(CartModel, new EntityManager(ds));
  }

  async addToCart(cart: CartInterface) {
    const add = this.cartRepo.create(cart);
    return await this.cartRepo.save(add, { reload: true });
  }

  async fetchAllFromCart() {
    const fetchAllProds = await this.cartRepo.find({
      relations: ["product", "user"],
    });

    return fetchAllProds;
  }

  async fetchOneFromCart(id: number) {
    const fetchOne = await this.cartRepo.findOne({
      where: { id: id },
      relations: ["product", "user"],
    });

    if (!fetchOne) {
      throw new NotFoundError(`No product found in cart with id ${id}`);
    }

    return fetchOne;
  }

  async updateInCart(prodInCartId: number, cart: CartInterface) {
    await this.cartRepo.update({ id: prodInCartId }, cart);

    const fetchUpdated = await this.cartRepo.findOne({
      where: { id: prodInCartId },
      relations: ["product", "user"],
    });

    if (!fetchUpdated) {
      throw new InvalidData(`Product with id: ${prodInCartId} was not updated`);
    }

    return fetchUpdated;
  }

  async deleteFromCart(id: number) {
    const prodInCart = await this.cartRepo.findOne({
      where: { id: id },
      relations: ["product", "user"],
    });

    if (!prodInCart) {
      throw new NotFoundError(
        `Product with id: ${id} does not exist in the cart`,
      );
    }
    return await this.cartRepo.remove(prodInCart);
  }
}
