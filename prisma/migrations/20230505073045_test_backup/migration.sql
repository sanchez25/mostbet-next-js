/*
  Warnings:

  - You are about to drop the column `lala` on the `Menu` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL
);
INSERT INTO "new_Menu" ("id", "name", "value") SELECT "id", "name", "value" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
CREATE UNIQUE INDEX "Menu_name_key" ON "Menu"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
