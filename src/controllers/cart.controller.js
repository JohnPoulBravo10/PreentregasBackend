import { CartService } from "../service/cart.service.js";

class CartCotroller{
    static getCarts = async (req,res)=>{

        const carts = await CartService.getCarts();
    
        res.send({
            status:"succes",
            carritos: carts
        })
    }
    static getCartsById = async (id) =>{
        const result = await cartDB.getCartsById(id);
        return result;
    }
    static createCart = async (req,res)=>{ 
        const carrito = {
          produts: []
        };
          const cart = await CartService.createCart(carrito)
          res.send({
              status:"succes",
              msg: cart
          })
      }
    static addProductInCart = async (req,res)=>{ 
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity
        
        const cart = await CartService.addProductInCart(cid,pid,quantity)
    
        res.send({
            status:"succes",
            msg: cart
        })
    }
    static deleteAllProducts = async (req,res)=>{
        const cid = req.params.cid;
        await CartService.deleteAllProducts(cid);
        res.send({
            status:"succes",
            msg:`Ruta DELETE de CART con ID: ${cid}`
        })
    }
    static deleteProduct = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
        
            const result = await CartService.deleteProduct(cartId, productId);
            res.json(result);
          } catch (error) {
            res.status(500).json({ status: 'error', message: 'Internal server error' });
          }
      }
    static  updateCart = async (req,res)=>{
        try {
            const cartId = req.params.cid;
            const newProducts = req.body.products; 
        
            const result = await CartService.updateCart(cartId, newProducts);
            res.json(result);
          } catch (error) {
            res.status(500).json({ status: 'error', message: 'Internal server error' });
          }
    }
    static  updateProductQuantity = async (req, res) => {
        try {
          const cartId = req.params.cid;
          const productId = req.params.pid;
          const newQuantity = req.body.quantity; 
      
          const result = await CartService.updateProductQuantity(cartId, productId, newQuantity);
          res.json(result);
        } catch (error) {
          res.status(500).json({ status: 'error', message: 'Internal server error' });
        }
      }
    static  getCartPopulate = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const cart = await CartService.getCartPopulate(cartId);
    
            if (!cart) {
                return res.status(404).send('Carrito no encontrado');
            }
    
            res.json(cart)
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    
};

export { CartCotroller };