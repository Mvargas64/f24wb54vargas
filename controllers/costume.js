// controllers/costume.js
var Costume = require('../models/costume');

// List of all Costumes
exports.costume_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume list');
};

// Details of a specific Costume
exports.costume_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume detail: ' + req.params.id);
};

// Handle Costume creation on POST
exports.costume_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume create POST');
};

// Handle Costume deletion on DELETE
exports.costume_delete = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume delete DELETE ' + req.params.id);
};

// Handle Costume update on PUT
exports.costume_update_put = function(req, res) {
  res.send('NOT IMPLEMENTED: Costume update PUT ' + req.params.id);
};

// Optional: Seed the database (recreate) if necessary
async function recreateDB() {
  // Delete all existing records
  await Costume.deleteMany();

  // Create a new instance of the costume model
  let instance1 = new Costume({ costume_type: "ghost", size: 'large', cost: 15.4 });

  // Save the new instance and log success
  instance1.save().then(doc => {
    console.log("First object saved");
  }).catch(err => {
    console.error(err);
  });
}

// Optionally, reseed the database on server start
let reseed = true;
if (reseed) {
  recreateDB();
}
