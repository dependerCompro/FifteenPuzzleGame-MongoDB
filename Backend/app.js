const express = require("express");
const bodyParser = require("body-parser");
const Statistics = require("./models/statisticsModel")

const app = express();
const fs = require("fs");
const LastState = require("./models/lastStateModel");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(bodyParser.json());

app.get("/lastState", async (req, res) => {
  const lastStateData = await LastState.find()
  res.status(200).send({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      lastStateData,
    },
  });
  res.end();
});

app.get("/statistics", async (req, res) => {
  const stats = await Statistics.find({userid: 1}).sort({timestamp: 1})
  res.status(200).send({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      stats
    },
  });
  res.end();
});

app.post("/statistics", (req, res) => {
  const Stat = req.body
  const timestamp = new Date().toJSON();
  Stat['timestamp'] = timestamp

  const newStat = Statistics.create(Stat)

  res.status(201).json({
    status: "success",
    data: {
      stats: newStat,
    },
  });
});

app.options("/", (req, res) => {
  res.status(200).send({
    status: "success",
  });
  res.end();
});

module.exports = app;
