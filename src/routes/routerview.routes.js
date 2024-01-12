import { Router } from 'express';
import { ProductManagerDB } from '../dao/managers/ProductsManagerDB.js';


const router = new Router();

const productsManager = new ProductManagerDB();


router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; 

        const products = await productsManager.getProducts(page, limit);

        
        const isAdmin = req.session.user && req.session.user.isAdmin || false;
       
        const userName = req.session.user ? req.session.user.full_name : null;

        res.render('products', {
            products: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            isAdmin: isAdmin,
            userName: userName
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await productsManager.getProductsById(productId)

        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        res.render('product-details', { product });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


router.post('/add-to-cart', async (req, res) => {
    try {
        const productId = req.body.productId;
        

        res.redirect('/products');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});




export {router as routerview};

