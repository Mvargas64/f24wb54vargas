// discoveries.js

const express = require('express');
const router = express.Router();

// Define some hardcoded results
router.get('/', (req, res) => {
  const results = [
    { name: 'Discovery 1', description: 'A fascinating discovery about AI.', year: 2024 },
    { name: 'Discovery 2', description: 'New breakthrough in renewable energy.', year: 2023 },
    { name: 'Discovery 3', description: 'Amazing deep sea exploration results.', year: 2022 }
  ];

  // Pass the results to the view
  res.render('discoveries', { title: 'Search Results - Discoveries', results: results });
});

module.exports = router;
