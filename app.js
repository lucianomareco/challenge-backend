const mongoose = require('mongoose');
const logger = require('./utils/logger');
mongoose.Promise = Promise;
const notFound = require('./utils/middlewares/notFound');
const handleErrors = require('./utils/middlewares/handleErrors');

const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');
mongoose.connect('mongodb://' + config.get('mongodb.address') + '/' + config.get('mongodb.dbname'), { useNewUrlParser: true, useUnifiedTopology: true });
const { init } = require('./utils/initializer')

init();
app.use(express.json());
app.use('/api', require('./routes/stores'));
app.use(notFound)
app.use(handleErrors)

// Start the server
server = app.listen(config.get('port'));
logger.info('API initialized on port ' + config.get('port'));

module.exports = { app, server }
