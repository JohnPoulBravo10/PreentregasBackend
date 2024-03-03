import { ProductsService } from "../service/products.service.js";

class ProductsController{
    static getProducts = async (req,res)=>{
        try {
            const { limit, page, sort, query } = req.query;
        
            const result = await ProductsService.getProducts({ limit, page, sort, query });
        
            res.json(result)
          } catch (error) {
            res.status(500).json({
              status: 'error',
              message: 'Internal server error',
            });
          }
    }
    static createProduct = async (req,res) =>{ 
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
        const products = await ProductsService.createProduct(product);
    
        res.send({
            status:"succes",
            msg:"Producto creado",
            productos: products
        })
    }
    static getProductsById = async (req,res)=>{
        const id = req.params.pid;
        const product = await ProductsService.getProductsById(id)
        res.json(product)
    }
    static updateProductById = async (req, res) => {
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
    
            const updatedProduct = await ProductsService.updateProductById(pid, product);
    
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
    }
    static deleteProductById = async (req, res) => {
        try {
            const pid = req.params.pid;
    
            const deletedProduct = await ProductsService.deleteProductById(pid);
    
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
    }
};

export { ProductsController };