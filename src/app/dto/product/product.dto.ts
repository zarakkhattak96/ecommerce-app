import { z } from 'zod';
import { ID_SCHEMA, validateData, validateId } from '../utils';

export class AddProductDto {
  private static schema = z.object({
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
  ) {}

  static addProd(contextId: string, data: unknown): AddProductDto {
    const { ...addProdDto } = validateData(AddProductDto.schema, data);

    return new AddProductDto(contextId, addProdDto);
  }
}

export class DeleteProductDto {
  private constructor(readonly contextId: string, readonly productId: number) {}

  static deleteProd(contextId: string, productId: number): DeleteProductDto {
    const validProdId = validateId(productId);

    return new DeleteProductDto(contextId, validProdId);
  }
}
