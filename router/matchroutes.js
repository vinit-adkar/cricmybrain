// load up the user model
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var Matches = require('../models/matches');
var User = require('../models/users');
var Prediction = require('../models/predictions');

module.exports = function(app) {

	// Get Todays Match Details
	app.get('/matches/upcoming', isLoggedIn, function(req, res) {
		var startDate = new Date();
		startDate = startDate.getFullYear() + "-" + (startDate.getMonth()+1) + "-" + startDate.getDate();

		var query = Matches.find({"date" : {'$gte': new Date(startDate)}}).sort({'date':1}).
					populate('rule1').
					select({ _id:1, matchNum: 1, date: 1, venue:1, homeTeam:1, awayTeam:1, bonusRule:1, 
						rule1Winner:1, rule2Winner:1, rule3Winner:1, bonusWinner:1, isComplete: 1});

		query.exec(function (err, match) {
			if (err) return next(err);

			res.json(match);
		});
	});

	app.get('/matches/recent', isLoggedIn, function(req, res) {
		var startDate = new Date();
		startDate = startDate.getFullYear() + "-" + (startDate.getMonth()+1) + "-" + startDate.getDate();
		var endDate = startDate + " 23:59:59";

		var query = Matches.find({"date" : {'$lte': new Date(endDate)}}).sort({'date':-1}).
					populate('rule1').
					select({ _id:1, matchNum: 1, date: 1, venue:1, homeTeam:1, awayTeam:1, bonusRule:1, 
						rule1Winner:1, rule2Winner:1, rule3Winner:1, bonusWinner:1 });

		query.exec(function (err, match) {
			if (err) return next(err);

			res.json(match);
		});
	});

	// Get Todays Match Details
	app.post('/matches', isAdminLoggedIn, function(req, res) {
		var rules = req.body.rules;
		delete req.body.rules;
		req.body.isComplete = true;
		
		Matches.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, match) {
			if (err) return next(err);
			Prediction.find({ 'matchId': ObjectId(match._id)}).populate("matchId").populate("userId").exec(function (err, predictions) {
				if (err) return next(err);
				calculatePoints(predictions, rules, match, res);
				res.json(match);
			});
		});
	});

	function calculatePoints (predictions, rules, match){
		for (var i in predictions) {
			var prediction = predictions[i];
			var match = prediction.matchId;
			var user = prediction.userId;
			
			var totalPointsForPrediction = prediction.points || 0;
			var matchCorrectPredictions = prediction.predictions || 0;

			var totalPoints = user.points;
			var totalCorrectPredictions = user.predictions;
			
			totalPoints = totalPoints - totalPointsForPrediction;
			totalCorrectPredictions = totalCorrectPredictions - matchCorrectPredictions;
			
			var currentPredictionPoints = 0;
			var currentCorrectPredictions = 0;

			var rule1Points = calculateRulePoints(prediction.rule1Winner, match.rule1Winner, rules["rule1"]);
			if(rule1Points) {
				currentCorrectPredictions += 1;
			}

			var rule2Points = calculateRulePoints(prediction.rule2Winner, match.rule2Winner, rules["rule2"]);
			if(rule2Points) {
				currentCorrectPredictions += 1;
			}

			var rule3Points = calculateRulePoints(prediction.rule3Winner, match.rule3Winner, rules["rule3"]);
			if(rule3Points) {
				currentCorrectPredictions += 1;
			}


			if (rule1Points && rule2Points && rule3Points) {
				currentPredictionPoints += 15;
			}
			else {
				currentPredictionPoints += (rule1Points + rule2Points + rule3Points);
			}

			var bonusPoints = calculateRulePoints(prediction.bonusWinner, match.bonusWinner, rules["bonusRule"]);
			if(bonusPoints) {
				currentCorrectPredictions += 1;
			}

			currentPredictionPoints += bonusPoints;


			totalPoints += currentPredictionPoints;
			totalCorrectPredictions += currentCorrectPredictions;

			User.update({ '_id' :  user._id }, {$set:{'points':totalPoints, 'predictions':totalCorrectPredictions}}, function(err,post) {
				console.log("user updated")
			})
			Prediction.update({ '_id' :  prediction._id }, {$set:{points:currentPredictionPoints, 'predictions':currentCorrectPredictions}}, function(err,post) {
				console.log("prediction updated")
			});
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

	// Get Todays Match Details
	app.get('/matches/results', isLoggedIn, function(req, res) {
		var startDate = new Date();
		startDate = startDate.getFullYear() + "-" + (startDate.getMonth()+1) + "-" + startDate.getDate();

		var query = Matches.find({isComplete: true}).
					populate('rule1').
					select({ _id:1, matchNum: 1, date: 1, venue:1, homeTeam:1, awayTeam:1, bonusRule:1, 
						rule1Winner:1, rule2Winner:1, rule3Winner:1, bonusWinner:1 }).sort('date');

		query.exec(function (err, post) {
			if (err) return next(err);

			res.json(post);
		});
	});


	// Get user for points table
	app.get('/users', isLoggedIn, function(req, res) {
		var query = User.find({ 'admin' :  false }).
					select({_id:1, 'name':1, 'teamname':1, 'points':1}).
					sort({'points':-1, 'predictions':-1});

		query.exec(function (err, post) {
			if (err) return next(err);
			res.json(post);
		});
	});

	// Post predictions
	app.get('/predictions/match/:matchId', isLoggedIn, function(req, res, next) {
		var query = Prediction.find({ 'matchId' :  ObjectId(req.params.matchId) }).sort('-points');

		query.exec(function (err, post) {
			if (err) return next(err);
			res.json(post);
		});
	});

	// Post predictions
	app.get('/predictions/match/:matchId/user/:userId', isLoggedIn, function(req, res, next) {
		var query = Prediction.findOne({ 'matchId' :  ObjectId(req.params.matchId), 'userId': ObjectId(req.params.userId) })
					.select({updatedAt:0,createdAt:0});

		query.exec(function (err, post) {
			if (err) return next(err);
			res.json(post);
		});
	});

	// Post predictions
	app.post('/predictions/match/:matchId/user/:userId', isLoggedIn, function(req, res, next) {
		var query = {
			'matchId':  ObjectId(req.params.matchId),
			'userId': ObjectId(req.params.userId)
		};

		var body = req.body;
		body.matchId = ObjectId(req.params.matchId);
		body.userId = ObjectId(req.params.userId);

		Prediction.findOneAndUpdate(query, body, {upsert:true, setDefaultsOnInsert: true}, function(err, prediction) {
			if (err) return next(err);
			res.json(prediction);
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
	if ((req.isAuthenticated() && req.user.admin) == true)
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}