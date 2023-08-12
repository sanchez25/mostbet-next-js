-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "shortTitle" TEXT,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "featured" TEXT,
    "seo_title" TEXT,
    "page_key" TEXT,
    "seo_description" TEXT,
    "language_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Post" ("content", "created_at", "featured", "id", "language_id", "parent_id", "seo_description", "seo_title", "shortTitle", "slug", "title", "updated_at") SELECT "content", "created_at", "featured", "id", "language_id", "parent_id", "seo_description", "seo_title", "shortTitle", "slug", "title", "updated_at" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
