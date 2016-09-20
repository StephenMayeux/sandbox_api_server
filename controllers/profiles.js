const User = require('../models/user');

exports.findAll = function(req, res, next) {
  User.find({}, function(err, profiles) {
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
