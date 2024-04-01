import {
  AddToCartDto,
  FetchFromCartDto,
  UpdateProdsInCart,
} from "@app/dto/cart/cart.dto";
import { CartService } from "@app/services/cart/cart.service";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class CartController {
  constructor(@inject("CartService") private readonly cartServ: CartService) {}

  addToCart = async (req: Request, res: Response) => {
    const dto = AddToCartDto.add(req.id, req.body);
    const addedToCart = await this.cartServ.addToCart(dto);

    return res.status(201).json({
      status: 201,
      code: "created",
      message: "Product has been added to cart",
      product: addedToCart,
    });
  };

  fetchFromCart = async (req: Request, res: Response) => {
    const prodInCartId = req.params.prodInCart;
    const dto = FetchFromCartDto.fetchFromCart(req.id, parseInt(prodInCartId));

    const productFetched = await this.cartServ.fetchById(dto);

    return res.status(200).json({
      status: 200,
      code: "OK",
      message: `Product fetched with id: ${prodInCartId} from cart`,
      product: productFetched,
    });
  };

  updateProdInCart = async (req: Request, res: Response) => {
    const prodInCartId = req.params.prodInCart;
    const dto = UpdateProdsInCart.updateProd(
      req.id,
      parseInt(prodInCartId),
      req.body,
    );

    const productUpdated = await this.cartServ.updateProdInCart(dto);

    return res.status(200).json({
      status: 200,
      code: "OK",
      message: `Product with id: ${prodInCartId} has been updated`,
      product: productUpdated,
    });
  };
}
