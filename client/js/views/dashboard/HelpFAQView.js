define([
	"jquery",
	"underscore",
	"backbone",
	"text!templates/dashboard/HelpFAQTemplate.html"
], function($, _, Backbone, HelpFAQTemplate){

	var UserDashboardView = Backbone.View.extend({
		className: "help-faq",
		template:  _.template(HelpFAQTemplate),
		render_el: $('#dashboard'),

		initialize: function() {
		},

		render: function(){
			this.$el.html(this.template());
			this.render_el.html(this.$el);
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return UserDashboardView;
});