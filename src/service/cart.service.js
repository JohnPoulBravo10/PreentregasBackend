import { CartManagerDB } from "../dao/managers/cartManagerDB.js";

const cartDB = new CartManagerDB();

class CartService{
    static getCarts = async () =>{
        const carts = await cartDB.getCarts();
        return carts;
    }
    static getCartsById = async (id) =>{
        const result = await cartDB.getCartsById(id);
        return result;
    }
    static createCart = async (cart) =>{
        const carrt = await cartDB.createCart(cart);
        return carrt;
    }
    static addProductInCart = async (cid, pid, quantity = 1) =>{
        const carrt = await cartDB.addProductInCart(cid,pid,quantity);
        return carrt;
    }
    static deleteAllProducts = async (id) =>{
        const carrt = await cartDB.deleteAllProducts(id);
        return carrt;
    }
    static deleteProduct = async (cartId, productId) =>{
        const carrt = await cartDB.deleteProduct(cartId, productId)
        return carrt;
    }
    static  updateCart = async (cartId, newProducts) =>{
        const carrt = await cartDB.updateCart(cartId, newProducts)
        return carrt;
    }
    static  updateProductQuantity = async (cartId, productId, newQuantity) =>{
        const carrt = await cartDB.updateProductQuantity(cartId, productId, newQuantity)
        return carrt;
    }
    static  getCartPopulate = async (cartId) =>{
        const carrt = await cartDB.getCartPopulate(cartId)
        return carrt;
    }

    

    
    


    

    
};

export { CartService };