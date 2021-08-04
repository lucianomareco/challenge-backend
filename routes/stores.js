const logger = require('../utils/logger');
const express = require('express');
const { route } = require('../app');
const router = express.Router();
const StoreSchema = require('../models/store');

router.route('/stores')
  .get((req, res) => {
    console.log(req.query.limit);
    console.log(req.query.page);
    res.send('paginacion de express')
  }
  );

router.route('/stores/generate').
  get((req, res) => {
    for (let i = 0; i < 1000; i++) {
      const store = new StoreSchema;
      store.name = `Name${i}`;
      store.cuit = `Cuit${i}`;
      store.concept = [];
      store.currentBalance = i + 100;
      store.active = true;
      store.save(err => {
        if (err) { return next(err); }
      });
    }
    res.send('stores generated')
  })

module.exports = router;