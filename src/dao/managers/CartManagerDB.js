import cartsModel from "../models/cart.models.js";
import productsModel from "../models/products.models.js";


class CartManagerDB{

    getCarts = async () => {
        const carts = await cartsModel.find()
        return carts;
    }
    getCartsById = async (cid) => {
        const cart = await cartsModel.find({
            _id:cid
        })
        return cart;
    }
    createCart = async () =>{
        const cart = await cartsModel.create()
        return cart
    }
    addProductInCart = async (cid, pid, quantity = 1) => {
        const cart = await cartsModel.findOne({_id:cid});
        if (!cart){
            return {
                status: "error",
                msg: `El carrito con el id ${cid} no existe`
            } 
        };
        const product = await productsModel.findOne({_id:pid});
        if (!product){
            return {
                status: "error",
                msg: `El producto con el id ${pid} no existe`
            } 
        };
        let productsInCart = cart.product;
        
        const indexProduct = productsInCart.findIndex((product)=> product.product == pid );

        if(indexProduct == -1){
            const newProduct = {
                product: pid,
                quantity: quantity
            }
            cart.product.push(newProduct);
        }else{
            cart.product[indexProduct].quantity += quantity;
        }
           
        await cart.save();
        
        return cart;
    
    }
    async deleteAllProducts(cartId) {
        try {
          const cart = await cartsModel.findById(cartId);
          if (!cart) {
            return { status: 'error', message: 'Carrito no encontrado' };
          }
    
          
          cart.product = [];
          await cart.save();
    
          return { status: 'success', message: 'Todos los productos eliminados del carrito correctamente' };
        } catch (error) {
          return { status: 'error', message: 'Internal server error' };
        }
      }

    async deleteProduct(cartId, productId) {
        try {
          const cart = await cartsModel.findById(cartId);
          if (!cart) {
            return { status: 'error', message: 'Carrito no encontrado' };
          }
    
          
          cart.product.pull(productId);
          await cart.save();
    
          return { status: 'success', message: 'Producto eliminado del carrito correctamente' };
        } catch (error) {
          return { status: 'error', message: 'Internal server error' };
        }
      }
      async updateCart(cartId, newProducts) {
        try {
          const cart = await cartsModel.findById(cartId);
          if (!cart) {
            return { status: 'error', message: 'Carrito no encontrado' };
          }
    
          
          cart.product = newProducts;
          await cart.save();
    
          return { status: 'success', message: 'Carrito actualizado correctamente' };
        } catch (error) {
          return { status: 'error', message: 'Internal server error' };
        }
      }

      async updateProductQuantity(cartId, productId, newQuantity) {
        try {
          const cart = await cartsModel.findById(cartId);
          if (!cart) {
            return { status: 'error', message: 'Carrito no encontrado' };
          }
    
          
          const productIndex = cart.product.findIndex(product => product._id.equals(productId));
    
          if (productIndex !== -1) {
            cart.product[productIndex].quantity = newQuantity;
            await cart.save();
    
            return { status: 'success', message: 'Cantidad del producto actualizada correctamente' };
          } else {
            return { status: 'error', message: 'Producto no encontrado en el carrito' };
          }
        } catch (error) {
          return { status: 'error', message: 'Internal server error' };
        }
      }
      async getCartPopulate(cartId) {
        try {
          return await cartsModel.findById(cartId).populate('products');
        } catch (error) {
          throw new Error('Internal server error');
        }
      }
    

}

export {CartManagerDB}