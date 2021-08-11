const { User } = require("../Models/user");
const Response = require("../Middlewares/response");
const UserService = require("../Services/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserController {
  constructor() { }
  async createAccount(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const response = new Response(0, "Error in creating user", 101, "User already exists", {});
        return res.status(200).send(response);
      }
      const hashedPassword = await User.hashPassword(password);
      req.body.password = hashedPassword;
      const userCreated = await UserService.saveUser(req.body);
      if (!userCreated) {
        const response = new Response(0, "Error in creating user", 101, "Error creating user", {});
        return res.status(200).send(response);
      }
      const payload = await User.createPayload(userCreated);
      let token = jwt.sign(payload, process.env.SECRET_KEY);
      const response = new Response(1, "User account created", "", "", {
        access_token: token,
      });
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async logIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        const response = new Response(0, "Error in user login", 101, "User does not exist", {});
        return res.status(200).send(response);
      }
      if (bcrypt.compareSync(password, user.password)) {
        const payload = await User.createPayload(user);
        let token = jwt.sign(payload, process.env.SECRET_KEY);
        const response = new Response(1, "User loggedIn successfully", "", "", {
          access_token: token,
        });
        return res.status(200).send(response);
      } else {
        const response = new Response(0, "Error in LogIn user", 101, "Wrong Password. Try Again", {});
        return res.status(200).send(response);
      }
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async updateUser(req, res) {
    const userId = req.params.userId || req.userId;
    const { email } = req.body;
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        const response = new Response(0, "Error in updating user", 101, "User does not exist", {});
        return res.status(200).send(response);
      }
      if (email) {
        const userExists = await UserService.findUserByEmail(email);
        if (userExists && !(userExists._id.equals(user._id))) {
          const response = new Response(0, "Error in updating user", 101, "Email already registered", {});
          return res.status(200).send(response);
        }
      }
      const updated = await UserService.saveUser(req.body, userId);
      const payload = await User.createPayload(updated);
      let token = jwt.sign(payload, process.env.SECRET_KEY);
      if (updated) {
        const response = new Response(1, "User updated successfully", "", "", {
          user: updated,
          access_token: token,
        });
        return res.status(200).send(response);
      }
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async getUser(req, res) {
    const userId = req.params.userId || req.userId;
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        const response = new Response(0, "Error in getting user", 101, "User does not exist", {});
        return res.status(200).send(response);
      }
      const response = new Response(1, "user data fetched successful", "", "", {
        user: user,
      });
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async deleteUser(req, res) {
    const userId = req.params.userId || req.userId;
    try {
      const user = await UserService.deleteUser(userId);
      if (!user) {
        const response = new Response(0, "Error in deleting user", 101, "User does not exist", {});
        return res.status(200).send(response);
      }
      const response = new Response(1, "user deleted successfuly", "", "", {
        user: user,
      });
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
}

module.exports = new UserController();
