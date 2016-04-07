define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"collections/PointsCollection",
	"text!templates/content/PointsTableTemplate.html"
], function($, _, Backbone, Globals, PointsCollection, PointsTableTemplate){

	var PointsTableView = Backbone.View.extend({
		el : "#points-table-container",
		template:  _.template(PointsTableTemplate),

		initialize: function() {
			var that = this;

			this.users = new PointsCollection();
			this.users.fetch({
				success: function(collection, response, options){
					that.render(collection);
				},
				error: function(response) {
					console.log("Error");
				}
			});
		},

		render: function(collection){
			this.$el.html(this.template({
			    collection: collection.toJSON()
			}));
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return PointsTableView;
});