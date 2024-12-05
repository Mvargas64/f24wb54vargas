var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');
var costume_controller = require('../controllers/costume');



// Index Route
router.get('/', function (req, res) {
  res.render('index', { title: 'Costume App', user: req.user });
});

// Register Routes
router.get('/register', function(req, res) {
  res.render('register', { title: 'Costume App Registration' });
});

router.post('/register', function(req, res) {
  // Check if the user already exists
  Account.findOne({ username: req.body.username })
    .then(function (user) {
      if (user != null) {
        console.log("User already exists: " + req.body.username);
        return res.render('register', { 
          title: 'Registration', 
          message: 'Username already exists', 
          account: req.body.username 
        });
      }

      // Create new account
      let newAccount = new Account({ username: req.body.username });
      Account.register(newAccount, req.body.password, function(err, user) {
        if (err) {
          console.log("DB error: " + err);
          return res.render('register', { 
            title: 'Registration', 
            message: 'Error registering account', 
            account: req.body.username 
          });
        }

        if (!user) {
          return res.render('register', { 
            title: 'Registration', 
            message: 'Error registering account', 
            account: req.body.username 
          });
        }

        console.log('Account successfully created');
        res.redirect('/');
      });
    })
    .catch(function (err) {
      return res.render('register', { 
        title: 'Registration', 
        message: 'Registration error', 
        account: req.body.username 
      });
    });
});

// Login Routes
router.get('/login', function(req, res) {
  res.render('login', { title: 'Costume App Login', user: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  if (req.session.toReturn) {
    console.log("Redirecting to: " + req.session.toReturn);
    res.redirect(req.session.toReturn);
  } else {
    res.redirect('/');
  }
});



// Logout Route
router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Ping Route
router.get('/ping', function(req, res) {
  res.status(200).send("pong!");
});



module.exports = router;
