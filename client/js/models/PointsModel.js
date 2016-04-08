define([
	"jquery",
	"underscore",
	"backbone",
	"backbone-validation"
], function($, _, Backbone){

	var PointsModel = Backbone.Model.extend({
		urlRoot: "/users",
	});
	return PointsModel;
});