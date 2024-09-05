import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ error: "Access denied, no token provided" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;

  next();
};
