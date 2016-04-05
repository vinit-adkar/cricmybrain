define([
	"jquery",
	"underscore",
	"backbone",
	"models/SignUpModel",
	"text!templates/splash/SignUpViewTemplate.html"
], function($, _, Backbone, SignUpModel, SignUpViewTemplate){

	var SignUpView = Backbone.View.extend({
		el : "#register",
		model: new SignUpModel(),

		template:  _.template(SignUpViewTemplate),
		events: {
			"click #register": "save"
		},

		initialize: function() {
			Backbone.Validation.bind(this);
			this.render();
		},

		render: function(){
			this.$el.html(this.template);
		},

		save: function(e) {
			var view = this;

			var data = this.$el.find('.form').serializeObject();
			this.model.set(data);

			if(this.model.isValid(true)){
				this.model.save(data, {
					success: function (response) {
						view.$el.find('.form').addClass("hidden");
						view.$el.find('.success-message').removeClass("hidden");
					},
					error: function (response) {
						alert("Encountered error while saving");
					},
				});
			}
		},

		remove : function(){
			Backbone.Validation.unbind(this);
			return Backbone.View.prototype.remove.apply(this, arguments);
		}
	});

	return SignUpView;
});