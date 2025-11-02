import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { getUsersService } from "../services/user.service";
import { HTTPSTATUS } from "../config/http.config";

export const getUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const users = await getUsersService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "User retrieved successfully",
      users,
    });
  }
);
