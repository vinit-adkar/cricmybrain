define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"moment",
	"collections/MatchesCollection",
	"views/content/AdminMatchRowView",
	"views/content/RecentMatchesView",
	"text!templates/content/AdminMatchesTemplate.html"
], function($, _, Backbone, Globals, moment, MatchesCollection, AdminMatchRowView, RecentMatchesView, AdminMatchesTemplate){

	var AdminMatchesView = Backbone.View.extend({
		el: "#matches-container",
		template:  _.template(AdminMatchesTemplate),

		initialize: function(options) {
			var that = this;
			this.$el.html(this.template);

			this.matches = new MatchesCollection({
								isResults: false,
								isRecent: true
							});
		},

		render: function(collection){
			var that = this;
			this.adminMatchRowView = [];
			this.recentMatchesView = [];

			this.matches.fetch({
				success: function(collection, response, options){
					that.matchesCollection = collection;
					if (that.matchesCollection.models.length) {
						var todaysMatches = [];
						var recentMatches = [];
						
						_.each(that.matchesCollection.models, function(model) {
							if (moment(Date.parse(model.get("date"))).format('MMMM Do YYYY') == moment.utc().format('MMMM Do YYYY')) {
								todaysMatches.push(model);
							}
							else {
								recentMatches.push(model);
							}
						});

						if (todaysMatches.length == 0) {
							that.$el.find("#matches-row-container").html("<p>There are no matches to display.</p>");
						}
						else {
							_.each(todaysMatches, function(matchModel) {
								var adminMatchRowView = new AdminMatchRowView({
														model:matchModel,
														parent_el : that.$el.find("#matches-row-container")
													});
								adminMatchRowView.render();
								that.adminMatchRowView.push(adminMatchRowView);
							});

						}

						if (recentMatches.length == 0) {
							that.$el.find("#recent-matches-container").html("<p>There are no matches to display.</p>");
						}
						else {
							var recentMatchesView = new RecentMatchesView({
														collection: recentMatches,
														parent_el: that.$el.find("#recent-matches-container")
													});
							recentMatchesView.render();
							that.recentMatchesView.push(recentMatchesView);
						}
					}
					else {
						that.$el.find("#matches-row-container").html("<p>There are no matches to display.</p>");
					}
				},
				error: function(response) {
					console.log("Error");
				}
			});
		},

		close : function(){

			_.each(this.adminMatchRowView, function(view) {
				view.close();
			});

			_.each(this.recentMatchesView, function(view) {
				view.close();
			});

			this.undelegateEvents();
			this.remove();
		}
	});

	return AdminMatchesView;
});