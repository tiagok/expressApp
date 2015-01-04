var express = require('express'),
  app = express();

app.get('/:breedOfDog?name=Andrew', function(req, res) {
  req.params.ATTR;
  req.params.breedOfDog;
  req.query.ATTR;
  req.body.ATTR;
  req.param('ATTR'); // params, body, query

  req.route; // REGEX
  req.originalUrl;

  req.cookies.ATTR;
  req.get(); // any header name
  req.accepts('text/html');
  req.ip

  res.status(200);
  res.set(header, value);
  res.get(header);

  res.cookie(name, value);
  res.clearCookie(name);

  res.redirect(status, path);
  res.send(status, text);
  res.json(status, object); // JSON.stringify
  res.jsonp(status, object) // json with patting // in a callback
  res.download(file);

  res.render(file, props, function(err, html) {
    res.send(200, html);
  });

  // new 4
  res.format({
    'text/plain': function() {
      resp.send();
    },
    'text/html': function() {
      res.render();
    },
    'application/json': function() {
      res.json({}); // postman client 
    }
  });








});

app.listen(3000);
