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
		el : "#matches-container",
		template:  _.template(MatchesTemplate),

		initialize: function() {
			var that = this;

			this.matches = new MatchesCollection();
			this.matches.fetch({
				success: function(collection, response, options){
					that.render(collection);
				},
				error: function(response) {
					console.log("Error");
				}
			});
		},

		render: function(collection){
			var that = this;
			this.$el.html(this.template);
			this.matchRowView = [];

			_.each(collection.models, function(model) {
				var matchRowView = new MatchRowView({model:model, el:that.$el.find('#matches-row-container')});
			});
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchesView;
});