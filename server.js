require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const infoRoute = require("./routes/infoRoutes");

const app = express();

const URI = process.env.MONGO_URL;
mongoose
  .connect(URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

//static assets

if (process.env.NODE_ENV === "production")
  app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, `client`, `build`, `index.html`));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use("/", infoRoute);
