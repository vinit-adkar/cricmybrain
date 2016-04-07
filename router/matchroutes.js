// load up the user model
var Matches            = require('../models/matches');
var User            = require('../models/users');

module.exports = function(app) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/matches', isAdminLoggedIn, function(req, res) {
        Matches.find(function (err, post) {
			if (err) return next(err);
			res.json(post);
		});
    });

    app.get('/users', isLoggedIn, function(req, res) {
        User.find(function (err, post) {
			if (err) return next(err);
			res.json(post);
		});
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// route middleware to make sure a user is logged in
function isAdminLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
	if ((req.isAuthenticated() && req.user.local.admin) == true)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}