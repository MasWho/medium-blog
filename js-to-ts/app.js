const express = require("express");
const path = require("path");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});
