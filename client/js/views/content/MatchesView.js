define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"collections/MatchesCollection",
	"views/content/MatchRowView",
	"text!templates/content/MatchesTemplate.html"
], function($, _, Backbone, Globals, MatchesCollection, MatchRowView, MatchesTemplate){

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
					_.each(collection.models, function(model) {
						var matchRowView = new MatchRowView({
											model:model,
											parent_el : that.$el.find("#matches-row-container")});
						matchRowView.render();
					});
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