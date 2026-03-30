exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isLoggedIn) {
    return next();
  }
  // Persist the attempted URL so we can redirect after login
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};

exports.isGuest = (req, res, next) => {
  if (req.session && req.session.isLoggedIn) {
    return res.redirect("/");
  }
  next();
};

exports.isHost = (req, res, next) => {
  if (!req.session || !req.session.isLoggedIn) {
    req.session.returnTo = req.originalUrl;
    return res.redirect("/login");
  }

  if (req.session.user && req.session.user.userType === "host") {
    return next();
  }
  res.redirect("/?accessDenied=true");
};

exports.attachUser = (req, res, next) => {
  res.locals.isLoggedIn = req.session?.isLoggedIn || false;
  res.locals.user = req.session?.user || null;
  next();
};
