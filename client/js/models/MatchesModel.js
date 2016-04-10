define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone){

	var MatchesModel = Backbone.Model.extend({
		urlRoot: "/matches",
	});
	return MatchesModel;
});