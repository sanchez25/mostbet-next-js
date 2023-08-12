-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "featured" TEXT,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "parent_id" INTEGER,
    CONSTRAINT "Post_id_fkey" FOREIGN KEY ("id") REFERENCES "Lang" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lang" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "attr" TEXT NOT NULL,
    "flag" TEXT NOT NULL
);
