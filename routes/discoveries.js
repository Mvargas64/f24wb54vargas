
const express = require('express');
const router = express.Router();

// Route to render discoveries.pug
router.get('/discoveries', (req, res) => {
  res.render('discoveries', { title: 'Search Results - Discoveries' });
});

module.exports = router;
