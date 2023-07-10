const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Subscriber = require("./models/Subscriber");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Error connecting to DB", err));

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.post("/", (req, res) => {
  const { email } = req.body;
  const subscriber = new Subscriber({ email });

  subscriber
    .save()
    .then(() => {
      res.send("Subscribed Successfully");
    })
    .catch((err) => {
      res.status(500).send("Error Subscribing");
    });
});

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
