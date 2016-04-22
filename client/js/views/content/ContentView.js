define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"views/content/MatchesView",
	"views/content/AdminMatchesView",
	"views/content/PointsTableView",
	"text!templates/content/ContentTemplate.html"
], function($, _, Backbone, Globals, MatchesView, AdminMatchesView, PointsTableView, ContentTemplate){

	var ContentView = Backbone.View.extend({
		el : "#content",
		template:  _.template(ContentTemplate),

		initialize: function() {
			this.$el.html(this.template(Globals));
		},

		render: function(){
			if (Globals["user"].admin) {
				var adminMatchesView = new AdminMatchesView();
				adminMatchesView.render();
			}
			else {
				var matchesView = new MatchesView();
				matchesView.render();
			}
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