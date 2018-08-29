const express = require("express"),
  bodyParser = require("body-parser"),
  app = express().use(bodyParser.json()),
  http = require("http"),
  https = require("https"),
  fs = require("fs"),
  cors = require("cors"),
  path = require("path");
const Info = require("./mongo");

// HTTPS setup
const options = {
  key: fs.readFileSync("../cert/zaynjarvis.com.key"),
  cert: fs.readFileSync("../cert/zaynjarvis_com.crt"),
  ca: fs.readFileSync("../cert/zaynjarvis_com.ca-bundle")
};

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

// Port setup
https.createServer(options, app).listen(443);
// Redirect from http port 80 to https
http
  .createServer(function(req, res) {
    res.writeHead(301, {
      Location: "https://" + req.headers["host"] + req.url
    });
    res.end();
  })
  .listen(80);

app.get("/api", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  Info.findOne({}, {}, { sort: { created_at: 1 } }, function(err, result) {
    res.send(
      JSON.stringify({
        title: result.title,
        sub: result.sub,
        p: result.p,
        show: result.show
      })
    );
  });
});

app.post("/api", (req, res) => {
  const content = req.body;

  const info = new Info({
    title: content.title,
    sub: content.sub,
    p: content.p,
    show: content.show
  });

  info.save((err, info) => {
    if (err) res.json({ state: `success` });
    else res.json({ state: `failed` });
  });
});

// Routing
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});
