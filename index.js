require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const mongoose = require("mongoose");

const data = require("./jsondata.json");
const Dashboard = require("./api/model/dashboardModel");
const dashboardRouter = require("./api/routes/dashboardRouter");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.resolve(path.dirname(__filename), "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(path.dirname(__filename), "build", "index.html"));
});

app.use("/api/v1/", dashboardRouter);

(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));

db.once("open", async () => {
  console.log("Connected successfully");

  if (process.argv[2] === "import") {
    await Dashboard.insertMany(data);
  }
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
