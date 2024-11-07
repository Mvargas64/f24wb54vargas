const express = require('express');
const app = express();
const path = require('path');

// Set view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// New endpoint for the random item page
app.get('/randomitem', (req, res) => {
  const imageNames = [
    'Ai.jpg',
    'deep_Sea.jpg',
    'deep_Sea2.jpg',
    'Renewable_energy.jpg',
    'Renewable_energy2.jpg'
  ];

  res.render('randomitem', { image_names: imageNames });
});

// Listen on a port
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
