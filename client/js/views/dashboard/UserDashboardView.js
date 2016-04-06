define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"views/dashboard/HeaderView",
	"text!templates/dashboard/UserDashboardTemplate.html"
], function($, _, Backbone, Globals, HeaderView, UserDashboardTemplate){

	var UserDashboardView = Backbone.View.extend({
		el : "#dashboard",
		template:  _.template(UserDashboardTemplate),

		initialize: function() {
			console.log(Globals);
			this.render();
		},

		render: function(){
			this.$el.html(this.template);
			var headerView = new HeaderView();
			headerView.render();
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return UserDashboardView;
});