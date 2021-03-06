const express = require("express"),
    bodyParser = require("body-parser"),
    app = express().use(bodyParser.json()),
    http = require("http"),
    https = require("https"),
    fs = require("fs"),
    cors = require("cors"),
    path = require("path");
const Info = require("./mongo");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

// Port setup
app.listen(3000);

function respond(err, result, res) {
    if (result)
        res.send(
            JSON.stringify({
                title: result.title,
                sub: result.sub,
                p: result.p,
                show: result.show
            })
        );
    else
        res.send({});
}
app.get("/api", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    console.log(req.query);
    if (req.query.school !== undefined)
        Info.findOne({ school: req.query.school }, {}, { sort: { created_at: 1 } }, (e, v) => respond(e, v, res));
    else if (req.query.name !== undefined)
        Info.findOne({ name: req.query.name }, {}, { sort: { created_at: 1 } }, (e, v) => respond(e, v, res));
    else
        Info.findOne({ school: "all" }, {}, { sort: { created_at: 1 } }, (e, v) => respond(e, v, res));
});

app.post("/api", (req, res) => {
    const content = req.body;
    const info = new Info({
        title: content.title,
        sub: content.sub,
        p: content.p,
        show: content.show,
        date: new Date().getTime()
    });
    console.log(info);
    info.save((err, info) => {
        if (err) res.json({ state: err });
        else res.json({ state: `successed` });
    });
});

// Routing
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
});
