import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (!authHeader) {
      return res.status(401).json({ status: false, message: "Authorization header missing. Please log in to access" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: false, message: "Token format invalid. Expected 'Bearer <token>'" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: false, message: "Token missing. Please log in to access" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN); 
    console.log('Decoded JWT payload:', decoded);
  
    console.log('token is =--------->', token);
    req.user = decoded.userId;
    console.log("User is authenticated:", req.user);

    next();
    
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ status: false, message: "Invalid token. Please log in again" });
  }
};

export default isAuthenticated;
