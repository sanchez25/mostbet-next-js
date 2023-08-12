/*
  Warnings:

  - You are about to drop the column `flag` on the `Lang` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lang" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "attr" TEXT NOT NULL
);
INSERT INTO "new_Lang" ("attr", "id", "slug", "title") SELECT "attr", "id", "slug", "title" FROM "Lang";
DROP TABLE "Lang";
ALTER TABLE "new_Lang" RENAME TO "Lang";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
