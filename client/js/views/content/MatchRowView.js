define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"json/TeamPlayersInfo",
	"models/PredictionModel",
	"views/content/PredictionRowView",
	"text!templates/content/MatchRowTemplate.html",
	"moment"
], function($, _, Backbone, Globals, TeamPlayersInfo, PredictionModel, PredictionRowView, MatchRowTemplate, moment){

	var MatchesView = Backbone.View.extend({
		className: "match-row",
		template:  _.template(MatchRowTemplate),

		initialize: function(options) {
			var that = this;
			this.model = options.model;
			this.parent_el = options.parent_el;
			this.modelJSON = this.model.toJSON();
		},

		render: function(){
			var that = this;

			var match = this.modelJSON;
			match.homeTeam = TeamPlayersInfo.getTeamName(match.homeTeam);
			match.awayTeam = TeamPlayersInfo.getTeamName(match.awayTeam);
			match.date = moment(Date.parse(match.date)).format('MMMM Do YYYY, h:mm a')
			this.$el.html(this.template({
			    match: match
			}));
			that.parent_el.append(this.$el);

			this.predictionModel = new PredictionModel({
										userId: Globals["user"].id,
									 	matchId: match["_id"]
									});
			
			this.predictionModel.fetch({
				success: function(model, response, options) {
					var predictionRowView = new PredictionRowView({
												matchModel: that.model,
												model: model
											});
					that.$el.find('.prediction-row').html(predictionRowView.render());

					that.timer = setInterval(function() {
						var currDateTime = Math.ceil(new Date().getTime()/1000);
						var matchDateTime = Math.ceil(Date.parse(that.model.get("date"))/1000);
						var timeLeft = matchDateTime - currDateTime;

						that.timeBetweenDates(timeLeft);
					}, 1000);						
					
					return that.$el;
				},
				error: function() {
					console.log("error in matchrowview render");
				}
			});
		},

		timeBetweenDates: function(timeLeft) {
			if (timeLeft <= 0) {
				this.$el.find('.timeLeftToMatch').addClass("hidden");
				clearInterval(this.timer);
			} else {
				this.$el.find('.timeLeftToMatch').removeClass("hidden");
				var seconds = timeLeft;
				var minutes = Math.floor(seconds / 60);
				var hours = Math.floor(minutes / 60);

				hours %= 24;
				minutes %= 60;
				seconds %= 60;

				this.$el.find('.timeLeftToMatch .hours').html("<b>" + hours + "</b> Hours");
				this.$el.find('.timeLeftToMatch .minutes').html("<b>" + minutes + "</b> Minutes");
				this.$el.find('.timeLeftToMatch .seconds').html("<b>" + seconds + "</b> Seconds");
			}
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchesView;
});