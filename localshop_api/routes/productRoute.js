const express = require("express");
const productController = require("../controller/productController");
const {verifyAccessToken} = require("../helpers/jwtHelper");
const router = express.Router();

router.post(
    "/addProduct",
    verifyAccessToken,
    productController.addProduct
);
router.put(
    "/buyProduct/:id",
    verifyAccessToken,
    productController.buyProduct
);
router.get(
    "/getProduct/:id",
    verifyAccessToken,
    productController.getProduct
);
router.get(
    "/getAllProducts",
    verifyAccessToken,
    productController.getAllProducts
);
router.patch(
    "/updateProduct/:id",
    verifyAccessToken,
    productController.updateProduct
);
router.delete(
    "/deleteProduct/:id",
    verifyAccessToken,
    productController.deleteProduct
);

module.exports = router;