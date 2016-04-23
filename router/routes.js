// app/routes.js
module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        var message = [];
        var isSuccess = false;
        var showLogin = true;

        var flashMessage = req.flash();
        if ('signUpErrorMessage' in flashMessage) {
            message = flashMessage["signUpErrorMessage"];
            showLogin = false;
        }
        if ('signUpSuccessMessage' in flashMessage) {
            message = flashMessage["signUpSuccessMessage"];
            isSuccess = true
            showLogin = true;
        }
        if ('loginErrorMessage' in flashMessage) {
            message = flashMessage["loginErrorMessage"];
            showLogin = true;
        }

        res.render('index.ejs', { message: message, isSuccess: isSuccess, showLogin: showLogin });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard',
        failureRedirect : '/',
        failureFlash : true
    }));

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/',
        failureFlash : true
    }));

    app.get('/dashboard', isLoggedIn, function(req, res) {
        var user = {
            id:req.user.id,
            admin: req.user.admin,
            teamname: req.user.teamname,
            email: req.user.email,
            points: req.user.points,
            name: req.user.name
        }
        res.render('dashboard.ejs', {
            user : JSON.stringify(user)
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}