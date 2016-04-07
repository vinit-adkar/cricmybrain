// load up the user model
var Matches = require('../models/matches');
var User = require('../models/users');
var Prediction = require('../models/predictions');
var moment = require('moment');

module.exports = function(app) {

    // Get Todays Match Details
    app.get('/matches', function(req, res) {
        var cutoff = new Date();
        cutoff.setHours(0,0,0,0);
        cutoff = cutoff  - new Date().getTimezoneOffset()*60*1000;
        var t = new Date(cutoff);
        var query = Matches.find({"date" : t.toISOString()}).
                    select({ matchNum: 1, date: 1, startTimeGMT:1, venue:1, homeTeam:1, awayTeam:1 });

        query.exec(function (err, post) {
			if (err) return next(err);
			res.json(post);
		});
    });

    // Get user for points table
    app.get('/users', function(req, res) {
        var query = User.find({ 'local.admin' :  false }).
                    select({'local.name':1, 'local.teamname':1, 'local.points':1}).
                    sort('-local.points');

        query.exec(function (err, post) {
			if (err) return next(err);
			res.json(post);
		});
    });

    // Post predictions
    app.post('/predictions', function(req, res, next) {
        Prediction.create(req.body, function (err, post) {
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