const fs = require("fs");
const util = require("util");
const basicAuth = require("basic-auth");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class LoginService {
  constructor(datafile) {
    this.datafile = datafile;
  }

  async login(request) {
    var cred = basicAuth(request);
    if (!cred) {
      return { code: 401, message: "No credentials" };
    }
    const loginData = JSON.parse(fs.readFileSync(this.datafile, "UTF-8")).users;
    if (!loginData[cred.name]) {
      return { code: 401, message: "Wrong username" };
    } else if (loginData[cred.name] === cred.pass) {
      return { code: 200, message: "Valid credentials" };
    }
    return { code: 401, message: "Wrong password" };
  }
}

module.exports = LoginService;
