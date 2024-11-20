import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";

interface LoginPayLoadType {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image?: string;
}

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const body: LoginPayLoadType = req.body;

      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }

      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };

      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      return res.status(200).json({
        message: "Logged in successfully",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ message: "Something went wrong try again" });
    }
  }
}

export default AuthController;
