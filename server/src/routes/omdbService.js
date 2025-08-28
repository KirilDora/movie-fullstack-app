import { Router } from "express";
import axios from "axios";
const OMDB_API_KEY = process.env.OMDB_API_KEY;
const omdbRouter = Router();
omdbRouter.get("/search", async (req, res) => {
    const { t } = req.query;
    if (!t) {
        return res.status(400).send("Search query is required.");
    }
    if (!OMDB_API_KEY) {
        return res
            .status(500)
            .json({ error: "OMDB_API_KEY не установлен на сервере." });
    }
    try {
        const response = await axios.get(`http://www.omdbapi.com/?t=${t}&apikey=${OMDB_API_KEY}`);
        res.json(response.data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error fetching movies from OMDB API.");
    }
});
export { omdbRouter };
