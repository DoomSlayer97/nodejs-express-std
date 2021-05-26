const express = require('express');
const routes = express.Router();

const blogRoutes = require('./blogRoutes');

routes.use( '/blogs/', blogRoutes );

module.exports = routes;