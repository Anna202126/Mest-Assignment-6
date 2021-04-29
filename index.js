const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const dbConnect = require("./dbConfig/dbConnect");

dbConnect();

app.use(express.json());

app.use("/user", userRouter);

app.listen(4000, () => {
  console.log("App running on port 4000");
});
