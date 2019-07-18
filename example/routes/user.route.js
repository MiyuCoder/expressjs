var express = require('express');

var controller = require('../controllers/user.controller');
var authMiddleware = require('../middleware/auth.middleware');

var router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', controller.postCreate);

module.exports = router;