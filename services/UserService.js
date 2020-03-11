const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class UserService {
  constructor(datafile) {
    this.datafile = datafile;
  }

  async getUsers() {
    const data = await readFile(this.datafile, "utf8");
    if (!data) return [];
    const users = JSON.parse(data).users;
    return users;
  }

  async getUser(id) {
    const users = await this.getUsers();
    const user = users.find(el => {
      return el.id === id;
    });
    if (!user) return null;
    return user;
  }

  async addUser(id, name, enterprise) {
    const users = await this.getUsers();
    users.unshift({ id, name, enterprise });
    return writeFile(this.datafile, JSON.stringify({ users }));
  }

  async updateUser(id, name, enterprise) {
    const users = await this.getUsers();
    if (!users || !users.length)
      return { code: 404, message: "No user in database" };
    const user = users.find(el => {
      return el.id === id;
    });
    if (!user) return { code: 404, message: `No user #${id} found` };
    const userIndex = users.indexOf(user);
    const updatedUser = { id, name, enterprise };
    users.splice(userIndex, 1, updatedUser);
    writeFile(this.datafile, JSON.stringify({ users }));
    return { code: 201, message: `User #${id} updated with success` };
  }
}

module.exports = UserService;
