const express = require('express');
const router = express.Router();

// Define the route to render `discoveries.pug`
router.get('/', (req, res) => {
  console.log('Rendering discoveries page');  // Debugging log
  res.render('discoveries', { title: 'Search Results - Discoveries' });
});

module.exports = router;
