// the is the router for the project page
define([
	"jquery",
	"underscore",
	"backbone",
	"views/dashboard/UserDashboardView"
], function($, _, Backbone, UserDashboardView){

	var AppRouter = Backbone.Router.extend({
		
		routes : {
			"*actions": "showDashboard",
		}
	});

	var initialize = function(){
		var app_router = new AppRouter;

		app_router.on('route:showDashboard', function () {
			var userDashboard = new UserDashboardView();
			userDashboard.render();
		});

		Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});

