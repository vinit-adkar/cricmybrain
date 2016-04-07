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
		},

		render: function(){
			this.$el.html(this.template);
			var headerView = new HeaderView();
			var contentView = new ContentView();
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return UserDashboardView;
});