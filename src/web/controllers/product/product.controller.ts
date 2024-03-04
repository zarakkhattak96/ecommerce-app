import { AddProductDto } from '../../../app/dto/product/product.dto';
import { ProductService } from '../../../app/services/product/product.service';
import { Request, Response } from 'express';

export class ProductController {
  constructor(private readonly prodServ: ProductService) {}

  addProd = async (req: Request, res: Response) => {
    const prodDto = AddProductDto.addProd(req.body);
    const addProd = await this.prodServ.addProduct(prodDto);

    return res.status(201).json(addProd);
  };
}
