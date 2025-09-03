// Entry Point of the API Server 
const express = require('express');
//load env file
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const cors = require('cors');  // import cors
app.use(cors());               // allow cross-origin requests

const bodyParser = require('body-parser');
const models = require('./models');
const usersRouter = require('./routes/users.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Backend is up and running ');
});


//get all users
app.use('/api/users', usersRouter);

(async() => {
    try {
        await models.sequelize.authenticate();
        console.log('Sequelize connected to Database');

        await models.sequelize.sync({ alter: true}); // Use {force: true } for dev reset
        console.log('Models synced');

        // Require the Routes API  
        // Create a Server and run it on the port 5000
        const PORT = process.env.PORT || 5000;
        const server = app.listen(PORT, () => {
            const addr = server.address();
            const formattedHost = addr.address === "::" ? "localhost" : addr.address;
            console.log(`🚀 Server running at http://${formattedHost}:${addr.port}`);
        });
    } catch (error) {
        console.error('Sequelize connection error:', error);
    }
})();