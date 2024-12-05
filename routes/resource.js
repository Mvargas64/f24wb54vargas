var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var costume_controller = require('../controllers/costume');

// Middleware to check for an authenticated user
const secured = (req, res, next) => {
    if (req.user) {
      // User is authenticated; proceed to the next middleware or route handler
      return next();
    }
    // User is not authenticated; show an unauthorized message and redirect to the login page
    res.render('login', { 
      title: 'Costume App Login', 
      message: 'You are not authorized to access this page. Please log in.' 
    });
  };  

/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/costumes', costume_controller.costume_create_post);
// DELETE request to delete Costume.
router.delete('/costumes/:id', costume_controller.costume_delete);

// PUT request to update Costume.
router.put('/costumes/:id', costume_controller.costume_update_put);

// GET request for one Costume.
router.get('/costumes/detail/:id', costume_controller.costume_detail);

// GET request for list of all Costume items.
// In routes/resource.js
router.get('/costumes', costume_controller.costume_view_all_Page); 

/* GET detail costume page */
router.get('/costume/detail', costume_controller.costume_view_one_Page);

/* GET create costume page */
router.get('/costume/create',secured, costume_controller.costume_create_Page);

/* GET create update page */
router.get('/costume/update', secured, costume_controller.costume_update_Page);

/* GET delete costume page */
router.get('/costume/delete',secured, costume_controller.costume_delete_Page);

/* DELETE costume by id */
router.delete('/:id', costume_controller.costume_delete);




module.exports = router;