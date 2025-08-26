/*
  Warnings:

  - You are about to drop the column `imageId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_imageId_fkey";

-- DropIndex
DROP INDEX "public"."Category_imageId_key";

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "imageId";
