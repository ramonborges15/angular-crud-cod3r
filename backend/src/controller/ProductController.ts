import { Request, Response, response } from "express"
import { getRepository } from "typeorm"
import { Product } from "../entity/Product"


export const getProducts = async (req: Request, res: Response) => {
    const products = await getRepository(Product).find()
    return res.json(products)
}

export const postProduct = async (req:Request, res: Response) => {
    const product = await getRepository(Product).save<Product>(req.body)
    res.json(product)
}