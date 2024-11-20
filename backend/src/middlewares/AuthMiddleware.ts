import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authheader = req.headers.authorization;

  if (authheader === null || authheader === undefined) {
    return res.status(401).json({ status: 401, message: "Unauthorized user" });
  }

  const token = authheader.split(" ")[1];

  console.log("token = ", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.error(err);

    if (err) {
      return res
        .status(401)
        .json({ status: 401, message: "Unauthorized user" });
    }

    req.user = user as AuthUser;
    next();
  });
};

export default authMiddleware;
