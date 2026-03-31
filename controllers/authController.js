exports.getLogin = (req, res, next) => {
  console.log(req.url, req.method);
  res.render("auth/login", {
    pageTitle: "Login to airbnb",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  res.cookie("isLoggedIn", "true");
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  //can do any of the following to clear the cookie
  res.clearCookie("isLoggedIn");
  //res.cookie("isLoggedIn", "false");

  res.redirect("login");
};
