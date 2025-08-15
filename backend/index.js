// Entry Point of the API Server 
const express = require('express');
//load env file
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelize');
const User = require('./models/user'); //load model to ensure it is registered
const usersRouter = require('./routes/users.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



const usersRouter = require('./routes/users.routes');
//get all users
app.use('/api/users', usersRouter);

(async() => {
    try {
        await sequelize.authenticate();
        console.log('Sequelize connected to Database');

        await sequelize.sync({ alter: true}); // Use {force: true } for dev reset
        console.log('Models synced');

// Require the Routes API  
// Create a Server and run it on the port 3000
const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`🚀 Server running at http://${host}:${port}`);    // Starting the Server at the port 3000
});
} catch (error) {
    console.error('Sequelize connection error:', error);
}
})();