class LoginService {
  getUnauthorizedResponse(req) {
    return req.auth
      ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
      : "No credentials provided";
  }
}

module.exports = LoginService;
