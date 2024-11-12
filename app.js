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
  try {
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

  // Seed database if `reseed` is true
  let reseed = true;
  if (reseed) { recreateDB(); }
});

// Create the express app instance
var app = express();

// Import the controller for the API information
const apiController = require('./controllers/api');

// Add a new route for the API information after the app is created
app.use('/api', apiController.api);

// Use the costume routes (Resource Routes)
app.use('/costumes', resourceRouter);  // Register the resource routes here

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route setup
app.use('/randomitem', randomitemRouter);
app.use('/discoveries', discoveriesRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);

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
