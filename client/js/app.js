// Filename: app.js
define([
	'jquery',
	'underscore',
	'backbone',
	"routers/router",
	"globals"
], function($, _, Backbone, Router, Globals){
	var initialize = function(){
		var loggedInUser = JSON.parse($('#dashboard').attr("data-attribute"));
		$('#dashboard').removeAttr("data-attribute");
		Globals["user"] = loggedInUser;
		Router.initialize();
	}

	return {
		initialize: initialize
	};
});