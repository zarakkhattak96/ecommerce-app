import { ZodTypeDef, z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { InvalidData } from '../app.errors';

export const NUMBER_SCHEMA = z.coerce.number();

export const ID_SCHEMA = NUMBER_SCHEMA.positive(
  'non-positive number is not a valid id',
);

export const validateId = (id: unknown) => validateData(ID_SCHEMA, id);

export const handleZodErr = (err: z.ZodError) => {
  return new InvalidData(fromZodError(err).message);
};
export const validateData = <T, U = T>(
  schema: z.ZodSchema<T, ZodTypeDef, U>,
  data: unknown,
): T => {
  try {
    return schema.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw handleZodErr(err);
    }

    throw new InvalidData(`Invalid data: ${data}`);
  }
};
