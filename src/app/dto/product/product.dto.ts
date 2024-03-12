import { z } from 'zod';
import { ID_SCHEMA, validateData, validateId } from '../utils';

export class AddProductDto {
  private static readonly schema = z.object({
    id: z.number().optional(),
    make: z.string().nullable(),
    model: z.number().nullable(),
    price: z.number().nullable(),
    description: z.string().nullable(),
    sex: z.string().nullable(),
    color: z.string().nullable(),
    size: z.number().nullable(),
    isAvailable: z.boolean().nullable(),
  });
  private constructor(
    readonly contextId: string,
    readonly addProdDto: Readonly<z.infer<typeof AddProductDto.schema>>,
  ) { }

  static addProd(contextId: string, data: unknown): AddProductDto {
    const { ...addProdDto } = validateData(AddProductDto.schema, data);

    return new AddProductDto(contextId, addProdDto);
  }
}

export class DeleteProductDto {
  private constructor(readonly contextId: string, readonly productId: number) { }

  static deleteProd(contextId: string, productId: number): DeleteProductDto {
    const validProdId = validateId(productId);

    return new DeleteProductDto(contextId, validProdId);
  }
}

export class UpdateProductDto {
  private static readonly schema = z.object({
    prodId: z.number().optional(),
    make: z.string().nullable(),
    model: z.number().nullable(),
    price: z.number().nullable(),
    description: z.string().nullable(),
    sex: z.string().nullable(),
    color: z.string().nullable(),
    size: z.number().nullable(),
    isAvailable: z.boolean().nullable(),
  });

  private constructor(
    readonly contextId: string,
    readonly productId: number,
    readonly prodData: Readonly<z.infer<typeof UpdateProductDto.schema>>,
  ) { }

  static updateProd(
    contextId: string,
    productId: number,
    data: unknown,
  ): UpdateProductDto {
    const validId = validateId(productId);

    const validData = validateData(UpdateProductDto.schema, data);

    return new UpdateProductDto(contextId, validId, validData);
  }
}

export class GetProdsDto {
  private constructor(readonly contextId: string, readonly data: unknown) { }

  static getProds(contextId: string, data: unknown): GetProdsDto {
    return new GetProdsDto(contextId, data);
  }
}

export class GetProdById {
  private constructor(readonly contextId: string, readonly prodId: number) { }

  static fetchProd(contextId: string, prodId: number): GetProdById {
    const validId = validateId(prodId);

    return new GetProdById(contextId, validId);
  }
}
