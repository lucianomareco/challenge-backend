const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();

router.route('/stores')
  .get(function(){logger.info("pending validations")}, function(){logger.info("pending use case")});

module.exports = router;
