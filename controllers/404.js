exports.Controller404 = (req, res, next) => {
  res
    .status(404)
    .render("404", {
      pageTitle: "Page Not Found",
      isLoggedIn: req.session.isLoggedIn || false,
      user: req.session.user,
    });
};
