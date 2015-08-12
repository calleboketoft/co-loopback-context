// Makes it possible to access currently authenticated user
// https://github.com/strongloop/loopback/issues/569#issuecomment-62690674
// var ctx = loopback.getCurrentContext();
// var currentUser = ctx && ctx.get('currentUser');
// Put it in the file 'server.js' here:
// -- Add your pre-processing middleware here --
// require('../co-loopback-context')(app)
var loopback = require('loopback');
module.exports = function (app) {
    app.use(loopback.context());
    app.use(loopback.token());
    app.use(function (req, res, next) {
        if (!req.accessToken)
            return next();
        app.models.User.findById(req.accessToken.userId, function (err, user) {
            if (err)
                return next(err);
            if (!user)
                return next(new Error('No user with this access token was found.'));
            res.locals.currentUser = user;
            var loopbackContext = loopback.getCurrentContext();
            if (loopbackContext)
                loopbackContext.set('currentUser', user);
            next();
        });
    });
};
//# sourceMappingURL=co-loopback-context.js.map