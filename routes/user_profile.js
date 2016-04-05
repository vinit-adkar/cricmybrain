var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var UserProfile = require('../models/UserProfile.js');

/* GET /user_profile listing. */
router.get('/', function(req, res, next) {
	UserProfile.find(function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Get /user_profile/id */
router.get('/:id', function(req, res, next) {
	UserProfile.findById(req.params.id, function (err, post) {
	if (err) return next(err);
		console.log(res)
		res.json(post);
	});
});

/* Post /user_profile */
router.post('/', function(req, res, next) {
	UserProfile.create(req.body, function (err, post) {
	if (err) return next(err);
		res.json(post);
	});
});

/* PUT /user_profile/:id */
router.put('/:id', function(req, res, next) {
	UserProfile.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
	if (err) return next(err);
		res.json(post);
	});
});

/* DELETE /user_profile/:id */
router.delete('/:id', function(req, res, next) {
	UserProfile.findByIdAndRemove(req.params.id, req.body, function (err, post) {
	if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;