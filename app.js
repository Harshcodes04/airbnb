require("dotenv").config();

const express = require("express");
const app = express();
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const path = require("path");
const rootDir = require("./utils/pathUtil");
const err404 = require("./controllers/404");
const { default: mongoose } = require("mongoose");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(err404.Controller404);
const Port = process.env.PORT || 3000;
const DB_Util = process.env.MONGO_URI;
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
