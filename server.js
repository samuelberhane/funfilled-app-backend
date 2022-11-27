const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 8000;
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const postsRouter = require("./routes/postsRoute");

// log request
app.use(morgan("tiny"));

// use parser
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// use router
app.use("/posts", postsRouter);

// home route
app.get("/", (req, res) => {
  res.send("<h1>Welcome To Fun-Filled API!</h1>");
});

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connect to mongodb and Server is running on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
