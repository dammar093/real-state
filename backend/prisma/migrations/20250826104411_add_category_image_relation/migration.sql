/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "imageId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Category_imageId_key" ON "public"."Category"("imageId");

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
