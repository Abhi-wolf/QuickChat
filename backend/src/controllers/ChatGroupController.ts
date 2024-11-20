import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupController {
  static async index(req: Request, res: Response) {
    try {
      const user = req.user;

      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return res.status(200).json({
        status: 200,
        message: "Chat Groups fetched successfully",
        data: groups,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const group = await prisma.chatGroup.findUnique({
        where: {
          id: id,
        },
      });

      return res.status(200).json({
        status: 200,
        message: "Chat Group fetched successfully",
        data: group,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = req.user;

      await prisma.chatGroup.create({
        data: {
          title: body.title,
          passcode: body.passcode,
          user_id: user.id,
        },
      });

      return res
        .status(200)
        .json({ status: 200, message: "Chat Group created successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;

      await prisma.chatGroup.update({
        data: {
          title: body.title,
          passcode: body.passcode,
        },

        where: {
          id: id,
        },
      });

      return res
        .status(200)
        .json({ status: 200, message: "Chat Group updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const group = await prisma.chatGroup.delete({
        where: {
          id: id,
        },
      });

      return res.status(200).json({
        status: 200,
        message: "Chat Group deleted successfully",
        data: group,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}

export default ChatGroupController;
