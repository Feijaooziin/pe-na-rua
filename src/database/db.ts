import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("trees.db");

export function initDB() {
  db.execSync(`
  CREATE TABLE IF NOT EXISTS trees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    latitude REAL,
    longitude REAL,
    image TEXT,
    created_at TEXT
  );
`);
}
