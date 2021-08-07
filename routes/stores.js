const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const authentication = require('../utils/middlewares/basicAuth');
const { validateStore } = require('../utils/middlewares/validateStore');
const validateStoresQuery = require('../utils/middlewares/validateStoresQuery');
const {
  getStores,
  createStore
} = require('../services/stores');

router.route('/stores').get(authentication, validateStoresQuery, getStores);

router.route('/stores').post(authentication, validateStore, createStore);

module.exports = router;