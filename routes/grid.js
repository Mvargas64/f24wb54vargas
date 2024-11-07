var express = require('express');
var router = express.Router();

/* GET grid page with query parameters */
router.get('/', function(req, res, next) {
  let query = req.query;
  console.log(`rows: ${query.rows}`);
  console.log(`cols: ${query.cols}`);

  // Convert query strings to numbers
  let rows = Number(query.rows);
  let cols = Number(query.cols);

  // Check if rows and cols are integers
  if (!Number.isInteger(rows) || !Number.isInteger(cols)) {
    return res.render('grid', { 
      title: "Grid Display",
      query: query,
      error: 'Rows and Columns must be integers.'
    });
  }

  // Check if rows and cols are within the range of 3 to 13
  if (rows < 3 || rows > 13) {
    return res.render('grid', { 
      title: "Grid Display",
      query: query,
      error: 'Rows must be between 3 and 13.'
    });
  }

  if (cols < 3 || cols > 13) {
    return res.render('grid', { 
      title: "Grid Display",
      query: query,
      error: 'Columns must be between 3 and 13.'
    });
  }

  // Pass valid values to Pug template
  res.render('grid', { 
    title: "Grid Display",
    query: query,
    rows: rows,
    cols: cols,
    error: null
  });
});

module.exports = router;
