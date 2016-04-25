// the is the router for the project page
define([
	"jquery",
	"underscore",
	"backbone",
	"globals",
	"views/dashboard/HeaderView",
	"views/dashboard/UserDashboardView",
	"views/dashboard/ResultsView",
	"views/content/PointsTableView",
	"views/dashboard/HelpFAQView"
], function($, _, Backbone, Globals, HeaderView, UserDashboardView, ResultsView, PointsTableView, HelpFAQView){

	var AppRouter = Backbone.Router.extend({
		
		initialize : function(){
			var loggedInUser = JSON.parse($('#dashboard').attr("data-attribute"));
			$('#dashboard').removeAttr("data-attribute");
			Globals["user"] = loggedInUser;

			var header = new HeaderView(Globals);
			header.render();
		},


		routes : {
			"results": "showResults",
			"points-table": "showPointsTable",
			"help": "showHelpFAQ",
			"*actions": "showDashboard",
		},

		cleanup_views : function(){
			if(this.previousView){
				this.previousView.close();
				this.previousView = null;
			}
		},

		showDashboard : function(){
			var userDashboard = new UserDashboardView();
			userDashboard.render();
			this.setActivePage();
			this.cleanup_views();
			this.previousView = userDashboard;
		},
		
		showResults : function(){
			var resultView = new ResultsView();
			resultView.render();
			this.setActivePage();
			this.cleanup_views();
			this.previousView = resultView;
		},

		showPointsTable: function() {
			var pointsTableView = new PointsTableView();
			pointsTableView.render();
			this.setActivePage();
			this.cleanup_views();
			this.previousView = pointsTableView;
		},

		showHelpFAQ: function() {
			var helpFaqView = new HelpFAQView();
			helpFaqView.render();
			this.setActivePage();
			this.cleanup_views();
			this.previousView = helpFaqView;
		},

		setActivePage: function() {
			var pages = ["dashboard", "results", "points-table", "help"];
			var page_name = this.getPage() || "dashboard";
			$('.header .menu .menu-item').removeClass("nav-active");

			if (pages.indexOf(page_name) > -1){
				$('.header .menu .menu-item#' + page_name +  "-nav").addClass('nav-active');
			}
		},

		getPage : function(){
			var page_name = window.location.href.split("/");
			var page_name = page_name[page_name.length-1];
			if (page_name.indexOf("#") !== -1){
				// special case for contact#apply
				page_name = page_name.split("#")[1];
			}
			return page_name;
		},

	});

	var router = new AppRouter();
	Backbone.history.start();

	return router;
});

