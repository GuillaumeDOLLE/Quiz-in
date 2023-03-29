
const adminMiddleware = (req, res, next) => {
  if (req.session.user) {
    console.log(req.session.user);
    if (req.session.user.role === "admin") {
      next();
    } else {
      res.redirect("/error/403");
    }
  } else {
    res.redirect("/login");
  }

};

module.exports = adminMiddleware;