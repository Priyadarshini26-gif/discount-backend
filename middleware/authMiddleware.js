import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  // Token should be in header: Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.cookies.token;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; // store user info in request
      next(); // allow request
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }
};

export default protect;
