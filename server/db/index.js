const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose
  .connect('mongodb://localhost:27017/doctorDB')
  .then(() => {
    console.log(chalk.green('DB connected'));
  })
  .catch(e => {
    console.log(chalk.blue(e));
  });

module.exports = mongoose;
