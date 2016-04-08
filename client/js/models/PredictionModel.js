define([
	"jquery",
	"underscore",
	"backbone",
	"backbone-validation"
], function($, _, Backbone){

	var PredictionModel = Backbone.Model.extend({
		urlRoot: "/predictions",

		defaults: {
			matchId: "",
			userId: "",
			rule1Winner: "",
			rule2Winner: "",
			rule3Winner: [],
			bonusWinner: [],
		},

		initialize: function(options) {
			this.data = {
				user_id: options.user_id,
				match_id: options.match_id
			}
		}
	});
	return PredictionModel;
});