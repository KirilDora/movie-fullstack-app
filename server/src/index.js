import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { movieRouter } from "./routes/movies";
import { omdbRouter } from "./routes/omdbService";
import { userRouter } from "./routes/users";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);
app.use("/api/omdb-movies", omdbRouter);
app.get("/", (req, res) => {
    res.send("Movies App Backend is running!");
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, _next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
