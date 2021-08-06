const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const autentication = require('../utils/middlewares/basicAuth');
const validateStore = require('../utils/middlewares/validateStore');
const validateStoresQuery = require('../utils/middlewares/validateStoresQuery');
const {
  getStores,
  createStore
} = require('../services/stores');

router.route('/stores').get(autentication, validateStoresQuery, getStores);

router.route('/stores').post(autentication, validateStore, createStore);

module.exports = router;