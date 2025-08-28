import { Router } from "express";
import { ensureUserExists } from "../middleware/user";
const userRouter = Router();
userRouter.post("/", ensureUserExists, (req, res) => {
    res.status(200).json({ userId: req.userId });
});
export { userRouter };
