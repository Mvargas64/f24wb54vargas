const express = require('express');
const router = express.Router();  // Create a router, not a new express app

// Define the endpoint for the random item page
router.get('/', (req, res) => {
  const imageNames = [
    'Ai.jpg',
    'deep_Sea.jpg',
    'deep_Sea2.jpg',
    'Renewable_energy.jpg',
    'Renewable_energy2.jpg'
  ];

  res.render('randomitem', { image_names: imageNames });
});

module.exports = router;  // Export the router for use in app.js
