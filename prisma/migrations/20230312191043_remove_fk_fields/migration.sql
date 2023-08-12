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
    "parent_id" INTEGER
);
INSERT INTO "new_Post" ("content", "featured", "id", "language_id", "parent_id", "seo_description", "seo_title", "slug", "title") SELECT "content", "featured", "id", "language_id", "parent_id", "seo_description", "seo_title", "slug", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
