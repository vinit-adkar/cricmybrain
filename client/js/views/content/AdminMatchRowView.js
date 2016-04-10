define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"json/TeamPlayersInfo",
	"json/RulesInfo",
	"text!templates/content/AdminMatchRowTemplate.html",
	"moment"
], function($, _, Backbone, Globals, TeamPlayersInfo, RulesInfo, AdminMatchRowTemplate, moment){

	var MatchesView = Backbone.View.extend({
		className: "winner-match-row",
		template: _.template(AdminMatchRowTemplate),

		events: {
			"click .submit-winner-selection": "submitWinners"
		},

		initialize: function(options) {
			var that = this;
			this.model = options.model;
			this.parent_el = options.parent_el;
			this.modelJSON = this.model.toJSON();
		},

		render: function(){
			var that = this;

			var match = this.modelJSON;
			match.homeTeamName = TeamPlayersInfo.getTeamName(match.homeTeam);
			match.awayTeamName = TeamPlayersInfo.getTeamName(match.awayTeam);
			match.date = moment(Date.parse(match.date)).format('MMMM Do YYYY, h:mm a')

			var predictionDefaultEntries = {
				teams:[
					{
						team_id: match.homeTeam, 
						team_name: match.homeTeamName
					},
					{
						team_id: match.awayTeam, 
						team_name: match.awayTeamName
					},
				],
				players: TeamPlayersInfo.getPlayers(match.homeTeam).concat(TeamPlayersInfo.getPlayers(match.awayTeam)),
				rule1: RulesInfo.getRules("rule1"),
				rule2: RulesInfo.getRules("rule2"),
				rule3: RulesInfo.getRules("rule3"),
				bonusRule: RulesInfo.getRules(match.bonusRule)
			};

			this.$el.html(this.template({
			    match: match,
			    defaultEntries: predictionDefaultEntries
			}));
			that.parent_el.append(this.$el);
		},

		submitWinners: function() {
			var that = this;

			var winnerSelection = this.$el.find('.form').serializeObject();
			winnerSelection.rule3Winner = [winnerSelection.rule3Winner.replace(/_/g," ")];
			winnerSelection.bonusWinner = [winnerSelection.bonusWinner.replace(/_/g," ")];

			var rules = {
				rule1: RulesInfo.getRules("rule1"),
				rule2: RulesInfo.getRules("rule2"),
				rule3: RulesInfo.getRules("rule3"),
				bonusRule: RulesInfo.getRules(this.model.get("bonusRule"))
			}
			winnerSelection.rules = rules;

			this.model.save(winnerSelection, {
				success: function() {
					that.$el.find('.success-message').removeClass("hidden");
				},
				error: function(response) {
					alert("error" + response);
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