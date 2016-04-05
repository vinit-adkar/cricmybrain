define([
	"jquery",
	"underscore",
	"backbone",
	"text!templates/splash/LoginViewTemplate.html"
], function($, _, Backbone, LoginViewTemplate){

	var LoginView = Backbone.View.extend({
		el : "#login",
		template:  _.template(LoginViewTemplate),

		initialize: function() {
			this.render();
		},

		render: function(){
			this.$el.html(this.template);
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return LoginView;
});