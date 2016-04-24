define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"json/TeamPlayersInfo",
	"json/RulesInfo",
	"views/component/DropDownView",
	"text!templates/content/PredictionRowTemplate.html",
	"events",
	"bootstrap"
], function($, _, Backbone, Globals, TeamPlayersInfo, RulesInfo, DropDownView, PredictionRowTemplate, Vents){

	var PredictionRowView = Backbone.View.extend({
		template:  _.template(PredictionRowTemplate),
		
		events: {
			"click .submit-prediction": "submitPrediction"
		},

		initialize: function(options) {
			
			this.matchModel = options.matchModel;
			this.model = options.model;
			this.eventDispatcher = Vents;
			this.listenTo(this.eventDispatcher, "timer:expired", this.disableInputs);
		},

		checkIfPredictionTimeIsOver: function() {
			var that = this;
			
			var currDateTime = Math.ceil(new Date().getTime());
			var matchDateTime = Math.ceil(Date.parse(this.matchModel.get("date")));

			var timeLeft = (matchDateTime - currDateTime);

			if (timeLeft <= 0) {
				this.disableInputs();
			}
		},

		disableInputs: function() {
			var that = this;
			that.$el.find('.form-control').prop('disabled', true);
			that.$el.find('.dropdown-toggle').addClass('disabled');
			that.$el.find('.submit-prediction').addClass("hidden");
		},

		render: function(prediction){
			var that = this;

			var prediction = this.model.toJSON();
			var match = this.matchModel.toJSON();
			match.homeTeamName = TeamPlayersInfo.getTeamName(match.homeTeam);
			match.awayTeamName = TeamPlayersInfo.getTeamName(match.awayTeam);
			var bonusRule = match.bonusRule;

			var predictionDefaultEntries = {
				rule1: RulesInfo.getRules("rule1"),
				rule2: RulesInfo.getRules("rule2"),
				rule3: RulesInfo.getRules("rule3"),
				bonusRule: RulesInfo.getRules(bonusRule),
				matchId: this.model.get("matchId") || this.matchModel.get("_id"),
				userId: this.model.get("userId") || Globals["user"].id,
				isComplete: match.isComplete
			};

			this.$el.append(this.template({
			    defaultEntries: predictionDefaultEntries,
			    prediction: this.model.toJSON()
			}));

			var rule1WinnerDropDownView = new DropDownView(that.getTeamDropDownMenu(match, prediction, "rule1Winner"));
			this.$el.find('.rule1Winner').append(rule1WinnerDropDownView.render());

			var rule3WinnerDropDownView = new DropDownView(that.getPlayerDropDownMenu(match, prediction, "rule3Winner"));
			this.$el.find('.rule3Winner').append(rule3WinnerDropDownView.render());

			if (RulesInfo.getRules(bonusRule).ruleType == 'playerName') {
				var bonusDropDownView = new DropDownView(that.getPlayerDropDownMenu(match, prediction, "bonusWinner"));
				this.$el.find('.bonusWinner').append(bonusDropDownView.render());
			}
			else if (RulesInfo.getRules(bonusRule).ruleType == 'teamName'){
				var bonusDropDownView = new DropDownView(that.getTeamDropDownMenu(match, prediction, "bonusWinner"));
				this.$el.find('.bonusWinner').append(bonusDropDownView.render());
			}

			this.checkIfPredictionTimeIsOver();

			return this.$el;
		},

		getTeamDropDownMenu: function(match, prediction, winner) {
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

			if (prediction[winner].length) {
				returnObject.selectedItem = {
					value: prediction[winner],
					type: prediction[winner],
					name: TeamPlayersInfo.getTeamName(prediction[winner])
				}
			}

			return returnObject;
		},


		getPlayerDropDownMenu: function(match, prediction, winner) {
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

			if (prediction[winner].length) {
				returnObject.selectedItem = {
					value: prediction[winner],
					type: TeamPlayersInfo.getPlayerType(prediction[winner]),
					name: prediction[winner]
				}
			}

			return returnObject;

		},

		submitPrediction: function() {
			var that = this;

			var prediction = this.$el.find('.form').serializeObject();

			if (!("rule1Winner" in prediction)) {
				prediction.rule1Winner = this.$el.find('.form').find(".rule1Winner .dropdown-value").attr("value");
				prediction.rule1Winner = prediction.rule1Winner.replace(/_/g," ");
			}
			if (!("rule3Winner" in prediction)) {
				prediction.rule3Winner = this.$el.find('.form').find(".rule3Winner .dropdown-value").attr("value");
				prediction.rule3Winner = [prediction.rule3Winner.replace(/_/g," ")];
			}

			if (!("bonusWinner" in prediction)) {
				prediction.bonusWinner = this.$el.find('.form').find(".bonusWinner .dropdown-value").attr("value");
				prediction.bonusWinner = [prediction.bonusWinner.replace(/_/g," ")];
			}
			else {
				prediction.bonusWinner = [prediction.bonusWinner.replace(/_/g," ")];
			}
			this.model.save(prediction, {
				success: function() {
					that.$el.find('.success-message').show().delay(3000).fadeOut();
				}
			});
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return PredictionRowView;
});