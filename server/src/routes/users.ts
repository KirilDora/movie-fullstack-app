import { Router } from "express";
import { ensureUserExists } from "../middleware/user";
import { UserRequest } from "../types/express";

const userRouter = Router();

userRouter.post("/", ensureUserExists, (req: UserRequest, res) => {
  res.status(200).json({ userId: req.userId });
});

export { userRouter };
