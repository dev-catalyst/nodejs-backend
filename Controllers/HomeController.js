const { Home } = require("../Models/home");
const Response = require("../Middlewares/response");

class HomeController {
  constructor() { }
  async getHomeImages(req, res) {
    try {
      const homeImages = await Home.find();
      if (!homeImages) {
        const response = new Response(0, "Error in getting Images", 101, "Images do not exist", {});
        return res.status(200).send(response);
      }
      const response = new Response(1, "Home data fetched successful", "", "", {
        data: homeImages,
      });
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
}
module.exports = new HomeController();
