import { Tree } from "@/src/types/tree";
import { db } from "./db";

export function getTrees(): Tree[] {
  return db.getAllSync(`SELECT * FROM trees ORDER BY id DESC`) as Tree[];
}

export function getTreeById(id: number): Tree | null {
  const result = db.getFirstSync<Tree>("SELECT * FROM trees WHERE id = ?", [
    id,
  ]);

  return result ?? null;
}

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

export function updateTree(tree: Tree) {
  db.runSync(
    `UPDATE trees
     SET name = ?, description = ?, image = ?
     WHERE id = ?`,
    [tree.name, tree.description, tree.image ?? null, tree.id],
  );
}

export function deleteTree(id: number) {
  db.runSync("DELETE FROM trees WHERE id = ?", [id]);
}
