const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjdiOWJmZTUyNWYwNDQzNjYzNDFjNiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEzODc5NDg3fQ.Mtz9vIe76MKb-0Omgm101ovWjle2WUJs8NFkCuX6Bao";
  return token;
};
// ...
// opts.jwtFromRequest = cookieExtractor;
