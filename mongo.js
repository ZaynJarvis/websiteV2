const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://ZaynJarvis:Liu!1234@ds233228.mlab.com:33228/chrome"
);

const db = mongoose.connection;
db.on("error", console.log);
db.once("open", () => console.log("connected"));

const infoSchema = mongoose.Schema({
  title: String,
  sub: String,
  p: String,
  show: Boolean
});

module.exports = mongoose.model("info", infoSchema);
