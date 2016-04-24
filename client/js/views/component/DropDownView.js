define([
	"jquery",
	"underscore",
	"backbone",
	"text!templates/component/DropDownTemplate.html"
], function($, _, Backbone,  DropDownTemplate){

	var DropDownView = Backbone.View.extend({
		className: "dropdown",
		template:  _.template(DropDownTemplate),

		events :{
			"click .dropdown-menu li": "selectListItem"
		},

		initialize: function(options) {
			this.listItemArray = options.listItemArray;
			this.placeholder = options.placeholder;
			this.selectedItem = options.selectedItem;
		},

		render: function(){
			this.$el.html(this.template({
				listArray:this.listItemArray,
				placeholder: this.placeholder,
				selectedItem: this.selectedItem
			}));
			return this.$el;
		},

		selectListItem: function(e) {
			if (!(this.$el.find('.dropdown-toggle').hasClass("disabled"))) {
				e.preventDefault();
				var clickdElement = $(e.target).closest("li");
				if (clickdElement.hasClass("dropdown-header")) {
					return;
				}
				else {
					clickdElement.closest("ul").find("li").removeClass("selected");
					clickdElement.addClass("selected");
					this.$el.find('.dropdown-value').html(clickdElement.html());
					this.$el.find('.dropdown-value').attr("value",clickdElement.attr("value"));
				}				
			}
		},

		close : function(){
			this.undelegateEvents();
			this.remove();
		}
	});

	return DropDownView;
});