var express = require('express');
var multer = require('multer');
var authMiddleware = require('../middleware/auth.middleware');
var controller = require('../controllers/user.controller');

var upload = multer({
    dest: './public/uploads/'
});

var router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/search', authMiddleware.requireAuth, controller.search);

router.get('/create', controller.create);

router.get('/:id', authMiddleware.requireAuth, controller.get);

router.post('/create', upload.single('avatar'), controller.postCreate);

module.exports = router;