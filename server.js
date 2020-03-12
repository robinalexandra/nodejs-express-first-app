const express = require("express");
const bodyParser = require("body-parser");

const UserService = require("./services/UserService");
const userService = new UserService("./data/users.json");

const usersRoute = require("./routes/users");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.status(200).send(`POC DWC Node.js`);
});

app.use("/users", usersRoute({ userService }));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
