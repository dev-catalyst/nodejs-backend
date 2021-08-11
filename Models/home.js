const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  path: { type: String, required: true },
  desciption: { type: String, required: true },
});
const Home = mongoose.model("Home", HomeSchema, "Home");
module.exports = { Home };
