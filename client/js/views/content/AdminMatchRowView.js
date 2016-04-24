define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"json/TeamPlayersInfo",
	"json/RulesInfo",
	"views/component/DropDownView",
	"text!templates/content/AdminMatchRowTemplate.html",
	"moment"
], function($, _, Backbone, Globals, TeamPlayersInfo, RulesInfo, DropDownView, AdminMatchRowTemplate, moment){

	var AdminMatchRowView = Backbone.View.extend({
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
			var bonusRule = match.bonusRule;

			var predictionDefaultEntries = {
				rule1: RulesInfo.getRules("rule1"),
				rule2: RulesInfo.getRules("rule2"),
				rule3: RulesInfo.getRules("rule3"),
				bonusRule: RulesInfo.getRules(bonusRule)
			};

			this.$el.html(this.template({
			    match: match,
			    defaultEntries: predictionDefaultEntries
			}));

			
			var rule1WinnerDropDownView = new DropDownView(that.getTeamDropDownMenu(match, "rule1Winner"));
			this.$el.find('.rule1Winner').append(rule1WinnerDropDownView.render());

			var rule3WinnerDropDownView = new DropDownView(that.getPlayerDropDownMenu(match, "rule3Winner"));
			this.$el.find('.rule3Winner').append(rule3WinnerDropDownView.render());

			if (RulesInfo.getRules(bonusRule).ruleType == 'playerName') {
				var bonusDropDownView = new DropDownView(that.getPlayerDropDownMenu(match, "bonusWinner"));
				this.$el.find('.bonusWinner').append(bonusDropDownView.render());
			}
			else if (RulesInfo.getRules(bonusRule).ruleType == 'teamName'){
				var bonusDropDownView = new DropDownView(that.getTeamDropDownMenu(match, "bonusWinner"));
				this.$el.find('.bonusWinner').append(bonusDropDownView.render());
			}

			that.parent_el.append(this.$el);
		},

		getTeamDropDownMenu: function(match, winner) {
			var teamDropDownMenu = [
				{
					listItems: [
						{
							name: match.homeTeamName,
							value: match.homeTeam, 
							type: match.homeTeam
						},
						{
							name: match.awayTeamName,
							value: match.awayTeam, 
							type: match.awayTeam
						}
					]
				}
			];

			var returnObject = {
				listItemArray: teamDropDownMenu,
				placeholder: "Select Team..."
			}

			if (match[winner].length) {
				returnObject.selectedItem = {
					value: match[winner],
					type: match[winner],
					name: TeamPlayersInfo.getTeamName(match[winner])
				}
			}

			return returnObject;
		},


		getPlayerDropDownMenu: function(match, winner) {
			var rule3Winner = [
				{
					header: {name: match.homeTeamName,type: match.homeTeam},
					listItems: TeamPlayersInfo.getPlayers(match.homeTeam)
				},
				{
					header: {name: match.awayTeamName,type: match.awayTeam},
					listItems: TeamPlayersInfo.getPlayers(match.awayTeam)
				},
			];

			var returnObject = {			
				listItemArray: rule3Winner,
				placeholder: "Select Players..."
			};

			if (match[winner].length) {
				returnObject.selectedItem = {
					value: match[winner],
					type: TeamPlayersInfo.getPlayerType(match[winner][0]),
					name: match[winner]
				}
			}

			return returnObject;

		},

		submitWinners: function() {
			var that = this;

			var winnerSelection = this.$el.find('.form').serializeObject();
			if (!("rule1Winner" in winnerSelection)) {
				winnerSelection.rule1Winner = this.$el.find('.form').find(".rule1Winner .dropdown-value").attr("value");
				winnerSelection.rule1Winner = winnerSelection.rule1Winner.replace(/_/g," ");
			}
			if (!("rule3Winner" in winnerSelection)) {
				winnerSelection.rule3Winner = this.$el.find('.form').find(".rule3Winner .dropdown-value").attr("value");
				winnerSelection.rule3Winner = [winnerSelection.rule3Winner.replace(/_/g," ")];
			}

			if (!("bonusWinner" in winnerSelection)) {
				winnerSelection.bonusWinner = this.$el.find('.form').find(".bonusWinner .dropdown-value").attr("value");
				winnerSelection.bonusWinner = [winnerSelection.bonusWinner.replace(/_/g," ")];
			}
			else {
				winnerSelection.bonusWinner = [winnerSelection.bonusWinner.replace(/_/g," ")];
			}

			var rules = {
				rule1: RulesInfo.getRules("rule1"),
				rule2: RulesInfo.getRules("rule2"),
				rule3: RulesInfo.getRules("rule3"),
				bonusRule: RulesInfo.getRules(this.model.get("bonusRule"))
			}
			winnerSelection.rules = rules;

			this.model.save(winnerSelection, {
				success: function() {
					that.$el.find('.success-message').show().delay(3000).fadeOut();
				},
				error: function(response) {
					alert("error" + response);
				}
			});
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return AdminMatchRowView;
});