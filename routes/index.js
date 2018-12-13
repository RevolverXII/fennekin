var express = require('express');
var router = express.Router();

var passport = require('passport')
var facebookStrategy = require('passport-facebook').Strategy

router.use(passport.initialize());

passport.use(new facebookStrategy({
  clientID : '310654646325176',
  clientSecret : '91fc408bb550ad64ebb720833e40550e',
  callbackURL : ' https://a7b354b8.ap.ngrok.io/auth/facebook/done',
  profileFields: ['id', 'displayName', 'photos', 'email']
}, function(accessToken, refreshToken, profile, done){
  return done(null, profile);
}))

passport.serializeUser(function(profile, done){
  return done(null, profile);
})

passport.deserializeUser(function(profile, done){
  return done(null, profile);
})

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/done', 
passport.authenticate('facebook', {failureRedirect : '/'},
function(req,res){
  return res.json(req.user);
}))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




module.exports = router;
