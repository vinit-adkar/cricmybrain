define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"text!templates/dashboard/HeaderTemplate.html"
], function($, _, Backbone, Globals, HeaderTemplate){

	var UserDashboardView = Backbone.View.extend({
		el : ".header",
		template:  _.template(HeaderTemplate),

		initialize: function() {
			this.render();
		},

		render: function(){
			this.$el.html(this.template(Globals));
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return UserDashboardView;
});