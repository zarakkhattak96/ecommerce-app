import { z } from 'zod';
import { validateData } from '../utils';

export class AddProductDto {
  private static schema = z.object({
    make: z.string(),
    model: z.number(),
    price: z.number(),
    description: z.string(),
    sex: z.string(),
    color: z.string(),
    size: z.number(),
    isAvailable: z.boolean(),
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
