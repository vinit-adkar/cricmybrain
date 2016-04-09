// load up the user model
var Matches = require('../models/matches');
var User = require('../models/users');
var Prediction = require('../models/predictions');
var moment = require('moment-timezone');

module.exports = function(app) {

	// Get Todays Match Details
	app.get('/matches', function(req, res) {
		var cutoff = new Date();
		cutoff.setHours(0,0,0,0);
		cutoff = cutoff  - new Date().getTimezoneOffset()*60*1000;
		var t = new Date(cutoff);
		var query = Matches.find({"date" : t.toISOString()}).
					populate('rule1').
					select({ _id:1, matchNum: 1, date: 1, startTimeGMT:1, venue:1, homeTeam:1, awayTeam:1, bonusRule:1 });

		query.exec(function (err, post) {
			if (err) return next(err);

			res.json(post);
		});
	});

	// Get Todays Match Details
	app.post('/matches', function(req, res) {
		var rules = req.body.rules;
		delete req.body.rules;
		Matches.update({ _id: req.body._id }, { $set: req.body}, function (err, post) {
			if (err) return next(err);
			var match = req.body;
			console.log(match._id)
			Prediction.find({ 'matchId' :  match._id }, function (err, post) {
				if (err) return next(err);
				calculatePoints(post, rules, match);
			});
			res.json(post);
		});
	});

	function calculatePoints (predictions, rules, match){
		console.log(predictions)
		console.log(rules)
		console.log(match)
	}


	// Get user for points table
	app.get('/users', isLoggedIn, function(req, res) {
		var query = User.find({ 'local.admin' :  false }).
					select({_id:1, 'local.name':1, 'local.teamname':1, 'local.points':1}).
					sort('-local.points');

		query.exec(function (err, post) {
			if (err) return next(err);
			res.json(post);
		});
	});

	// Post predictions
	app.get('/predictions/match/:matchId/user/:userId', isLoggedIn, function(req, res, next) {
		var query = Prediction.findOne({ 'matchId' :  req.params.matchId, 'userId': req.params.userId })
					.select({updatedAt:0,createdAt:0});

		query.exec(function (err, post) {
			if (err) return next(err);
			res.json(post);
		});
	});

	// Post predictions
	app.post('/predictions/match/:matchId/user/:userId', isLoggedIn, function(req, res, next) {
		var query = Prediction.findOne({ 'matchId' :  req.params.matchId, 'userId': req.params.userId });
		query.exec(function (err, post) {
			if (err) return next(err);
			if (post) {
				Prediction.update({ _id: post._id }, { $set: req.body}, function (err, post) {
					if (err) return next(err);
					res.json(post);
				});
			}
			else {
				Prediction.create(req.body, function (err, post) {
					if (err) return next(err);
					res.json(post);
				});
			}
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