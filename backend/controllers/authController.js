import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
  try {
    // 1️⃣ Get data from request body
    const { name, email, password, role } = req.body;

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // 3️⃣ Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Save user in database
    await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // 5️⃣ Send success response
    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    // 1️⃣ Get email & password
    const { email, password } = req.body;

    // 2️⃣ Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // 3️⃣ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // 4️⃣ Login success
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );
    res.status(200).json({
        message: "Login successful",
        token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};