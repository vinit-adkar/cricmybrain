define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"json/TeamPlayersInfo",
	"models/PredictionModel",
	"views/content/PredictionRowView",
	"text!templates/content/MatchRowTemplate.html",
	"moment",
	"events"
], function($, _, Backbone, Globals, TeamPlayersInfo, PredictionModel, PredictionRowView, MatchRowTemplate, moment, Vents){

	var MatchRowView = Backbone.View.extend({
		className: "match-row",
		template:  _.template(MatchRowTemplate),

		initialize: function(options) {
			var that = this;
			this.model = options.model;
			this.parent_el = options.parent_el;
			this.modelJSON = this.model.toJSON();
			this.eventDispatcher = Vents;
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
					that.predictionRowView = new PredictionRowView({
												matchModel: that.model,
												model: model
											});
					that.$el.find('.prediction-row').html(that.predictionRowView.render());

					that.timer = setInterval(function() {
						var currDateTime = new Date().getTime();
						var matchDateTime = Date.parse(that.model.get("date"));
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
				this.eventDispatcher.trigger("timer:expired");
			} else {
				this.$el.find('.timeLeftToMatch').removeClass("hidden");
				var seconds = Math.floor((timeLeft/1000) % 60);
				var minutes = Math.floor((timeLeft/1000/60) % 60);
				var hours = Math.floor((timeLeft/(1000*60*60)) % 24);
				var days = Math.floor(timeLeft/(1000*60*60*24));

				if (days){
					this.$el.find('.timeLeftToMatch .days').html("<b>" + days + "</b> Days");
				}
				this.$el.find('.timeLeftToMatch .hours').html("<b>" + hours + "</b> Hours");
				this.$el.find('.timeLeftToMatch .minutes').html("<b>" + minutes + "</b> Minutes");
				this.$el.find('.timeLeftToMatch .seconds').html("<b>" + seconds + "</b> Seconds");
			}
		},

		close : function(){
			this.predictionRowView.close();
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchRowView;
});