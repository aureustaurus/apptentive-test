// TODO: add request handlers for all questions;
const express = require("express");
const csv = require("fast-csv");
const _ = require("lodash");
const timeout = require("connect-timeout");
const config = require("./config.js");
const http = require("http");
const cors = require("cors");
const {
  getUniqParam,
  clearEmptyParams,
  getTopBy,
  getNearestLocations,
  getTargets
} = require("./helpers");

const app = express();
const server = http.createServer(app);
// set timeout for requests
app.use(timeout("200ms"));

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const allData = [];

csv
  .fromPath(config.source)
  .on("data", data => {
    const ship = {
      id: data[0],
      occurred_at: data[1],
      city: data[2],
      state: data[3],
      country: data[4],
      shape: data[5],
      duration_seconds: data[6],
      duration_text: data[7],
      description: data[8],
      reported_on: data[9],
      latitude: data[10],
      longitude: data[11]
    };
    allData.push(ship);
  })
  .on("end", () => {
    allData.shift();
    server.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}...`);
    });
  });

// get uniq values of ufo parameter,
// by default empty rezult will be cut
app.get("/api/v1/ufo/count", (req, res) => {
  const { query } = req;
  const { by: param = "shape", empty } = query;

  let result = getUniqParam(allData, param);

  if (empty !== "true") {
    result = clearEmptyParams(result);
  }

  if (!res.headersSent) res.json({ count: result.length });
  return;
});

// get top records by parameter in ufo DB by country,
// by default for all countries with 'desc' ordering (biggest value)
app.get("/api/v1/ufo/top/:country?", (req, res) => {
  const { query, params } = req;
  const { country } = params;
  const { by: property, amount, ordering } = query;

  let result = getTopBy({ allData, country, property, amount, ordering });

  if (!res.headersSent) res.json({ sightings: result });
  return;
});

// ?lat=46.5476&lon=-87.3956&amount=3
app.get("/api/v1/ufo/nearest", (req, res) => {
  const { query } = req;
  const { lat, lon, amount, unit } = query;

  let result = getNearestLocations({ allData, lat, lon, amount, unit });

  if (!result) throw new Error("wrong location coordinates");
  if (!res.headersSent) res.json({ sightings: result });
  return;
});

// ?lat=46.5476&lon=-87.3956&duration=60
app.get("/api/v1/ufo/targets", (req, res) => {
  const { query } = req;
  const { lat, lon, amount, unit, distance } = query;

  let result = getTargets({ allData, lat, lon, amount, unit, distance });

  if (!result) throw new Error("wrong location coordinates");
  if (!res.headersSent) res.json({ targets: result });
  return;
});

// get amount records in ufo DB
app.get("/api/v1/ufo", (req, res, next) => {
  if (!res.headersSent) res.json({ count: allData.length });
  return;
});

// route for all empty pages
app.get("*", (req, res) => {
  res.status(404);
  res.send(`Can\'t find page with url: ${req.path}, try another page please`);
});

const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};
app.use(logErrors);

// errorHadler - includes timeout error
const errorHandler = (err, req, res, next) => {
  if (err) {
    if (!res.statusCode || res.statusCode === 200) {
      const statusCode = req.timedout ? 504 : 500;
      res.status(statusCode);
    }
    res.json({ error: err.message });
  } else {
    next();
  }
};
app.use(errorHandler);
