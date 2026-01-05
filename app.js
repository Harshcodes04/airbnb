const express = require("express");
const path = require("path");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const app = express();
const errorsController = require("./controllers/errors");
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(errorsController.notFound);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
