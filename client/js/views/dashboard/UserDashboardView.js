define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"views/dashboard/HeaderView",
	"views/content/ContentView",
	"text!templates/dashboard/UserDashboardTemplate.html"
], function($, _, Backbone, Globals, HeaderView, ContentView, UserDashboardTemplate){

	var UserDashboardView = Backbone.View.extend({
		el : "#dashboard",
		template:  _.template(UserDashboardTemplate),

		initialize: function() {
			this.$el.html(this.template);
		},

		render: function(){
			var headerView = new HeaderView();
			headerView.render();
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