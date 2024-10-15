const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,  // If errors in your code will overwrite
    });

sequelize
    .authenticate()
    .then(() => {
        console.log("Database Connection Successful...");
    })
    .catch((err) => {
        console.log("Error" + err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel")(sequelize, DataTypes);
db.product = require("./productModel")(sequelize, DataTypes);
db.sale = require("./saleModel")(sequelize, DataTypes);
db.role = require("./roleModel")(sequelize, DataTypes);

db.sequelize.sync({force: false})
.then(() => {
    console.log("Re sync done");
});

db.user.belongsTo(db.role, { foreignKey: 'roleID', onDelete: 'CASCADE' });
db.role.hasOne(db.user, { foreignKey: 'roleID' });

db.sale.belongsTo(db.product, { foreignKey: "productID" });

module.exports = db;