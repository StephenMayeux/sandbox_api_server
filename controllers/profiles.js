const User = require('../models/user');

exports.findAll = function(req, res, next) {
  User.find({}).sort({ createdAt: -1 }).exec(function(err, profiles) {
    if (err) { return next(err); }
    res.send(profiles);
  });
}

exports.findOne = function(req, res, next) {
  const id = req.params.id;
  User.findById(id, function(err, profile) {
    if (err) { return next(err); }
    res.send(profile);
  });
}

exports.editUser = function(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const city = req.body.city;
  const homepage = req.body.homepage;
  const avatar = req.body.avatar;

  User.findByIdAndUpdate(id, {name: name, email: email, city: city, homepage: homepage, avatar: avatar},
  function(err, profile) {
    if (err) { return next(err); }
    res.send(profile);
  });
}
