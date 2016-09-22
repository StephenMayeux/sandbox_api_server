const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const Profiles = require('./controllers/profiles');

module.exports = function(app) {
  // app.get('/membersonly', requireAuth, ControllerName.method);
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.get('/profiles', Profiles.findAll);
  app.get('/profiles/:id', Profiles.findOne);
  app.put('/profiles/:id', Profiles.editUser);
}
