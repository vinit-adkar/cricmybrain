// load up the user model
var Matches = require('../models/matches');
var User = require('../models/users');
var Prediction = require('../models/predictions');

module.exports = function(app) {

	// Get Todays Match Details
	app.get('/matches', isLoggedIn, function(req, res) {
		var startDate = new Date();
		startDate = startDate.getFullYear() + "-" + (startDate.getMonth()+1) + "-" + startDate.getDate();
		var endDate = startDate + " 23:59:59";

		var query = Matches.find({"date" : {'$gte': new Date(startDate),'$lte': new Date(endDate)}}).
					populate('rule1').
					select({ _id:1, matchNum: 1, date: 1, startTimeGMT:1, venue:1, homeTeam:1, awayTeam:1, bonusRule:1 });

		query.exec(function (err, post) {
			if (err) return next(err);

			res.json(post);
		});
	});

	// Get Todays Match Details
	app.post('/matches', isAdminLoggedIn, function(req, res) {
		var rules = req.body.rules;
		delete req.body.rules;
		Matches.update({ _id: req.body._id }, { $set: req.body}, function (err, post) {
			if (err) return next(err);
			var match = req.body;
			Prediction.find({ 'matchId' :  match._id }, function (err, post) {
				if (err) return next(err);
				calculatePoints(post, rules, match, res);
				res.json(post);
			});
		});
	});

	function calculatePoints (predictions, rules, match){
		for (var i in predictions) {
			var prediction = predictions[i];
			
			(function(prediction){
				User.findOne({ '_id' :  prediction.userId }, function (err, post) {
					if (err) return next(err);
					var totalPointsForPrediction = prediction.points || 0;
					var totalPoints = post.local.points;
					
					totalPoints = totalPoints - totalPointsForPrediction;
					
					var currentPredictionPoints = 0;

					var rule1Points = calculateRulePoints(prediction.rule1Winner, match.rule1Winner, rules["rule1"]);
					var rule2Points = calculateRulePoints(prediction.rule2Winner, match.rule2Winner, rules["rule2"]);
					var rule3Points = calculateRulePoints(prediction.rule3Winner, match.rule3Winner, rules["rule3"]);

					if (rule1Points && rule2Points && rule3Points) {
						currentPredictionPoints += 15;
					}
					else {
						currentPredictionPoints += (rule1Points + rule2Points + rule3Points);
					}

					currentPredictionPoints += calculateRulePoints(prediction.bonusWinner, match.bonusWinner, rules["bonusRule"]);
					totalPoints += currentPredictionPoints;

					User.update({ '_id' :  prediction.userId }, {$set:{'local.points':totalPoints}}, function(err,post) {
						console.log("user updated")
					})
					Prediction.update({ '_id' :  prediction._id }, {$set:{points:currentPredictionPoints}}, function(err,post) {
						console.log("prediction updated")
					})
				});
			})(prediction);
		}
	}

	function calculateRulePoints (predictionWinner, ruleWinner, rule) {
		if (rule.ruleFunction == 'isEqual') {
			return isEqual(predictionWinner, ruleWinner, rule);
		}
		else if (rule.ruleFunction == 'isWithinRange') {
			return isWithinRange(predictionWinner, ruleWinner, rule);
		}
	}

	function isEqual(predictionWinner, ruleWinner, rule) {
		if (ruleWinner.constructor === Array) {
			for (var i in ruleWinner) {
				if (ruleWinner[i] == predictionWinner) {
					return rule.rulePoints;
				}
			}			
		}
		else {
			if (ruleWinner == predictionWinner) {
				return rule.rulePoints;
			}
		}
		return 0;
	}

	function isWithinRange(predictionWinner, ruleWinner, rule) {
		if (ruleWinner.constructor === Array) {
			for (var i in ruleWinner) {
				if (predictionWinner >= (parseInt(ruleWinner[i]) - rule.range) && predictionWinner <= (parseInt(ruleWinner[i]) + rule.range)) {
					return rule.rulePoints;
				}
			}
		}
		else {
			if (predictionWinner >= (parseInt(ruleWinner) - rule.range) && predictionWinner <= (parseInt(ruleWinner) + rule.range)) {
				return rule.rulePoints;
			}
		}
		return 0;
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