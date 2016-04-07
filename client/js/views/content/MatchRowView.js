define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"text!templates/content/MatchRowTemplate.html"
], function($, _, Backbone, Globals, MatchRowTemplate){

	var MatchesView = Backbone.View.extend({
		template:  _.template(MatchRowTemplate),

		initialize: function(options) {
			var that = this;
			this.$el = options.el;
			this.model = options.model;
			this.render();
		},

		render: function(){
			this.$el.append(this.template({
			    model: this.model.toJSON()
			}));
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return MatchesView;
});