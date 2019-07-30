var express = require('express');

var controller = require('../controllers/home.controller');
var authMiddleware = require('../middleware/auth.middleware');
var router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

module.exports = router;

// khac biet authMiddleware