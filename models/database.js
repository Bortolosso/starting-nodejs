const Sequelize =  require("sequelize");

const sequelize = new Sequelize("savedata", "root", "bortolosso9090", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}