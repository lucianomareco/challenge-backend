const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const StoreSchema = require('../models/store');
const { getStores } = require('../services/stores');

router.route('/stores').get(getStores);


module.exports = router;