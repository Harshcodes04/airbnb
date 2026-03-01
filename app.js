const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const path = require("path");
const rootDir = require("./utils/pathUtil");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});
const Port = 5001;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port} http://localhost:${Port}`);
});
