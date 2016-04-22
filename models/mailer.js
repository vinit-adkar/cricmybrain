var nodemailer = require('nodemailer');
var emailTemplates = require('email-templates');

// create a defaultTransport using gmail
var defaultTransport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: 'cricmybrain@gmail.com',
    pass: 'brainstorm@10'
  }
});

var transport = defaultTransport;

exports.sendEmail = function (userEmail, subjectEmail, htmlEmail, textEmail, fn) {
    // make sure that we have an user email
    if (!userEmail) {
       return fn('Invalid Email');
    }
    // make sure that we have a message
    if (!subjectEmail) {
       return fn('Invalid Subject');
    }
	transport.sendMail({
	        from: 'cricmybrain <cricmybrain@gmail.com>',
	        to: userEmail,
	        subject: subjectEmail,
	        html: htmlEmail,
	        text : textEmail
	      }, function(error, response){
	      	if(error) {
	           console.log(error);
	           return fn(error);
	        } else {
	           console.log(response);
	           return fn('Success')
	        }
	});
}