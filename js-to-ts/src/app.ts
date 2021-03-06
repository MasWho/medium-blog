/** JS code */
// const express = require("express");
// const indexRouter = require("./routes/index");
// const routeOneRouter = require("./routes/route_one");
// const routeTwoRouter = require("./routes/route_two");

/** TS changes */
import express from 'express';
import indexRouter from './routes/index';
import routeOneRouter from './routes/route_one';
import routeTwoRouter from './routes/route_two';

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
