const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://ZaynJarvis:Liu!1234@ds233228.mlab.com:33228/chrome",
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", console.log);
db.once("open", () => console.log("connected"));

const infoSchema = mongoose.Schema({
  school: String,
  name: String,
  title: String,
  sub: String,
  p: String,
  show: Boolean,
  date: Number
});

module.exports = mongoose.model("infos", infoSchema);
