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
			match.date = moment(Date.parse(match.date)).format('MMMM Do YYYY, h:mm:ss a')
			this.$el.html(this.template({
			    match: match
			}));
			that.parent_el.append(this.$el);

			this.predictionModel = new PredictionModel({
										user_id: Globals["user"].id,
									 	match_id: match["_id"]
									});
			
			this.predictionModel.fetch({
				success: function(model, response, options) {
					var predictionRowView = new PredictionRowView({
												matchModel: that.model,
												model: model
											});
					that.$el.find('.prediction-row').html(predictionRowView.render());
					return that.$el;
				},
				error: function() {
					console.log("error in matchrowview render");
				}
			});
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchesView;
});