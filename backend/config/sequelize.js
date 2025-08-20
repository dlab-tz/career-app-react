const dotenv = require('dotenv');
dotenv.config();

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
    port: process.env.DB_PORT,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

// Test Sequelize connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log(' Sequelize connected to DB');
            } catch (error) {
                console.error(' Sequelize connection error:', error);
            }
        })();
        module.exports = sequelize;