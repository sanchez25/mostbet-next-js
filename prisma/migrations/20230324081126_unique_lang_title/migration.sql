/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Lang` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Lang_title_key" ON "Lang"("title");
