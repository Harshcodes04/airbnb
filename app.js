require("dotenv").config();
const Port = process.env.PORT || 3000;
const DB_Util = process.env.MONGO_URI;

const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const path = require("path");
const rootDir = require("./utils/pathUtil");
const err404 = require("./controllers/404");
const { default: mongoose } = require("mongoose");

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: DB_Util,
  collection: "sessions",
});
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

app.use(express.urlencoded({ extended: true }));
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
