Makes it possible to access currently authenticated user from within app
https://github.com/strongloop/loopback/issues/569#issuecomment-62690674

**Use like this:**

```javascript
var ctx = loopback.getCurrentContext();
var currentUser = ctx && ctx.get('currentUser');

// Put it in the file 'server.js' here:
// -- Add your pre-processing middleware here --
require('../co-loopback-context')(app, 'nameOfUserModel')
```