var mongoose = require('mongoose');

var UserProfileSchema = new mongoose.Schema({
	name: String,
	teamname: String,
	username: String,
	password: String
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);