import {Router} from "express";
import { CartManagerDB } from "../dao/managers/cartManagerDB.js";

const router = Router();

const cartManagerMongo = new CartManagerDB();

router.get('/', async (req,res)=>{

    const carts = await cartManagerMongo.getCarts();

    res.send({
        status:"succes",
        carritos: carts
    })
})
router.get('/carts/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManagerMongo.getCartPopulate(cartId);

        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }

        res.render('cart-details', { cart });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:cid', async (req,res)=>{
    try {
        const cartId = req.params.cid;
    
        const cart = await cartManagerMongo.getCartPopulate(cartId);
    
        if (!cart) {
          return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }
    
        res.json({ status: 'success', products: cart.products });
      } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
      }
})
router.post('/', async (req,res)=>{ 
    const cart = await cartManagerMongo.createCart()
    res.send({
        status:"succes",
        msg: cart
    })
})
router.post('/:cid/product/:pid', async (req,res)=>{ 
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity
    
    const cart = await cartManagerMongo.addProductInCart(pid,cid,quantity)

    res.send({
        status:"succes",
        msg: cart
    })
})
router.put('/:cid', async (req,res)=>{
    try {
        const cartId = req.params.cid;
        const newProducts = req.body.products; 
    
        const result = await cartManagerMongo.updateCart(cartId, newProducts);
        res.json(result);
      } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
      }
})
router.delete('/:cid', async (req,res)=>{
    const cid = req.params.cid;
    await cartManagerMongo.deleteAllProducts(cid);
    res.send({
        status:"succes",
        msg:`Ruta DELETE de CART con ID: ${cid}`
    })
})
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
    
        const result = await cartManagerMongo.deleteProduct(cartId, productId);
        res.json(result);
      } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
      }
  });
  
  router.put('/:cid/products/:pid', async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const newQuantity = req.body.quantity; 
  
      const result = await cartManagerMongo.updateProductQuantity(cartId, productId, newQuantity);
      res.json(result);
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });

export {router as cartRouter};