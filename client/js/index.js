$(document).ready(function() {
	var activePage = $('.nav-tab.active').attr("data-attribute");
	$('.tab-pane').removeClass('active');
	$('#'+ activePage).addClass('active');


	$('.nav-tab').on("click", function() {
		var clickdElement = $(this).attr("data-attribute");
		$('.nav-tab').removeClass('active');
		$(this).addClass('active');
		$('.tab-pane').removeClass('active');
		$('#'+ clickdElement).addClass('active');
	});

	$("#login-form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
            }
        },
        messages: {
        	email: {
            	required: "Please enter an Email Address",
            	email: "Please enter a valid email address"
            },
            password: {
                required: "Please enter a Password",
                minlength: "Your password must be at least 8 characters long"
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });

    $("#sign-up-form").validate({
        rules: {
        	name: {
        		required: true,
        		minlength: 4,
        		maxlength: 32
        	},
            email: {
                required: true,
                email: true
            },
            teamname: {
        		required: true,
        		minlength: 3,
        		maxlength: 32
            },
            password: {
                required: true,
                minlength: 8,
                maxlength: 16
            },
            confirmpassword: {
            	equalTo: "#password"
            }
        },
        messages: {
        	name: {
        		required: "Please enter a Name",
        		minlength: "Your Name must be at least 4 characters long",
        		maxlength: "Your Name cannot exceed 32 characters"
        	},
            email: {
                required: "Please enter an Email Address",
                email: "Please enter a valid email address"
            },
            teamname: {
        		required: "Please enter Team Name",
        		minlength: "Your Team Name must be at least 3 characters long",
        		maxlength: "Your Team Name cannot exceed 32 characters"
            },
            password: {
                required: "Please enter a Password",
        		minlength: "Your password must be at least 8 characters long",
        		maxlength: "Your password cannot exceed 32 characters"
            },
            confirmpassword: {
            	equalTo: "Your passwords do not match"
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });

    $('.login-button').on("click", function() {
		$("#login-form").valid();
	});

	$('.sign-up-button').on("click", function() {
		$("#sign-up-form").valid();
	});

});
