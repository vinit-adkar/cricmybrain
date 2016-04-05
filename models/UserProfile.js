var mongoose = require('mongoose');

var UserProfileSchema = new mongoose.Schema({
	name: { type: String, required: true},
	email: { type: String, required: true, unique: true },
	teamname: { type: String, required: true, unique: true },
	password: { type: String, required: true},
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);