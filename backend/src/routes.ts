import { Request, Response, Router } from "express";
import { getProducts, postProduct } from "./controller/ProductController";

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
    return res.json({message: 'API de Produtos feita em node.js, express, typerORM!'})
})

routes.get('/products', getProducts)

routes.post('/products', postProduct)

export default routes