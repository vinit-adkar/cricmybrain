define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"json/TeamPlayersInfo",
	"views/content/PredictionRowView",
	"text!templates/content/MatchRowTemplate.html",
], function($, _, Backbone, Globals, TeamPlayersInfo, PredictionRowView, MatchRowTemplate){

	var MatchesView = Backbone.View.extend({
		template:  _.template(MatchRowTemplate),

		initialize: function(options) {
			var that = this;
			this.$el = options.el;
			this.model = options.model;
			this.modelJSON = this.model.toJSON();

			this.render();
			var predictionRowView = new PredictionRowView({
										matchModel: this.model
									});
		},

		render: function(){
			var match = this.modelJSON;
			match.homeTeam = TeamPlayersInfo.getTeamName(match.homeTeam);
			match.awayTeam = TeamPlayersInfo.getTeamName(match.awayTeam);
			match.date = match.date.split('T')[0];
			this.$el.append(this.template({
			    match: match
			}));
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchesView;
});