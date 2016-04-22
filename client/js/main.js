// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
	baseUrl: "js",
	
	paths : {
		"jquery": "libs/jquery",
		"underscore": "libs/underscore",
		"backbone": "libs/backbone",
		"bootstrap": "libs/bootstrap",
		"text": "libs/text",
		"moment": "libs/moment",	
		"utils": "views/utilities/utils",
		"globals": "views/utilities/globals",
		"events": "views/utilities/events"
	},
	shim: {
		jquery: {
			exports: "jquery"
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		underscore: {
			exports: "_"
		},
		bootstrap: {
			deps: ["jquery"],
			exports: "bootstrap"
		}
	}

});

require([
	'app',
], function(App){
	App.initialize();
});