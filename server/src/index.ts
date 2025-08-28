import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { movieRouter } from "./routes/movies";
import { omdbRouter } from "./routes/omdbService";
import { userRouter } from "./routes/users";
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);
app.use("/api/omdb-movies", omdbRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Movies App Backend is running!");
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
