const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = mongoose
  .connect(process.env.db)
  .then(() => {
    console.log("connected to the mongodb atlas.");
  })
  .catch((err) => {
    console.log("unable to the mongodb database.");
    console.log({ error: err });
  });

module.exports = dbConnect;
