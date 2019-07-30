var express = require('express');

var controller = require('../controllers/product.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);
router.post('/', controller.post);

module.exports = router;