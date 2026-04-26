import { CreateTreeDTO, Tree } from "@/src/types/tree";
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

export function insertTree(data: CreateTreeDTO) {
  db.runSync(
    `INSERT INTO trees (name, description, image, latitude, longitude, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.description,
      data.image ?? null,
      data.latitude ?? null,
      data.longitude ?? null,
      data.created_at,
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
