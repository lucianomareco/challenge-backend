const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const autentication = require('../utils/middleware/basicAuth');
const validateStore = require('../utils/middleware/validateStore');
const validateStoresQuery = require('../utils/middleware/validateStoresQuery');
const {
  getStores,
  createStore
} = require('../services/stores');

router.route('/stores').get(autentication, validateStoresQuery, getStores);

router.route('/stores').post(autentication, validateStore, createStore);

module.exports = router;