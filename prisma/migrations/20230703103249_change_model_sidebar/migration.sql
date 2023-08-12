/*
  Warnings:

  - You are about to drop the column `text_btn` on the `Sidebar` table. All the data in the column will be lost.
  - You are about to drop the column `value_bottom` on the `Sidebar` table. All the data in the column will be lost.
  - You are about to drop the column `value_top` on the `Sidebar` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sidebar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "banner_title" TEXT NOT NULL,
    "banner_price" TEXT NOT NULL,
    "top_one" TEXT,
    "top_two" TEXT,
    "top_three" TEXT,
    "bottom_one" TEXT,
    "bottom_two" TEXT,
    "bottom_three" TEXT,
    "bottom_four" TEXT,
    "bottom_five" TEXT
);
INSERT INTO "new_Sidebar" ("banner_price", "banner_title", "id", "name") SELECT "banner_price", "banner_title", "id", "name" FROM "Sidebar";
DROP TABLE "Sidebar";
ALTER TABLE "new_Sidebar" RENAME TO "Sidebar";
CREATE UNIQUE INDEX "Sidebar_name_key" ON "Sidebar"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
