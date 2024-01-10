import { Router } from 'express';
import { ProductManagerDB } from '../dao/managers/ProductsManagerDB.js';
import { CartManagerDB } from '../dao/managers/cartManagerDB.js';

const router = new Router();

const productsManager = new ProductManagerDB();


router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; 

        const products = await productsManager.getProducts(page, limit);

        res.render('products', {
            products: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage
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




module.exports = router;

