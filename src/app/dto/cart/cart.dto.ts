import { z } from "zod";
import { validateData, validateId } from "../utils";

export class AddToCartDto {
  private static readonly schema = z
    .object({
      id: z.number().optional(),
      price: z.number().nullable(),
      quantity: z.number().nullable(),
      shippingFee: z.number().nullable(),
      total: z.number().nullable(),
      description: z.string().nullable(),
      productId: z.number(),
      userId: z.number(),
      productName: z.string().nullable(),
    })
    .partial({
      productId: true,
      userId: true,
    });

  private constructor(
    readonly contextId: string,
    readonly addData: Readonly<z.infer<typeof AddToCartDto.schema>>,
  ) {}

  static add(contextId: string, data: unknown): AddToCartDto {
    const validData = validateData(AddToCartDto.schema, data);
    return new AddToCartDto(contextId, validData);
  }
}

export class AllProdsInCartDto {
  private constructor(readonly contextId: string) {}

  static fetchAllProds(contextId: string): AllProdsInCartDto {
    return new AllProdsInCartDto(contextId);
  }
}

export class UpdateProdsInCart {
  private static readonly schema = z
    .object({
      id: z.number().optional(),
      price: z.number().nullable(),
      quantity: z.number().nullable(),
      shippingFee: z.number().nullable(),
      total: z.number().nullable(),
      description: z.string().nullable(),
      productId: z.number(),
      userId: z.number(),
      productName: z.string().nullable(),
    })
    .partial({
      productId: true,
      userId: true,
    });

  private constructor(
    readonly contextId: string,

    readonly prodIdInCart: number,
    readonly updateData: Readonly<z.infer<typeof UpdateProdsInCart.schema>>,
  ) {}

  static updateProd(
    contextId: string,
    prodIdInCart: number,
    data: unknown,
  ): UpdateProdsInCart {
    const validId = validateId(prodIdInCart);
    const validData = validateData(UpdateProdsInCart.schema, data);

    return new UpdateProdsInCart(contextId, validId, validData);
  }
}

export class ProdInCartByIdDto {
  private constructor(
    readonly contextId: string,
    readonly prodIdInCart: number,
  ) {}

  static removeProd(contextId: string, prodInCart: number): ProdInCartByIdDto {
    const validId = validateId(prodInCart);

    return new ProdInCartByIdDto(contextId, validId);
  }
}
