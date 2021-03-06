const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();

const JSONtoCourseMiddleWare = require("./icsHelper");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));

app.get("/main", (req, res) => {
  res.sendFile("/index.html");
});

app.get("/download", (req, res) => {
  const file = req.query.file;
  const fileLocation = path.join(__dirname, "file", file);
  console.log(fileLocation);
  res.download(fileLocation, "Schedule.ics");
});

router.route("/store").post((req, res) => {
  const content = req.body.content;
  const fileName = req.body.file;
  JSONtoCourseMiddleWare(content, fileName);
  res.json({ file: `${fileName}.ics` });
});

app.use("/api", router);

app.listen(4431);
