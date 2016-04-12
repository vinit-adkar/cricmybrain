define([
	"jquery",
	"underscore",
	"backbone",
	"models/PredictionModel"
], function($, _, Backbone, PredictionModel){

	var PredictionsCollection = Backbone.Collection.extend({
		model: PredictionModel,
		
		url : function(){
			return "/predictions" + this.urlParams;
		},
		
		initialize: function(options) {
			this.urlParams = "";

			var matchId = options.matchId;
			if (matchId) {
				this.urlParams += "/match/"+matchId;
			}

			var userId = options.userId;
			if (userId) {
				this.urlParams += "/user/"+userId;
			}
		},
	});
	return PredictionsCollection;
});