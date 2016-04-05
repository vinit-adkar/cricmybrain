define([
	"jquery",
	"underscore",
	"backbone",
	"backbone-validation"
], function($, _, Backbone){

	var SignUpModel = Backbone.Model.extend({
		urlRoot: "/users",
			
		ignores: ['confirmpassword'],
		toJSON: function(options) {
			return _.omit(this.attributes, this.ignores);
		},
		

		defaults: {
			name: "",
			email: "",
			teamname: "",
			password: "",
			confirmpassword: ""
		},
		validation: {
			name: {
				required: true,
				msg: 'Name cannot be empty'
			},
			email: [
				{
					required: true,
					msg: 'Email cannot be empty'
				},
				{
					pattern: 'email',
					msg: "Please enter a valid email"
				}
			],
			teamname: {
				required: true,
				maxLength: 20
			},
			password: {
				minLength: 8
			},
			confirmpassword: {
				equalTo: "password",
				msg: "Passwords do not match"
			}
		}
	});
	return SignUpModel;
});
