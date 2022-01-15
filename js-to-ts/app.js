const express = require("express");
const path = require("path");

const indexRouter = require("./routes/index");
const routeOneRouter = require("./routes/route_one");
const routeTwoRouter = require("./routes/route_two");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/one", routeOneRouter);
app.use("/two", routeTwoRouter);

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});
