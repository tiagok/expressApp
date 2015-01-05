
var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  http = require('http');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded());
app.use(methodOverride('X-HTTP-Method-Override'));

mongoose.connect('mongodb://localhost/helloExpress');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

Users = mongoose.model('Users', UserSchema);

app.get('/users', function(req, res) {
  Users.find({}, function(err, docs) {
    // res.send('heeeelo');
    res.render('users/index.jade', {
      users: docs
    });
  });
});

// NEW
app.get('/users/new', function(req, res) {
  res.render('users/new.jade');
});

// CREATE
app.post('/users', function(req, res) {
  var b = req.body;
  new Users({
    name: b.name,
    email: b.email,
    age: b.age
  }).save(function(err, docs) {
    if(err) {
      res.json(err);
    }
    res.redirect('/users/' + docs.name);
  });
});

app.param('name', function(req, res, next, name) {
  Users.find({ name: name }, function(err, docs) {
    req.user = docs[0];
    next();
  });
});

// SHOW
app.get('/users/:name', function(req, res) {
  res.render('users/show.jade', {
    user: req.user
  });
});

// EDIT
app.get('/users/:name/edit', function(req, res) {
  res.render('users/edit', {
    user: req.user
  })
});

// UPDATE
app.post('/users/:name', function(req, res) {
  var b = req.body,
  conditions = { name: req.params.name },
  update = { name: b.name, email: b.email, age: b.age },
  options = { multi: true };
  Users.update(conditions, update, options, function(err) {
    res.redirect('/users/' + b.name);
  });
});

// app.put('/user/:name', function(req, res) {
//   var b = req.body;
//   Users.update(
//     { name: req.params.name },
//     { name: b.name, email: b.email, age: b.age },
//     {},
//     function(err) {
//       res.redirect('/users/' + b.name);
//     }
//   );
// });

app.post('/users/:name/delete', function(req, res) {
  Users.remove({ name: req.params.name }, function(err) {
    res.redirect('/users');
  });

});













app.use(express.static('./public'));

app.listen(app.get('port'), function() {
  console.log('love is the answer');
});



//
