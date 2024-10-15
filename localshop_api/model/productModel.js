module.exports = (sequelize, DataTypes) => {
    const Product  = sequelize.define('product', {
        productID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
    
    return Product;
}