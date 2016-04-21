define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"json/TeamPlayersInfo",
	"collections/MatchesCollection",
	"views/dashboard/ResultsRowView",
	"text!templates/dashboard/ResultsTemplate.html"
], function($, _, Backbone, Globals, TeamPlayersInfo, MatchesCollection, ResultsRowView, ResultsTemplate){

	var UserDashboardView = Backbone.View.extend({
		className: "results-content",
		template:  _.template(ResultsTemplate),
		render_el: $('#dashboard'),

		events: {
			 "change .match-list": "matchSelected"
		},

		initialize: function() {
			this.matches = new MatchesCollection({
								isResults: true
							});
		},

		render: function(){
			var that = this;
			this.matches.fetch({
				success: function(collection, model, options){
					that.collection = collection;

					that.$el.html(that.template({
					    collection: collection.toJSON(),
					    teams_info: TeamPlayersInfo.getAllTeamName()
					}));
					that.render_el.html(that.$el);
					that.$el.find('.match-list option:last').attr('selected', 'selected').change();
				},
				error: function(response) {
					console.log(response);
				}
			});
		},

		matchSelected: function(e) {
			var that = this;

			if (this.resultsRow) {
				this.resultsRow.close();
			}

			var selectedMatchId = $(e.target).val();
			var matchModel = that.collection.where({"_id": selectedMatchId})[0];

			this.resultsRow = new ResultsRowView({
									model:matchModel,
									render_el: this.$el.find('.results-row')
								});
			this.resultsRow.render();
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return UserDashboardView;
});