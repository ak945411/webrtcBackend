// const host = "localhost";
const host = "0.0.0.0";
const port = "3001";
// const host = "192.168.0.105";

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const http = require("http");
const server = http.Server(app);

const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5173", "http://192.168.0.105:5173", "https:sangya.web.app"],
    methods: ["GET", "POST"],
  },
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({ origin: ["http://localhost:5173", "http://192.168.0.105:5173", "https:sangya.web.app"] })
);

app.get("/stream", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

server.listen(port, host, () => console.log("server started: " + host + ":" + port));

require("./src/Route/route")(app);
require("./src/Socket/socketEvent")(io);
require("./src/Socket/socketFunction").init(io);
