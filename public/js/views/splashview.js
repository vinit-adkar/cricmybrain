define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/splashview.html'
], function($, _, Backbone, SplashViewTemplate){

	var SplashIndexView = Backbone.View.extend({
		el : "#page",
		className : "splash-index",

		template:  _.template(SplashViewTemplate),

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

	return SplashIndexView;
});