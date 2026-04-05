require("dotenv").config();
const Port = process.env.PORT || 3000;
const DB_Util = process.env.MONGO_URI;

// Importing required modules
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");
const multer = require("multer");
const { default: mongoose } = require("mongoose");

// Initializing the Express application and setting up routes and middleware
const app = express();
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const err404 = require("./controllers/404");

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: DB_Util,
  collection: "sessions",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerOptions = {
  storage,
  fileFilter,
};

app.use(express.urlencoded({ extended: true }));
app.use(multer(multerOptions).single("photo"));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));
app.use(express.static(path.join(rootDir, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
  }),
);
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  next();
});

app.use("/host", (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(authRouter);
app.use(err404.Controller404);

mongoose
  .connect(DB_Util)
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port} http://localhost:${Port}`);
    });
  })
  .catch((err) => {
    console.log("error while connecting to DB", err);
  });
