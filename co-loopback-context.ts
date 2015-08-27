var loopback = require('loopback')

module.exports = function (app, userModelName) {
  app.use(loopback.context())
  app.use(loopback.token())
  app.use((req, res, next) => {
    if (!req.accessToken) return next()
    app.models[userModelName].findById(req.accessToken.userId, (err, user) => {
      if (err) return next(err)
      if (!user) return next(new Error('No user with this access token was found.'))
      res.locals.currentUser = user
      var loopbackContext = loopback.getCurrentContext()
      if (loopbackContext) loopbackContext.set('currentUser', user)
      next()
    })
  })
}
