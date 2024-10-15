const db = require("../model/dbConnect");

const sale = db.sale;

module.exports = {
    // Get All Sales
    getAllSales: async(req, res, next) => {
        try {
            let sales = await sale.findAll({})
            res.status(200).send(sales)
        } catch (error) {
            next(error)
        }
    },

    // Update Sale by ID
    updateSale: async(req, res, next) => {
        try {
            let id = req.params.id

            const updateSale = await sale.update(req.body, {where: {saleID: id}})

            if(!sale) {
                throw(createError(404, "Sale does not exist."))
            }
            res.status(200).send(updateSale)
        } catch (error) {
            next(error)
        }
    },

    // Delete Sale by ID
    deleteSale: async(req, res, next) => {
        try {
            let id = req.params.id;

            const deleteSale = await sale.destroy({where: {saleID: id}});

            if(!sale) {
                throw(createError(404, "Sale does not exist."))
            }

            res.status(200).send(deleteSale);
        } catch (error) {
            next(error)
        }
    },

    // Delete All Sales
    deleteAllSales: async(req, res, next) => {
        try {
            const deleteAllSales = await sale.destroy({where: {}});   
            res.status(200).send(deleteAllSales);
        } catch (error) {
            next(error)
        }
    },
}
