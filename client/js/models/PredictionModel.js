define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone){

	var PredictionModel = Backbone.Model.extend({
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

		defaults: {
			matchId: "",
			userId: "",
			rule1Winner: "",
			rule2Winner: "",
			rule3Winner: "",
			bonusWinner: ""
		},
	});
	return PredictionModel;
});