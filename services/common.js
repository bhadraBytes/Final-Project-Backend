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
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmJmNDMwZWM2ODU5N2VkYzcxOTk4YSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE0MTU2ODg5fQ.Qcupxrw8vdyFwL4sDVfSBmoqVYVJVQEhAdm-xm9ta24"
  return token;
};
// ...
// opts.jwtFromRequest = cookieExtractor;
