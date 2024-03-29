import {
  AddToCartDto,
  AllProdsInCartDto,
  ProdInCartByIdDto,
  UpdateProdsInCart,
} from "@app/dto/cart/cart.dto";
import { CartRepositoryClass } from "@infra/db/repositories/cart.repository";

export class CartService {
  constructor(private readonly cartRepo: CartRepositoryClass) {}

  async addToCart(addDto: AddToCartDto) {
    const addProd = await this.cartRepo.addToCart(addDto.addData);

    return {
      addedProduct: addProd,
    };
  }

  async fetchAllProdsFromCart(fetchAllDto: AllProdsInCartDto) {
    const fetchProdsFromCart = await this.cartRepo.fetchAllFromCart();

    return {
      products: fetchProdsFromCart,
    };
  }

  async updateProdInCart(updateProd: UpdateProdsInCart) {
    const { prodIdInCart, updateData } = updateProd;

    const updatedProd = await this.cartRepo.updateInCart(
      prodIdInCart,
      updateData,
    );

    return {
      product: updatedProd,
    };
  }

  async removeProdFromCart(removeDto: ProdInCartByIdDto) {
    const { prodIdInCart } = removeDto;

    return await this.cartRepo.deleteFromCart(prodIdInCart);
  }

  async fetchById(fetchDto: ProdInCartByIdDto) {
    const { prodIdInCart } = fetchDto;

    return await this.cartRepo.fetchOneFromCart(prodIdInCart);
  }
}
