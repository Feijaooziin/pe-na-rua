import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("trees.db");

export function initDB() {
  db.execSync(`
  CREATE TABLE IF NOT EXISTS trees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    images TEXT,
    latitude REAL,
    longitude REAL,
    category TEXT,
    created_at TEXT
  );
`);
}
