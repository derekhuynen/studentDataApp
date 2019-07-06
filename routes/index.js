const express = require('express');
const router = express.Router();

//route index
router.get('/', (req, res) => {
    res.render('home/index', {
    });
  });
  module.exports = router;