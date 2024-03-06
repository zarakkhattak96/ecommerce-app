import {
  AddProductDto,
  DeleteProductDto,
} from '../../../app/dto/product/product.dto';
import { ProductService } from '../../../app/services/product/product.service';
import { Request, Response } from 'express';

export class ProductController {
  constructor(private readonly prodServ: ProductService) {}

  addProd = async (req: Request, res: Response) => {
    const prodDto = AddProductDto.addProd(req.id, req.body);

    const addProd = await this.prodServ.addProduct(prodDto);

    return res.status(201).json(addProd);
  };

  removeProd = async (req: Request, res: Response) => {
    const { id } = req.params;
    const dto = DeleteProductDto.deleteProd(req.id, parseInt(id));

    const removeProd = await this.prodServ.removeProduct(dto);

    return res.status(204).json(removeProd);
  };
}
