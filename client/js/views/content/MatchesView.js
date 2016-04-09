define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"collections/MatchesCollection",
	"views/content/MatchRowView",
	"views/content/AdminMatchRowView",
	"text!templates/content/MatchesTemplate.html"
], function($, _, Backbone, Globals, MatchesCollection, MatchRowView, AdminMatchRowView, MatchesTemplate){

	var MatchesView = Backbone.View.extend({
		el: "#matches-container",
		template:  _.template(MatchesTemplate),

		initialize: function(options) {
			var that = this;
			this.$el.html(this.template);

			this.matches = new MatchesCollection();
		},

		render: function(collection){
			var that = this;
			
			this.matches.fetch({
				success: function(collection, response, options){
					if (collection.models.length) {
						_.each(collection.models, function(model) {
							if (Globals["user"].admin) {
							var matchRowView = new AdminMatchRowView({
												model:model,
												parent_el : that.$el.find("#matches-row-container")});

							}
							else {
							var matchRowView = new MatchRowView({
												model:model,
												parent_el : that.$el.find("#matches-row-container")});
							}
							matchRowView.render();
						});						
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
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchesView;
});