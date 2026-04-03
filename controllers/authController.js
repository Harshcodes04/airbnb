const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  console.log(req.url, req.method);
  res.render("auth/login", {
    pageTitle: "Login to airbnb",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login to airbnb",
      isLoggedIn: false,
      errors: ["Invalid email or password"],
      oldInput: { email: email },
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login to airbnb",
      isLoggedIn: false,
      errors: ["Invalid email or password"],
      oldInput: { email: email },
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  req.session.save((err) => {
    if (err) {
      console.log("Session save error", err);
    }
    res.redirect("/");
  });
};

exports.postLogout = (req, res, next) => {
  //can do any of the following to clear the cookie
  //res.clearCookie("isLoggedIn");
  //res.cookie("isLoggedIn", "false");\
  //Now we are not even using cookies directly, we are using sessions, so we need to destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.log("Error saving the session", err);
    }
    res.redirect("/login");
  });
};

exports.getSignup = (req, res, next) => {
  console.log(req.url, req.method);
  res.render("auth/signup", {
    pageTitle: "Sign up for airbnb",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      userType: "",
    },
  });
};

exports.postSignup = [
  check("firstName")
    .notEmpty()
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name should be at least 2 characters long")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First name should contain only letters"),

  check("lastName")
    .notEmpty()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name should be at least 2 characters long")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Last name should contain only letters"),

  check("email").isEmail().withMessage("Please enter a valid email address"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password should contain at least one special character")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["host", "guest"])
    .withMessage("Invalid user type"),

  check("terms")
    .notEmpty()
    .withMessage("Please accept the terms and conditions")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      userType,
      terms,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Sign up for airbnb",
        isLoggedIn: false,
        errors: errors.array().map((err) => {
          return err.msg;
        }),
        oldInput: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          userType,
        },
      });
    }
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        console.log("User created successfully");
        res.redirect("/login");
      })
      .catch((err) => {
        //  console.log("Error creating user:", err);
        return res.status(422).render("auth/signup", {
          pageTitle: "Signup",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: {
            firstName,
            lastName,
            email,
            userType,
          },
        });
      });
  },
];
