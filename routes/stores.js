const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const StoreSchema = require('../models/store');
const {
  getStores,
  createStore
} = require('../services/stores');

router.route('/stores').get(getStores);

router.route('/stores').post(createStore);

module.exports = router;