define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"views/content/MatchesView",
	"views/content/AdminMatchesView",
	"text!templates/content/ContentTemplate.html"
], function($, _, Backbone, Globals, MatchesView, AdminMatchesView, ContentTemplate){

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
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return ContentView;
});