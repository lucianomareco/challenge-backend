const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const autentication = require('../utils/middleware/basicAuth');
const {
  getStores,
  createStore
} = require('../services/stores');

router.route('/stores').get(autentication, getStores);

router.route('/stores').post(autentication, createStore);

module.exports = router;