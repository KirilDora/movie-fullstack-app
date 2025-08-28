import pool from "../db/db";
export const ensureUserExists = async (req, res, next) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: "Username is required." });
    }
    if (!username || typeof username !== "string") {
        return res
            .status(400)
            .json({ error: "Username is required and must be a string." });
    }
    try {
        const userResult = await pool.query("SELECT id FROM users WHERE username = $1", [username]);
        let userId;
        if (userResult.rows.length > 0) {
            userId = userResult.rows[0].id;
        }
        else {
            const newUserResult = await pool.query("INSERT INTO users (username) VALUES ($1) RETURNING id", [username]);
            userId = newUserResult.rows[0].id;
        }
        req.userId = userId;
        next();
    }
    catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Failed to process user." });
    }
};
