define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"json/TeamPlayersInfo",
	"models/PredictionModel",
	"text!templates/content/PredictionRowTemplate.html",
	"bootstrap"
], function($, _, Backbone, Globals, TeamPlayersInfo, PredictionModel, PredictionRowTemplate){

	var MatchesView = Backbone.View.extend({
		template:  _.template(PredictionRowTemplate),

		initialize: function(options) {
			var that = this;

			this.matchModel = options.matchModel;
			this.$el = $('.'+this.matchModel.get("_id"));

			this.predictionModel = new PredictionModel({
										user_id: this.matchModel.get("user_id"),
									 	match_id: this.matchModel.get("match_id")
									});

			this.predictionModel.fetch({
				success: function (model, response, options) {
					that.render(response);
				},
				error: function(err) {
					console.log("error")
					console.log(err)
				}
			});
		},

		render: function(prediction){
			var homeTeam = this.matchModel.get("homeTeam")
			var awayTeam = this.matchModel.get("awayTeam")
			var predictionDefaultEntries = {
				teams:[
					{
						team_id: homeTeam, 
						team_name: TeamPlayersInfo.getTeamName(homeTeam)
					},
					{
						team_id: awayTeam, 
						team_name: TeamPlayersInfo.getTeamName(awayTeam)
					}
				],
				players:TeamPlayersInfo.getPlayers(homeTeam).concat(TeamPlayersInfo.getPlayers(awayTeam))
			};

			this.$el.append(this.template({
			    defaultEntries: predictionDefaultEntries
			}));
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchesView;
});