define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"json/TeamPlayersInfo",
	"json/RulesInfo",
	"text!templates/content/PredictionRowTemplate.html",
	"bootstrap",
], function($, _, Backbone, Globals, TeamPlayersInfo, RulesInfo, PredictionRowTemplate){

	var MatchesView = Backbone.View.extend({
		template:  _.template(PredictionRowTemplate),
		
		events: {
			"click .submit-prediction": "submitPrediction"
		},

		initialize: function(options) {
			
			this.matchModel = options.matchModel;
			this.model = options.model;
			
		},

		render: function(prediction){
			var homeTeam = this.matchModel.get("homeTeam");
			var awayTeam = this.matchModel.get("awayTeam");
			var bonusRule = this.matchModel.get("bonusRule");

			var predictionDefaultEntries = {
				teams:[
					{
						team_id: homeTeam, 
						team_name: TeamPlayersInfo.getTeamName(homeTeam)
					},
					{
						team_id: awayTeam, 
						team_name: TeamPlayersInfo.getTeamName(awayTeam)
					},
				],
				players: TeamPlayersInfo.getPlayers(homeTeam).concat(TeamPlayersInfo.getPlayers(awayTeam)),
				rule1: RulesInfo.getRules("rule1"),
				rule2: RulesInfo.getRules("rule2"),
				rule3: RulesInfo.getRules("rule3"),
				bonusRule: RulesInfo.getRules(bonusRule),
				matchId: this.model.get("matchId") || this.matchModel.get("_id"),
				userId: this.model.get("userId") || Globals["user"].id
			};

			this.$el.append(this.template({
			    defaultEntries: predictionDefaultEntries
			}));

			return this.$el;
		},

		submitPrediction: function() {
			var that = this;

			var prediction = this.$el.find('.form').serializeObject();
			prediction.rule3Winner = prediction.rule3Winner.replace(/_/g," ");
			prediction.bonusWinner = prediction.bonusWinner.replace(/_/g," ");
			this.model.save(prediction, {
				success: function() {
					that.$el.find('.success-message').removeClass("hidden");
				}
			})
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchesView;
});