require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const discoveriesRouter = require('./routes/discoveries');
const randomitemRouter = require('./routes/pick');
const gridRouter = require('./routes/grid');
const resourceRouter = require('./routes/resource');

// Import mongoose and Costume model
const mongoose = require('mongoose');
const Costume = require('./models/costume');

// Function to recreate the database and seed initial data

async function recreateDB() {
 /* try {
    await Costume.deleteMany();
    console.log("Collection cleared");

    let instance1 = new Costume({ costume_type: "ghost", size: 'large', cost: 15.4 });
    let instance2 = new Costume({ costume_type: "vampire", size: 'medium', cost: 20.5 });
    let instance3 = new Costume({ costume_type: "witch", size: 'small', cost: 25.0 });

    await instance1.save();
    console.log("First object saved");

    await instance2.save();
    console.log("Second object saved");

    await instance3.save();
    console.log("Third object saved");

  } catch (err) {
    console.error("Error seeding database:", err);
  }
    */
}


// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGO_CON, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// When the connection is successful
db.once('open', function () {
  console.log('Connection to DB succeeded');
  
  let reseed = false;
  if (reseed) { 
    recreateDB(); 
  }
});

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = await Account.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


// Create the express app instance
var app = express();

// Middleware to parse JSON body
app.use(logger('dev'));
app.use(express.json());  // Ensures JSON body is parsed correctly
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  
app.use(express.static(path.join(__dirname, 'public')));

// Import the controller for the API information
const apiController = require('./controllers/api');

// Add a new route for the API information after the app is created
app.use('/api', apiController.api);

// Use the costume routes (Resource Routes)
app.use('/resource', resourceRouter);  // Using the resourceRouter for costume routes

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Route setup
app.use('/randomitem', randomitemRouter);
app.use('/discoveries', discoveriesRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);

// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account.js');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Export the app for use in other files
module.exports = app;
