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
			var data = this.$el.find('.form').serializeObject();
	        this.model.set(data);
	        
	        if(this.model.isValid(true)){
	        	this.model.save();
	        }
		},

		remove : function(){
			Backbone.Validation.unbind(this);
        	return Backbone.View.prototype.remove.apply(this, arguments);
		}
	});

	return SignUpView;
});