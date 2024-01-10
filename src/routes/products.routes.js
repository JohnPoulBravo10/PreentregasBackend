import {Router} from "express"
import { ProductManagerDB } from "../dao/managers/ProductsManagerDB.js"

const router = Router()
const productManager = new ProductManagerDB();

router.get('/', async (req,res)=>{
    try {
        const { limit, page, sort, query } = req.query;
    
        const result = await productManager.getProducts({ limit, page, sort, query });
    
        res.json(result);
      } catch (error) {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      }




})

router.get('/:pid', async (req,res)=>{
    res.send({
        status:"succes",
        msg:"Ruta GET ID PRODUCTS"
    })
})
router.post('/', async (req,res)=>{ 
    const product = req.body;
    const products = await productManager.createProduct(product);

    res.send({
        status:"succes",
        msg:"Producto creado",
        productos: products
    })
})
router.put('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    res.send({
        status:"succes",
        msg:`Ruta PUT de PRODUCTS con ID: ${pid}`
    })
})
router.delete('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    res.send({
        status:"succes",
        msg:`Ruta DELETE de PRODUCTS con ID: ${pid}`
    })
})

export {router as productRouter};