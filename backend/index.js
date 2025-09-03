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
const authRouter = require('./routes/auth.routes'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Backend is up and running ');
});

app.use('/api/auth', authRouter);
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
    const addr = server.address();
    if (addr) {
        const formattedHost = addr.address === '::' ? 'localhost' : addr.address;
        console.log(`🚀 Server running at http://${formattedHost}:${addr.port}`);
    } else {
        console.log(`🚀 Server running on port ${PORT}`);
    }
});
} catch (error) {
    console.error('Sequelize connection error:', error);
}
})();