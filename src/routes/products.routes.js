import {Router} from "express"
import { ProductManagerDB } from "../dao/managers/ProductsManagerDB.js"

const router = Router()
const productManager = new ProductManagerDB();

router.get('/', async (req,res)=>{
    try {
        const { limit, page, sort, query } = req.query;
    
        const result = await productManager.getProducts({ limit, page, sort, query });
    
        res.json(result)
      } catch (error) {
        res.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      }
})

router.get('/:pid', async (req,res)=>{
    const id = req.params.pid;
    const product = await productManager.getProductsById(id)
    res.json(product)
})
router.post('/', async (req,res)=>{ 
    const {title,description,thumbnail,price,code,stock, category} = req.body;

    const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category
        }
        console.log(product)
    const products = await productManager.createProduct(product);

    res.send({
        status:"succes",
        msg:"Producto creado",
        productos: products
    })
})
/*router.put('/:pid', async (req,res)=>{
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
})*/

router.put('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const {title,description,thumbnail,price,code,stock, category} = req.body;

    const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category
        }
        console.log(product)

        const updatedProduct = await productManager.updateProductById(pid, product);

        res.status(200).json({
            status: 'success',
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;

        const deletedProduct = await productManager.deleteProductById(pid);

        res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully',
            product: deletedProduct
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
});


export {router as productRouter};