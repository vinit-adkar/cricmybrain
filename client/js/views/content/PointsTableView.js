define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"collections/PointsCollection",
	"text!templates/content/PointsTableTemplate.html"
], function($, _, Backbone, Globals, PointsCollection, PointsTableTemplate){

	var PointsTableView = Backbone.View.extend({
		template:  _.template(PointsTableTemplate),
		render_el: $('#dashboard'),

		events: {
			"click .refresh-table": "render"
		},

		initialize: function(options) {
			var that = this;
			this.users = new PointsCollection();
		},

		render: function(){
			var that = this;
			this.users.fetch({
				success: function(collection, response, options){
					that.$el.html(that.template({
					    collection: collection.toJSON(),
					    loggedInUser: Globals["user"]
					}));
					that.render_el.html(that.$el);
				},
				error: function(response) {
					console.log("Error");
				}
			});
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return PointsTableView;
});