import { Tree } from "@/src/types/tree";
import { db } from "./db";

export function insertTree(tree: Tree) {
  db.runSync(
    `INSERT INTO trees (name, description, latitude, longitude, image, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      tree.name,
      tree.description,
      tree.latitude,
      tree.longitude,
      tree.image ?? null,
      new Date().toISOString(),
    ],
  );
}

export function getTrees(): Tree[] {
  return db.getAllSync(`SELECT * FROM trees ORDER BY id DESC`) as Tree[];
}
