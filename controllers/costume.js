var Costume = require('../models/costume');

// List of all Costumes (properly implemented)
exports.costume_list = async function(req, res) {
    try {
        // Fetch all costumes from the database
        const theCostumes = await Costume.find();
        
    // Render the 'costumes' view with the fetched costumes
    res.render('costumes', { title: 'Costume Search Results', results: theCostumes });

    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
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
