import Database from "better-sqlite3";

const db = new Database("insight.db");

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    answers TEXT NOT NULL,
    remark TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;