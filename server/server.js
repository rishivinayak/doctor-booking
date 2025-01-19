const express = require('express');
const chalk = require('chalk');
const db = require('./db');
const cors = require('cors');
const routes = require('./routes');
const { requestInfo } = require('./middlewares');
require('dotenv').config('./.env');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(requestInfo);

app.use('/api', routes);

app.use('*', (req, res) => {
  console.log(chalk.red('404 not found error'));
  return res.status(404).json({ error: true, message: 'np Route found' });
});

app.listen(1000, () => {
  console.log(chalk.yellow('app is running @ http://localhost:1000/'));
});
