const bcrypt = require('bcrypt');

function cryptPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function checkPassword(password, cryptedPassword) {
  return bcrypt.compareSync(password, cryptedPassword);
}

module.export = { cryptPassword, checkPassword };
