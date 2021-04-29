const mongoose = require("mongoose");

async function dbConnect() {
  try {
    mongoose.connect("mongodb://localhost:27017/myapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database Successfully");
  } catch (err) {
    console.log(err);
  }
}

module.exports = dbConnect;
