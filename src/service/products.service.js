import { ProductManagerDB } from "../dao/managers/ProductsManagerDB.js";

const ProductsManager = new ProductManagerDB();

class ProductsService{
    static getProducts = async ({ limit = 10, page = 1, sort, query }) =>{
        const products = await ProductsManager.getProducts(limit,page,sort,query);
        return products;
    }
    static createProduct = async (productData) =>{
        const products = await ProductsManager.createProduct(productData);
        return products;
    }
    static getProductsById = async (pid) =>{
        const products = await ProductsManager.getProductsById(pid);
        return products;
    }
    static updateProductById = async (pid, updatedProductData) =>{
        const products = await ProductsManager.updateProductById(pid,updatedProductData);
        return products;
    }
    static deleteProductById = async (pid) =>{
        const products = await ProductsManager.deleteProductById(pid);
        return products;
    }
    
};

export { ProductsService };