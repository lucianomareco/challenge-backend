const logger = require('../utils/logger');
const express = require('express');
const { route } = require('../app');
const router = express.Router();
const StoreSchema = require('../models/store');
const { getData } = require('../services/stores');

router.route('/stores')
  .get(async (req, res) => {
    const limit = req.query.limit;
    const page = req.query.page;
    dataFound = await getData(limit, page);
    res.send(dataFound);
  }
  );

router.route('/stores/generate').
  get((req, res) => {
    for (let i = 0; i < 1000; i++) {
      const store = new StoreSchema;
      store.name = `Name${i}`;
      store.cuit = `Cuit${i}`;
      store.concept = [];
      store.currentBalance = i;
      store.active = true;
      store.save(err => {
        if (err) { return next(err); }
      });
    }
    res.send('stores generated')
  })

module.exports = router;