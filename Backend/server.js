const mongoose = require('mongoose');
const app = require("./app");
const port = 8000;
const server = require("http").createServer(app);
const fs = require("fs");
const webSocket = require("ws");
const LastState = require("./models/lastStateModel")

const dotenv = require("dotenv")
dotenv.config({ path: './config.env' })

const wss = new webSocket.Server({ server: server });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
// console.log("Connection String: ", DB)

mongoose.set('strictQuery', false)
mongoose.connect(DB, {
  useNewUrlParser: true
}).then(con => {
  console.log('DB Connection Successful !')
});

wss.on("connection", function (ws) {
  ws.send("Welcome new client!");
  ws.on("message", function incoming(message) {
    const lastStateObj = JSON.parse(message)
    const objId = '6396d55bb135b194e14045d6'
    LastState.findByIdAndUpdate(objId, {
      minutes: lastStateObj.minutes,
      seconds: lastStateObj.seconds,
      moves: lastStateObj.moves,
      values: lastStateObj.values,
      emptyX: lastStateObj.emptyX,
      emptyY: lastStateObj.emptyY
    }, (err) => {
      if (err) {
        console.log(err);
      } else {
        ws.send("Last State Updated");
      }
    })
  });
});

server.listen(port, () => {
  console.log("app runnig on port 8000");
});
