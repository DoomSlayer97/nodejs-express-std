const express = require('express');
const routes = express.Router();

const blogController = require('../controllers/blogController');

routes.post('/', blogController.create);

module.exports = routes;