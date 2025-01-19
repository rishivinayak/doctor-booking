const chalk = require('chalk');
const jwt = require('jsonwebtoken');

module.exports.requestInfo = (req, res, next) => {
  console.log(chalk.green('METHOD:'), chalk.green(req.method));
  console.log(chalk.yellow('URL:'), chalk.yellow(req.url));
  console.log(req.body);
  next();
};

module.exports.checkToken = roles => {
  return (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;
      if (!bearerToken) {
        return res.status(403).json({ message: 'You are not authorized' });
      }
      const token = bearerToken.split(' ')[1];
      console.log(chalk.bgBlueBright(token));
      const isMatching = jwt.verify(token, process.env.SECRET_KEY);
      console.log(isMatching);
      if (!roles.includes(isMatching.role)) {
        return res.status(403).json({ message: 'You are not authorized' });
      }

      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: e });
    }
  };
};
