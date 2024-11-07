var express = require('express');
var router = express.Router();

function range(n) {
  return Array.from({ length: n }, (_, index) => index);
}

/* GET grid page with query parameters */
router.get('/', function(req, res, next) {
  let query = req.query;
  console.log(`rows: ${query.rows}`);
  console.log(`cols: ${query.cols}`);


  res.render('grid', { 
    title: "Grid Display", 
    query: query,
    range: range
  });
});

module.exports = router;
