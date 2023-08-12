-- CreateTable
CREATE TABLE "Sidebar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "banner_title" TEXT NOT NULL,
    "banner_price" TEXT NOT NULL,
    "text_btn" TEXT NOT NULL,
    "value_top" TEXT NOT NULL,
    "value_bottom" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Sidebar_name_key" ON "Sidebar"("name");
