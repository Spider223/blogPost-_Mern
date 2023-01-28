const express = require("express");
const cors = require("cors");
require("dotenv").config();
const user = require("./route/user");
const dbConnect = require("./dbConnect.js/dbConnect");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(user);
app.use("/uploads", express.static(__dirname + "/uploads"));

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`listening on port: ${PORT}`);
    });
    await dbConnect;
  } catch (error) {
    console.log(error);
  }
};

start();
