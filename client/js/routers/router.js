// the is the router for the project page
define([
	"jquery",
	"underscore",
	"backbone",
	"views/splash/splashView"
], function($, _, Backbone, SplashView){

	var AppRouter = Backbone.Router.extend({
		
		routes : {
			"*actions": "showSplash",
		}
	});

	var initialize = function(){
		var app_router = new AppRouter;

		app_router.on('route:showSplash', function () {
			var splashview = new SplashView();
			splashview.render();
		});

		Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});

