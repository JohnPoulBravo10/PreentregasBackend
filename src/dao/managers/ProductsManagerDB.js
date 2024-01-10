import productsModel from "../models/products.models.js"

class ProductManagerDB{

    getProducts = async ({ limit = 10, page = 1, sort, query }) => {
        try {
            const options = {
              limit: parseInt(limit),
              page: parseInt(page),
              sort: sort === 'desc' ? { price: -1 } : sort === 'asc' ? { price: 1 } : undefined,
            };
      
            let filter = {};
            if (query) {
              
              filter = {
                $or: [
                  { category: query },
                  { availability: query === 'available' ? true : query === 'unavailable' ? false : undefined },
                ],
              };
            }
      
            const result = await Product.paginate(filter, options);
      
            return {
              status: 'success',
              payload: result.docs,
              totalPages: result.totalPages,
              prevPage: result.prevPage,
              nextPage: result.nextPage,
              page: result.page,
              hasPrevPage: result.hasPrevPage,
              hasNextPage: result.hasNextPage,
              prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}` : null,
              nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}` : null,
            };
          } catch (error) {
            return {
              status: 'error',
              message: 'Internal server error',
            };
          }
    }
    createProduct = async (product) =>{

    }
    getProductsById = async (pid) => {
        const product = await productsModel.findOne({_id_id});
        return {
            status: "success",
            msg: product
        }
    }

}
export {ProductManagerDB}