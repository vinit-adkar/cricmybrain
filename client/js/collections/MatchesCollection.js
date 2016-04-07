define([
	"jquery",
	"underscore",
	"backbone",
	"models/MatchesModel",
	"backbone-validation"
], function($, _, Backbone, MatchesModel){

	var MatchesCollection = Backbone.Collection.extend({
		model: MatchesModel,
		
		url: function() {
			return '/matches';
		}
	});
	return MatchesCollection;
});