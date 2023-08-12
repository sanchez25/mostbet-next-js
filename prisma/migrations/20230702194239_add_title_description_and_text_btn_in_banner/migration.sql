/*
  Warnings:

  - You are about to drop the column `value` on the `Banner` table. All the data in the column will be lost.
  - Added the required column `text_btn` to the `Banner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Banner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "text_btn" TEXT NOT NULL
);
INSERT INTO "new_Banner" ("id", "name") SELECT "id", "name" FROM "Banner";
DROP TABLE "Banner";
ALTER TABLE "new_Banner" RENAME TO "Banner";
CREATE UNIQUE INDEX "Banner_name_key" ON "Banner"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
