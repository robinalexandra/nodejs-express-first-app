const express = require("express");
const bodyParser = require("body-parser");

const UserService = require("./services/UserService");
const userService = new UserService("./data/users.json");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.status(200).send(`Hello world!`);
});

// Get all users
app.get("/users", async (req, res, next) => {
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
app.post("/users", async (req, res, next) => {
  try {
    const { id, name, enterprise } = req.body;
    // TODO: validation (field min size, unique id)
    await userService.addUser(id, name, enterprise);
    return res.status(200).send(`User ${name} (#${id}) was successfully added`);
  } catch (err) {
    return next(err);
  }
});

// Get user data
app.get("/users/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userService.getUser(id);
    if (!user) {
      return res.status(404).send(`No entry found for id ${id}`);
    }
    return res
      .status(200)
      .send(`${user.name} (#${user.id}) works at ${user.enterprise}`);
  } catch (err) {
    return next(err);
  }
});

// Update user data
app.post("/users/:id", async (req, res, next) => {
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

// TODO: authentication

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
