import { autoInjectable, inject, injectable } from 'tsyringe';
import {
  AddProductDto,
  DeleteProductDto,
  GetProdById,
  UpdateProductDto,
} from '../../../app/dto/product/product.dto';
import { ProductService } from '../../../app/services/product/product.service';
import { Request, Response } from 'express';

@autoInjectable()
export class ProductController {
  constructor(
    @inject("ProductService") private readonly prodServ: ProductService,
  ) {}

  addProd = async (req: Request, res: Response) => {
    const prodDto = AddProductDto.addProd(req.id, req.body);

    const addProd = await this.prodServ.addProduct(prodDto);

    return res.status(201).json(addProd);
  };

  removeProd = async (req: Request, res: Response) => {
    const id = req.params.productId;

    const dto = DeleteProductDto.deleteProd(req.id, parseInt(id));

    const removeProd = await this.prodServ.removeProduct(dto);

    return res.json(removeProd);
  };

  updateProds = async (req: Request, res: Response) => {
    const prodId = req.params.productId;

    const dto = UpdateProductDto.updateProd(req.id, parseInt(prodId), req.body);

    const updatedProd = await this.prodServ.updateProduct(dto);

    return res.json(updatedProd);
  };

  getProds = async (req: Request, res: Response) => {
    const prods = await this.prodServ.fetchProducts();

    return res.status(200).json(prods);
  };

  getProdById = async (req: Request, res: Response) => {
    const id = req.params.prodId;

    const dto = GetProdById.fetchProd(req.id, parseInt(id));

    const fetchProd = await this.prodServ.fetchById(dto);

    return res.status(200).json(fetchProd);
  };
}
