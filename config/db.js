const Sequelize = require('sequelize');
const { database } = require('./default.js');

const sequelize = new Sequelize(database.DATABASE, database.USERNAME, database.PASSWORD, {
    host: database.HOST,
    port: database.PORT,
    dialect: database.TYPE,
    pool: database.POOL,
    timezone: database.TIMEZONE
});

module.exports = {
    sequelize
}
