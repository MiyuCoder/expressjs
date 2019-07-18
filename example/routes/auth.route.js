var express = require('express');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var router = express.Router();

router.route('/')
    .get(controller.login)
    .post(controller.postLogin);

module.exports = router;