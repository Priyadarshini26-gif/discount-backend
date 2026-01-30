const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));

connectDB()

app.get("/", (req, res) => {
  res.send("Backend is running with nodemon");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});