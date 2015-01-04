var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    APIv1 = require('./api1');

function log(req, res, next) {
  console.log('super loggggging');
  next();
}

// third-party middleware
app.use(bodyParser.urlencoded());

// Router Object
// - use
// - param
// - verb (get, post ..) / all
// - param

var router = express.Router({
  caseSensitive: false,
  strict: true
});
router.use(function(req, res, next) {
  console.log('router specific middleware');
  next();
});
router.get('/', function(req, res) {
  res.send('router home root');
});
app.use('/rrr/', router);
app.use('/api/v1', APIv1);




// custom middleware
app.use(function(req, res, next) {
  console.log('this will log in every request');
  next();
});

// route functions
app.route('/teste')
  .all()
  .get()
  .post()
  .put()
  .delete();


app.all('/', function(req, res, next) {
  // res.send('alllll of my love');
  console.log('FROM ALL');
  next();
});

names = ['tiago', 'antonio', 'jenny', 'mario', 'carol'];

app.param('apples', function(req, res, next, apples) {
  req.apples = apples[0].toUpperCase() + apples.substring(1);
  next();
  // Users.findOne({ username: apples }, function(err, user) {
  //   req.user = user;
  //   next();
  // });
});

app.get('/name/:apples', function(req, res, next) {
  // res.send('your name is ' + req.params.apples);
  res.send('your name is ' + req.apples);
});

app.get('/', log,
  function(req, res, next) {
    console.log('some stufff');
    next();
  }, function(req, res) {
  res.render('index.jade', { names: names });
});

app.post('/', function(req, res) {
  names.push(req.body.name);
  res.redirect('/');
});


// built-in middleware
app.use(express.static('./public'));



app.listen(3000, function() {
  console.log('listeniiiiing');
});








// app.get('/', function(req, res) {
//   // res.send('heeeeelo world');
//   res.render('index.jade', {
//     title: 'hello my sons and doughters'
//
//   });
// });





// GET
// POST
// PUT
// DELETE






// app.set();
// app.enable();
// app.disable();
//
// app.get();
// app.enabled();
// app.disabled();

// app.set('env', 'development'); // process.env.NODE_ENV = 'production'
// // app.enabled('trust proxy'); // for reverse proxy
// app.set('jsonp callback name', 'cb');
// // cb({ shit: 'foo' });
// app.set('json replacer', function(attr, val) {
//   if(attr === "passwordHash") {
//     return undefined;
//   }
//   return val;
// });
// app.get('/user_info', function() {
//   // get user data from database
//   res.json(user); // JSON.stringify
// });
// app.enabled('case sensitive routing');
// app.enabled('strict routing');
// app.enable('view cache');
// app.set('view engine', 'jade');
// app.set('views', 'templates');
// app.enabled('x-powered-by');
