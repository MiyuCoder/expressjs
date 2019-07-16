// Require Modules
const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

// Route('/users/)
router.route('/')
    .get(controller.index);

// Route('/users/search/)
router.route('/search')
    .get(controller.search);

// Route('/users/create')
router.route('/create')
    .get(controller.create)
    .post(controller.postCreate);

// Route('/users/:id')
router.route('/:id')
    .get(controller.id);

module.exports = router;