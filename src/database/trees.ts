import { CreateTreeDTO, Tree } from "@/src/types/tree";
import { db } from "./db";

export function getTrees(): Tree[] {
  const rows = db.getAllSync<any>(`SELECT * FROM trees ORDER BY id DESC`);

  return rows.map((row) => ({
    ...row,
    images: (() => {
      try {
        const parsed = row.images ? JSON.parse(row.images) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    })(),
  }));
}

export function getTreeById(id: number): Tree | null {
  const row = db.getFirstSync<any>("SELECT * FROM trees WHERE id = ?", [id]);

  if (!row) return null;

  return {
    ...row,
    images: (() => {
      try {
        const parsed = row.images ? JSON.parse(row.images) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    })(),
  };
}

export function insertTree(data: CreateTreeDTO) {
  db.runSync(
    `INSERT INTO trees ( 
      name,
      description,
      images,
      latitude,
      longitude,
      category,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.description,
      JSON.stringify(data.images ?? []),
      data.latitude ?? null,
      data.longitude ?? null,
      data.category ?? "tree",
      data.created_at,
    ],
  );
}

export function updateTree(tree: Tree) {
  db.runSync(
    `UPDATE trees 
    SET
      name = ?,
      description = ?,
      images = ?,
      latitude = ?,
      longitude = ?,
      category = ?
    WHERE id = ?`,
    [
      tree.name,
      tree.description,
      JSON.stringify(tree.images ?? []),
      tree.latitude ?? null,
      tree.longitude ?? null,
      tree.category ?? "tree",
      tree.id,
    ],
  );
}

export function deleteTree(id: number) {
  db.runSync("DELETE FROM trees WHERE id = ?", [id]);
}
