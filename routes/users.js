const express = require("express");
const basicAuth = require("express-basic-auth");

const LoginService = require("../services/LoginService");
const loginService = new LoginService();

const router = express.Router();

router.use(
  basicAuth({
    users: { admin: "admin" },
    unauthorizedResponse: loginService.getUnauthorizedResponse
  })
);

module.exports = params => {
  const { userService } = params;

  // Get all users
  router.get("/", async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      if (!users || !users.length)
        return res.status(200).send("No user in database");
      return res.status(200).json(users);
    } catch (err) {
      return next(err);
    }
  });

  // Add new user
  router.post("/", async (req, res, next) => {
    try {
      const { id, name, enterprise } = req.body;
      // TODO: validation (field min size, unique id)
      await userService.addUser(id, name, enterprise);
      return res
        .status(200)
        .send(`User ${name} (#${id}) was successfully added`);
    } catch (err) {
      return next(err);
    }
  });

  // Get user data
  router.get("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await userService.getUser(id);
      if (!user) {
        return res.status(404).send(`No entry found for user id #${id}`);
      }
      return res
        .status(200)
        .send(`${user.name} (#${user.id}) works at ${user.enterprise}`);
    } catch (err) {
      return next(err);
    }
  });

  // Update user data
  router.post("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const { name, enterprise } = req.body;
      // TODO: validation (field min size)
      const status = await userService.updateUser(id, name, enterprise);
      if (status.code == 404) return res.status(404).send(status.message);
      return res
        .status(status.code)
        .send(`User ${name} (#${id}) was successfully updated`);
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
