define([
	"jquery",
	"underscore",
	"backbone",
	"views/splash/LoginView",
	"views/splash/SignUpView",
	"text!templates/splash/SplashViewTemplate.html"
], function($, _, Backbone, LoginView, SignUpView, SplashViewTemplate){

	var SplashIndexView = Backbone.View.extend({
		el : "#page",
		className : "splash",
		template:  _.template(SplashViewTemplate),

		events: {
			"click .nav": "showTab"
		},

		initialize: function() {
			this.render();
		},

		render: function(){
			this.$el.html(this.template);
			var loginView = new LoginView();
			var signUpView = new SignUpView();
		},

		showTab: function(e) {
			this.$el.find('.nav').removeClass("active");
			this.$el.find('.tab-pane').removeClass('in active');

			var clickdTab = $(e.target).closest('.nav');
			clickdTab.addClass("active");
			this.$el.find('#' + clickdTab.attr("data-attribute")).addClass('in active');
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return SplashIndexView;
});