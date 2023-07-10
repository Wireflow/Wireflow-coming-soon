const mongoose = require("mongoose");
const express = require("express");
const Subscriber = require("./models/Subscriber");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const url =
  "mongodb+srv://nabdulrub16:30QmOcbeFdd3hOnF@cluster0.nmm4knq.mongodb.net/?retryWrites=true&w=majority&ssl=true";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to DB"))
  .catch((err) => console.error("Error connecting to DB", err));

app.use(express.json());

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

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
