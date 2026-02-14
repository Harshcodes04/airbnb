const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const path = require("path");
const rootDir = require("./utils/pathUtil");

app.use(express.static(path.join(rootDir, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});
const Port = 5001;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port} http://localhost:${Port}`);
});
