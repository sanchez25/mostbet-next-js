/*
  Warnings:

  - Added the required column `language_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "featured" TEXT,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "language_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    CONSTRAINT "Post_id_fkey" FOREIGN KEY ("id") REFERENCES "Lang" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("content", "featured", "id", "parent_id", "seo_description", "seo_title", "slug", "title") SELECT "content", "featured", "id", "parent_id", "seo_description", "seo_title", "slug", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
