/*
 * contain several utility functions that'll be reused in scarecrow namespace
*/

define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone){

	var utils = utils || {};
	$.fn.serializeObject = function () {
	    "use strict";
	    var a = {}, b = function (b, c) {
	        var d = a[c.name];
	        "undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value
	    };
	    return $.each(this.serializeArray(), b), a
	};
	return utils;
});

