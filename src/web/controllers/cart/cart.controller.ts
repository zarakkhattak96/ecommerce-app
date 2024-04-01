import { AddToCartDto, FetchFromCartDto } from "@app/dto/cart/cart.dto";
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
    const prodInCart = req.params.prodInCart;
    const dto = FetchFromCartDto.fetchFromCart(req.id, parseInt(prodInCart));

    const productFetched = await this.cartServ.fetchById(dto);

    return res.status(200).json({
      status: 200,
      code: "OK",
      message: `Product fetched with id: ${prodInCart} from cart`,
      product: productFetched,
    });
  };
}
