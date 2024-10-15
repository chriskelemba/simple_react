const express = require("express");
const saleController = require("../controller/saleController");
const {verifyAccessToken} = require("../helpers/jwtHelper");
const router = express.Router();

router.get(
    "/getAllSales",
    verifyAccessToken,
    saleController.getAllSales
);
router.patch(
    "/updateSale/:id",
    verifyAccessToken,
    saleController.updateSale
);
router.delete(
    "/deleteSale/:id",
    verifyAccessToken,
    saleController.deleteSale
)
router.delete(
    "/deleteAllSales",
    verifyAccessToken,
    saleController.deleteAllSales
)

module.exports = router;