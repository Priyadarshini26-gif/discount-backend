import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middleware/authMiddleware.js";
import isAdmin from "./middleware/roleMiddleware.js";
import discountRuleRoutes from "./routes/discountRuleRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json()); 

app.use(express.json()); // IMPORTANT
app.use("/api/auth", authRoutes);
app.use("/api/discount-rules", discountRuleRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user
  });
});

app.get("/api/admin-only",protect,isAdmin,(req,res)=>{
  res.json({message:"Welcome Admin"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
