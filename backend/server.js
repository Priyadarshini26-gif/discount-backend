const express = require("express");
require("dotenv").config();
const router = require("./routes/authRoutes.js")

const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use("/api/auth", router);

connectDB()

app.get("/", (req, res) => {
  res.send("Backend is running with nodemon");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});