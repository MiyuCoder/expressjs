var express = require('express');
var multer = require('multer');

var controller = require('../controllers/user.controller');

var upload = multer({
    dest: './public/uploads/'
});

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', upload.single('avatar'), controller.postCreate);

module.exports = router;