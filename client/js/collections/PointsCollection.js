define([
	"jquery",
	"underscore",
	"backbone",
	"models/PointsModel",
	"backbone-validation"
], function($, _, Backbone, PointsModel){

	var PointsCollection = Backbone.Collection.extend({
		model: PointsModel,
		
		url: function() {
			return '/users';
		}
	});
	return PointsCollection;
});