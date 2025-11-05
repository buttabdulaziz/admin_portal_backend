import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ status: false, message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: false, message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(
      token,
      '23dfsg:"$^&#dfst#$%$%&J"gertwer23r4t5y67u8i9o0p-='
    );

    req.user = decoded; // ✅ Save user inside request
    next();

  } catch (err) {
    return res.status(403).json({ status: false, message: "Invalid or expired token" });
  }
};
