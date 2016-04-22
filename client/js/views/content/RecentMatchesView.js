define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"json/TeamPlayersInfo",
	"views/content/AdminMatchRowView",
	"text!templates/content/RecentMatchesTemplate.html",
	"moment"
], function($, _, Backbone, Globals, TeamPlayersInfo, AdminMatchRowView, RecentMatchesTemplate, moment){

	var RecentMatchesView = Backbone.View.extend({
		template:  _.template(RecentMatchesTemplate),

		events: {
			"click .recent-match": "showAdminMatchRow"
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

		showAdminMatchRow: function(e) {
			var recentMatchElement = $(e.target).closest('.recent-match');

			var matchId = recentMatchElement.attr("data-attribute");
			var matchModel = $.grep(this.collection, function(e){ return e.get("_id") == matchId; })[0];
			
			if (recentMatchElement.find('i.fa').hasClass("fa-caret-right")) {
				recentMatchElement.after('<div class="recent-match-row ' + matchId + '"></div>');

				recentMatchElement.find('i.fa').removeClass("fa-caret-right").addClass("fa-caret-down");

				this.matchRowView = new AdminMatchRowView({
										model:matchModel,
										parent_el : this.$el.find('.recent-match-row.'+matchId)
									});
				this.matchRowView.render();
			}
			else {
				this.matchRowView.close();
				this.$el.find('.recent-match-row.'+matchId).remove();
				recentMatchElement.find('i.fa').addClass("fa-caret-right").removeClass("fa-caret-down");
			}
		},

		close : function(){
			this.matchRowView.close();
			this.$el.find('.recent-match-row').remove();
			this.undelegateEvents();
			this.remove();
		}
	});

	return RecentMatchesView;
});