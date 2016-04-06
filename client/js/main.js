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
		"backbone-validation": "libs/backbone-validation",
		"utils": "views/utilities/utils",
		"globals": "views/utilities/globals",
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
		},
		"backbone-validation": {
			deps: ["backbone"],
			exports: "backbone-validation"
		}
	}

});

require([
	'app',
], function(App){
	App.initialize();
});