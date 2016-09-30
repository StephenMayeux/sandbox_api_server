const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user), user: req.user });
}

exports.signup = function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = new User({
      email: email,
      password: password,
      name: name,
      city: '',
      homepage: '',
      avatar: ''
    });

    user.save(function(err) {
      if (err) { return next(err); }
      res.json({ token: tokenForUser(user), user: user });
    });
  });
}
