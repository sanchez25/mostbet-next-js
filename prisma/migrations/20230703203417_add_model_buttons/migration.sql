-- CreateTable
CREATE TABLE "Buttons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "btn_log" TEXT NOT NULL,
    "btn_reg" TEXT NOT NULL,
    "btn_download" TEXT,
    "btn_promo" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Buttons_name_key" ON "Buttons"("name");
