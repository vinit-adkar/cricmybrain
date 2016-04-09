define([
	"jquery",
	"underscore",
	"backbone",
	"backbone-validation"
], function($, _, Backbone){

	var PredictionModel = Backbone.Model.extend({
		url : function(){
			return "/predictions/match/"+this.match_id +"/user/"+this.user_id;
		},
		
		initialize: function(options) {
			this.match_id= options.match_id;
			this.user_id= options.user_id;
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