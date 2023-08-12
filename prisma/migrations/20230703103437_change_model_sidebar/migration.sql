/*
  Warnings:

  - Added the required column `text_btn` to the `Sidebar` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sidebar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "banner_title" TEXT NOT NULL,
    "banner_price" TEXT NOT NULL,
    "text_btn" TEXT NOT NULL,
    "top_one" TEXT,
    "top_two" TEXT,
    "top_three" TEXT,
    "bottom_one" TEXT,
    "bottom_two" TEXT,
    "bottom_three" TEXT,
    "bottom_four" TEXT,
    "bottom_five" TEXT
);
INSERT INTO "new_Sidebar" ("banner_price", "banner_title", "bottom_five", "bottom_four", "bottom_one", "bottom_three", "bottom_two", "id", "name", "top_one", "top_three", "top_two") SELECT "banner_price", "banner_title", "bottom_five", "bottom_four", "bottom_one", "bottom_three", "bottom_two", "id", "name", "top_one", "top_three", "top_two" FROM "Sidebar";
DROP TABLE "Sidebar";
ALTER TABLE "new_Sidebar" RENAME TO "Sidebar";
CREATE UNIQUE INDEX "Sidebar_name_key" ON "Sidebar"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
