// Filename: app.js
define([
	'jquery',
	'underscore',
	'backbone',
	"routers/router",
], function($, _, Backbone, Router){
	var initialize = function(){
		Router.initialize();
	}

	return {
		initialize: initialize
	};
});