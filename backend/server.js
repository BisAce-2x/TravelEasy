const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandler")

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/destinations", require("./routes/destinations"));
app.use("/api/partners", require("./routes/partners"));
app.use("/uploads", express.static("public"));
app.use("/api/why-choose-us", require("./routes/whyChooseUs"));



app.use(errorHandler)

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
