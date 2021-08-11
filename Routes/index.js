const user = require("./user");
const account = require("./account");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send({
      message: "Welcome to the Techspecs APIs. Register or Login to use the APIS.",
    });
  });
  app.use("/api/user", user);
  app.use("/api/account", account);
};
