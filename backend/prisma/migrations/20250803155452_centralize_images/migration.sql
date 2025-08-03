/*
  Warnings:

  - You are about to drop the column `image` on the `Services` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serviceId]` on the table `Images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceId` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Images" ADD COLUMN     "serviceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Services" DROP COLUMN "image";

-- CreateIndex
CREATE UNIQUE INDEX "Images_serviceId_key" ON "public"."Images"("serviceId");

-- AddForeignKey
ALTER TABLE "public"."Images" ADD CONSTRAINT "Images_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
