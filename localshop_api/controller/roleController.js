const db = require("../model/dbConnect");

const role = db.role;

module.exports = {
    // Add Role
    addRole: async(req, res, next) => {
        try {
            let info = {
                roleName: req.body.roleName,
            }

            const addRole = await role.create(info)

            res.status(200).send(addRole)
        } catch (error) {
            next(error)
        }
    },
}