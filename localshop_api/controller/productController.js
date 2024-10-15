const db = require("../model/dbConnect");
const createError = require("http-errors");

const product = db.product;
const sales = db.sale;


module.exports = {
    // Add Product
    addProduct: async(req, res, next) => {
        try {
            let info = {
                productName: req.body.productName,
                productQuantity: req.body.productQuantity,
            }

            const addProduct = await product.create(info)

            res.status(200).send(addProduct)
        } catch (error) {
            next(error)
        }
    },

    // Get Product by ID
    getProduct: async(req, res, next) => {
        try {
            let id = req.params.id
            let Product = await product.findOne({where: {productID: id}})

            if(!product) {
                throw(createError(404, "Product does not exist."))
            }
            res.status(200).send(Product)
        } catch (error) {
            next(error)
        }
    },

    // Get All Products
    getAllProducts: async(req, res, next) => {
        try {
            let products = await product.findAll({})
            res.status(200).send(products)
        } catch (error) {
            next(error)
        }
    },

    // Update Product by ID
    updateProduct: async(req, res, next) => {
        try {
            let id = req.params.id

            const updateProduct = await product.update(req.body, {where: {productID: id}})

            if(!product) {
                throw(createError(404, "Product does not exist."))
            }
            res.status(200).send(updateProduct)
        } catch (error) {
            next(error)
        }
    },

    // Delete Product by ID
    deleteProduct: async(req, res, next) => {
        try {
            let id = req.params.id;

            const deleteProduct = await product.destroy({where: {productID: id}});

            if(!product) {
                throw(createError(404, "Product does not exist."))
            }

            res.status(200).send(deleteProduct);
        } catch (error) {
            next(error)
        }
    },

    // Buy Product by ID
    buyProduct: async(req, res, next) => {
        try {
            let id = req.params.id;
            let quantityToBuy = req.body.quantity;

            if (!quantityToBuy || quantityToBuy <= 0) {
                throw createError(400, "Invalid quantity. Please enter a positive number.");
            }

            const productToBuy = await product.findOne({ where: { productID: id } });

            if (!productToBuy) {
                throw(createError(404, "Product does not exist."))
            }

            if (productToBuy.productQuantity < quantityToBuy) {
                throw createError(400, "Not enough stock available. Only " + productToBuy.productQuantity + " items left in stock.");
            }
    
            if (productToBuy.productQuantity < 1) {
                throw(createError(400, "Out of Stock."))
            }

            const buyProduct = await product.decrement('productQuantity', { by: quantityToBuy, where: { productID: id } });

            const salesPrice = productToBuy.productPrice * quantityToBuy;
       
            // Create a new sales record
            const salesRecord = await sales.create({
                productID: id,
                saleName: productToBuy.productName,
                saleQuantity: quantityToBuy,
                salePrice: salesPrice
            });

            res.status(200).send(buyProduct);
        } catch (error) {
            next(error);
        }
    },
}
