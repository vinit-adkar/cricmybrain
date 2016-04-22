define([
	"jquery",
	"underscore",
	"backbone",
	"models/MatchesModel"
], function($, _, Backbone, MatchesModel){

	var MatchesCollection = Backbone.Collection.extend({
		model: MatchesModel,
		
		url: function() {
			return '/matches' + this.urlParams;
		},

		initialize: function(options) {
			this.urlParams = ""
			var isResults = options.isResults;
			if (isResults) {
				this.urlParams += "/results";
			}

			var isRecent = options.isRecent
			if (isRecent) {
				this.urlParams += "/recent";
			}

			var isUpcoming = options.isUpcoming
			if (isUpcoming) {
				this.urlParams += "/upcoming";
			}
		}
	});
	return MatchesCollection;
});