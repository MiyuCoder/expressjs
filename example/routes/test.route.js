var express = require('express');
var authMiddleware = require('../middleware/auth.middleware');
var controller = require('../controllers/test.controller');

var router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

module.exports = router;