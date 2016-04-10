define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone){

	var PredictionModel = Backbone.Model.extend({
		url : function(){
			return "/predictions/match/"+this.matchId +"/user/"+this.userId;
		},
		
		initialize: function(options) {
			this.matchId = options.matchId;
			this.userId = options.userId;
		},

		defaults: {
			matchId: "",
			userId: "",
			rule1Winner: "",
			rule2Winner: "",
			rule3Winner: [],
			bonusWinner: [],
		},
	});
	return PredictionModel;
});