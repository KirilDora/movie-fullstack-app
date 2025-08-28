import PoolWrapper from "./db";
import fs from "fs";
import path from "path";

const pool = PoolWrapper;

async function runMigrations() {
  try {
    const sql = fs.readFileSync(
      path.join(__dirname, "migrations.sql"),
      "utf-8"
    );
    await pool.query(sql);
    console.log("Migrations executed successfully!");
  } catch (error) {
    console.error("Failed to run migrations", error);
  } finally {
    await pool.close();
  }
}

runMigrations();
