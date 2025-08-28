import { Pool } from "pg";
import "dotenv/config";
const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;
if (!DB_USER || !DB_HOST || !DB_NAME || !DB_PASSWORD || !DB_PORT) {
    throw new Error("Missing one or more required environment variables for the database connection.");
}
class PoolWrapper {
    pool;
    constructor() {
        this.pool = new Pool({
            user: `${DB_USER}`,
            host: `${DB_HOST}`,
            database: `${DB_NAME}`,
            password: `${DB_PASSWORD}`,
            port: parseInt(`${DB_PORT}`, 10),
        });
    }
    async query(text, params = []) {
        return this.pool.query(text, params);
    }
    async close() {
        await this.pool.end();
    }
}
const poolInstance = new PoolWrapper();
export default poolInstance;
