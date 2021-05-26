const express = require('express');
const routes = express.Router();

const blogController = require('../controllers/blogController');

routes.post('/', blogController.create);
routes.get('/', blogController.findAll);
routes.get('/:id', blogController.findOne);

module.exports = routes;