define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"views/content/MatchesView",
	"views/content/PointsTableView",
	"text!templates/content/ContentTemplate.html"
], function($, _, Backbone, Globals, MatchesView, PointsTableView, ContentTemplate){

	var ContentView = Backbone.View.extend({
		el : "#content",
		template:  _.template(ContentTemplate),

		initialize: function() {
			this.$el.html(this.template);
		},

		render: function(){
			var matchesView = new MatchesView();
			matchesView.render();
			var pointsTableView = new PointsTableView();
			pointsTableView.render();
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return ContentView;
});