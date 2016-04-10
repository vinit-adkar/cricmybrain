define([
	"jquery",
	"underscore",
	"backbone",
	"models/MatchesModel"
], function($, _, Backbone, MatchesModel){

	var MatchesCollection = Backbone.Collection.extend({
		model: MatchesModel,
		
		url: function() {
			return '/matches';
		}
	});
	return MatchesCollection;
});