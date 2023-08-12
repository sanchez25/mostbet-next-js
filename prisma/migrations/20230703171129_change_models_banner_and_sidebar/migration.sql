-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Banner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "text_btn" TEXT
);
INSERT INTO "new_Banner" ("description", "id", "name", "text_btn", "title") SELECT "description", "id", "name", "text_btn", "title" FROM "Banner";
DROP TABLE "Banner";
ALTER TABLE "new_Banner" RENAME TO "Banner";
CREATE UNIQUE INDEX "Banner_name_key" ON "Banner"("name");
CREATE TABLE "new_Sidebar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "banner_title" TEXT,
    "banner_price" TEXT,
    "text_btn" TEXT,
    "top_one" TEXT,
    "top_two" TEXT,
    "top_three" TEXT,
    "bottom_one" TEXT,
    "bottom_two" TEXT,
    "bottom_three" TEXT,
    "bottom_four" TEXT,
    "bottom_five" TEXT
);
INSERT INTO "new_Sidebar" ("banner_price", "banner_title", "bottom_five", "bottom_four", "bottom_one", "bottom_three", "bottom_two", "id", "name", "text_btn", "top_one", "top_three", "top_two") SELECT "banner_price", "banner_title", "bottom_five", "bottom_four", "bottom_one", "bottom_three", "bottom_two", "id", "name", "text_btn", "top_one", "top_three", "top_two" FROM "Sidebar";
DROP TABLE "Sidebar";
ALTER TABLE "new_Sidebar" RENAME TO "Sidebar";
CREATE UNIQUE INDEX "Sidebar_name_key" ON "Sidebar"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
