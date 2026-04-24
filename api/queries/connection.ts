import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const databaseUrl = process.env.DATABASE_URL;

let dbInstance: ReturnType<typeof drizzle> | null = null;
let poolInstance: mysql.Pool | null = null;

function getPool() {
  if (!poolInstance && databaseUrl) {
    poolInstance = mysql.createPool({
      uri: databaseUrl,
      connectionLimit: 10,
    });
  }
  return poolInstance;
}

export function getDb() {
  if (!dbInstance && databaseUrl) {
    const pool = getPool();
    if (pool) {
      dbInstance = drizzle(pool, {
        schema: { ...schema, ...relations },
        mode: "planetscale",
      });
      // Ensure users table exists (for email/password auth)
      ensureUsersTable().catch(() => {});
    }
  }
  return dbInstance;
}

// Export db for backward compatibility
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    const d = getDb();
    if (!d) {
      throw new Error("Database not available. Please configure DATABASE_URL.");
    }
    return (d as any)[prop];
  },
});

async function ensureUsersTable() {
  try {
    const pool = getPool();
    if (!pool) return;
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(320) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
  } catch (e) {
    console.error("[db] Failed to create users table:", e);
  }
}
