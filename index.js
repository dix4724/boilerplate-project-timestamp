// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// endpoint for requests with dates (/api/:date?)
app.get("/api/:date", (req, res) => {
  let dateInput = req.params.date;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
  if (dateRegex.test(dateInput)) {
    let dateObject = new Date(dateInput);
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  } else {
    let dateInt = parseInt(dateInput);
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
