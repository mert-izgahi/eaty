import { Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import cloudinaryUpload from "../utils/cloudinary";
import Product, { IProductSchema } from "../models/product.model";
import { BadRequestError } from "../errors/BadRequest.error";

export async function getProductsController(
  req: Request<{ category?: string }, {}, {}>,
  res: Response
) {
  const { category } = req.query;
  if (category) {
    const products = await Product.getProducts({ category });
    return sendResponse(res, 200, "Products fetched successfully", products);
  }
  const products = await Product.getProducts({});
  return sendResponse(res, 200, "Products fetched successfully", products);
}

export async function getOneProductController(
  req: Request<{ id?: string }>,
  res: Response
) {
  const { id } = req.params;
  const product = await Product.getOneProduct(id!);
  return sendResponse(res, 200, "Product fetched successfully", product);
}

export async function createProductController(
  req: Request<{}, {}, IProductSchema>,
  res: Response
) {
  const body = req.body;
  const files: any = req.files;
  if (files) {
    const { photo }: any | undefined = files;
    if (!photo) throw new BadRequestError("Photo is required");

    if (photo instanceof Array) {
      if(photo.length === 0) throw new BadRequestError("Photo is required");
      if(photo.length > 3) throw new BadRequestError("Maximum 3 photos are allowed");
      const imagesUrls: string[] = await Promise.all(
        photo.map(async (obj: any) => {
          const { url } = await cloudinaryUpload(obj.tempFilePath);
          return url;
        })
      );

      body.images = imagesUrls;
    } else {
      const { url } = await cloudinaryUpload(photo.tempFilePath);
      body.images = [url];
    }
  }
  const product = await Product.createOneProduct(body);
  return sendResponse(res, 201, "Product created successfully", product);
}

export async function deleteOneProductController(
  req: Request<{ id?: string }>,
  res: Response
) {
  const { id } = req.params;
  const product = await Product.deleteOneProduct({ _id: id });
  return sendResponse(res, 200, "Product deleted successfully", product);
}

export async function updateOneProductController(
  req: Request<{ id?: string }, {}, IProductSchema>,
  res: Response
) {
  const { id } = req.params;
  const body = req.body;
  const files: any = req.files;
  if (files) {
    const { photo }: any | undefined = files;
    const imagesUrls: string[] = await Promise.all(
      photo.map(async (obj: any) => {
        const { url } = await cloudinaryUpload(obj.tempFilePath);
        return url;
      })
    );

    body.images = imagesUrls;
  }

  const product = await Product.updateOneProduct(id!, body);
  return sendResponse(res, 200, "Product updated successfully", product);
}
