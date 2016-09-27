const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const Profiles = require('./controllers/profiles');

const multer = require('multer');
const s3 = require('multer-storage-s3');

const storage = s3({
  destination: function(req, file, cb) {
    cb(null, 'multer-uploads/my-files');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname);
  },
  bucket: 'sandboxauth',
  region: 'us-east-1'
});

const uploadMiddleware = multer({ storage: storage });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res, next) {
    res.send({ user: req.user });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.get('/profiles', Profiles.findAll);
  app.get('/profiles/:id', Profiles.findOne);
  app.put('/profiles/:id', Profiles.editUser);
  app.put('/profiles/image/:id', uploadMiddleware.single('attachment'), Profiles.editAvatar);
}
