define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"json/TeamPlayersInfo",
	"views/content/MatchRowView",
	"text!templates/content/UpComingMatchesTemplate.html",
	"moment"
], function($, _, Backbone, Globals, TeamPlayersInfo, MatchRowView, UpComingMatchesTemplate, moment){

	var UpComingMatchesView = Backbone.View.extend({
		template:  _.template(UpComingMatchesTemplate),

		events: {
			"click .upcoming-match": "showPredictionRow"
		},

		initialize: function(options) {
			var that = this;
			this.collection = options.collection;
			this.parent_el = options.parent_el;
		},

		render: function(){
			this.$el.html(this.template({
			    collection: this.collection,
			    moment: moment,
			    TeamPlayersInfo: TeamPlayersInfo
			}));
			this.parent_el.append(this.$el);
		},

		showPredictionRow: function(e) {
			var upcomingMatchElement = $(e.target).closest('.upcoming-match');

			var matchId = upcomingMatchElement.attr("data-attribute");
			var matchModel = $.grep(this.collection, function(e){ return e.get("_id") == matchId; })[0];
			
			if (upcomingMatchElement.find('i.fa').hasClass("fa-caret-right")) {
				upcomingMatchElement.after('<div class="prediction-row ' + matchId + '"></div>');

				upcomingMatchElement.find('i.fa').removeClass("fa-caret-right").addClass("fa-caret-down");

				this.matchRowView = new MatchRowView({
										model:matchModel,
										parent_el : this.$el.find('.prediction-row.'+matchId)
									});
				this.matchRowView.render();
			}
			else {
				this.matchRowView.close();
				this.$el.find('.prediction-row.'+matchId).remove();
				upcomingMatchElement.find('i.fa').addClass("fa-caret-right").removeClass("fa-caret-down");
			}
		},

		close : function(){
			this.matchRowView.close();
			this.$el.find('.prediction-row').remove();
			this.undelegateEvents();
			this.remove();
		}
	});

	return UpComingMatchesView;
});