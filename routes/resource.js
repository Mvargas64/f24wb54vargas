var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var costume_controller = require('../controllers/costume');

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
router.get('/costumes/:id', costume_controller.costume_detail);
// GET request for list of all Costume items.
// In routes/resource.js
router.get('/mario', costume_controller.costume_view_all_Page); 

/* GET detail costume page */
router.get('/detail', costume_controller.costume_view_one_Page);


module.exports = router;