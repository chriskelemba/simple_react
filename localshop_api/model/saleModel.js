module.exports = (sequelize, DataTypes) => {
    const Sale  = sequelize.define('sale', {
        saleID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        saleName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        saleQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        salePrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    
    return Sale;
}