define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"text!templates/dashboard/HeaderTemplate.html"
], function($, _, Backbone, Globals, HeaderTemplate){

	var UserDashboardView = Backbone.View.extend({
		el : ".header",

		initialize: function() {
			this.template = _.template(HeaderTemplate);
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