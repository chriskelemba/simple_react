module.exports = (sequelize, DataTypes) => {
    const Role  = sequelize.define('role', {
        roleID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
    return Role;
}