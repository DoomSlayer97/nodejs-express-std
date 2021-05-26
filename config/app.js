require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( morgan('dev') );

app.set('port', 3000 || process.env.PORT);

module.exports = app;