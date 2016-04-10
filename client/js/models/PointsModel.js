define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone){

	var PointsModel = Backbone.Model.extend({
		urlRoot: "/users",
	});
	return PointsModel;
});