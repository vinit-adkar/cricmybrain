define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"views/content/ContentView",
	"text!templates/dashboard/UserDashboardTemplate.html"
], function($, _, Backbone, Globals, ContentView, UserDashboardTemplate){

	var UserDashboardView = Backbone.View.extend({
		template:  _.template(UserDashboardTemplate),
		render_el: $('#dashboard'),

		initialize: function() {
			this.$el.html(this.template(Globals));
			this.render_el.html(this.$el);
		},

		render: function(){
			var contentView = new ContentView();
			contentView.render();
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return UserDashboardView;
});