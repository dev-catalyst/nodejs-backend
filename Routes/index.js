const user = require("./user");
const account = require("./account");
const home = require("./home");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send({
      message: "Register or Login to use the APIS.",
    });
  });
  app.use("/api/user", user);
  app.use("/api/account", account);
  app.use("/api/home", home);

};
