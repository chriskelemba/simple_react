const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roleID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            index: true,
        }
    });

    // Function to hash password before saving
    User.beforeCreate( async (user) => {
        try {
            const salt = await bcrypt.genSalt(12);
            const hashedPwd = await bcrypt.hash(user.userPassword, salt)
            user.userPassword = hashedPwd;
        } catch (error) {
            throw new Error("Error encrypting password.")
        }
    })

    // Function to compare the entered password with the saved hashed password
    User.prototype.isValidPassword = async function(password) {
        try {
            return await bcrypt.compare(password, this.userPassword);
        } catch (error) {
            throw error;
        }
    };

    return User;
}