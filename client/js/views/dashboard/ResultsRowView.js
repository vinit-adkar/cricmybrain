define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"json/TeamPlayersInfo",
	"json/RulesInfo",
	"collections/PredictionsCollection",
	"collections/PointsCollection",
	"text!templates/dashboard/ResultsRowTemplate.html",
	"moment"
], function($, _, Backbone, Globals, TeamPlayersInfo, RulesInfo, PredictionsCollection, PointsCollection, ResultsRowTemplate, moment){

	var ResultsRowView = Backbone.View.extend({
		template:  _.template(ResultsRowTemplate),

		initialize: function(options) {
			this.matchModel = options.model;
			this.render_el = options.render_el;
		
			this.matchModelJSON = this.matchModel.toJSON();

			this.predictionCollection = new PredictionsCollection({
											matchId: this.matchModelJSON._id
										});
			this.users = new PointsCollection();

		},

		render: function(){
			var that = this;

			this.predictionCollection.fetch({
				success: function(collection, model, options) {
					that.predictionsCollection = collection;
					that.fetchUsers();
				},
				error: function() {
					console.log("error");
				}
			});
		},

		fetchUsers: function() {
			var that = this;
			this.users.fetch({
				success: function(collection, response, options){
					that.matchModelJSON.date = moment(Date.parse(that.matchModelJSON.date)).format('MMMM Do YYYY, h:mm a');

					var users = {};
					_.each(collection.toJSON(), function(user) {
						users[user._id] = {name:user.name, teamname: user.teamname};
					});

					that.$el.html(that.template({
						predictions: that.predictionsCollection.toJSON(),
						match: that.matchModelJSON,
						teams_info: TeamPlayersInfo.getAllTeamName(),
						rule1: RulesInfo.getRules("rule1"),
					    rule2: RulesInfo.getRules("rule2"),
					    rule3: RulesInfo.getRules("rule3"),
					    bonusRule: RulesInfo.getRules(that.matchModelJSON.bonusRule),
					    users: users,
					    loggedInUser: Globals["user"]
					}))
					that.render_el.html(that.$el);
				},
				error: function(response) {
					console.log("Error");
				}
			});
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return ResultsRowView;
});