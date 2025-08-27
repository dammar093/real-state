/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the `PropertyService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Images" DROP CONSTRAINT "Images_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PropertyService" DROP CONSTRAINT "PropertyService_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PropertyService" DROP CONSTRAINT "PropertyService_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Services" DROP CONSTRAINT "Services_userId_fkey";

-- DropIndex
DROP INDEX "public"."Images_serviceId_key";

-- AlterTable
ALTER TABLE "public"."Images" DROP COLUMN "serviceId";

-- AlterTable
ALTER TABLE "public"."Properties" ADD COLUMN     "services" TEXT[];

-- DropTable
DROP TABLE "public"."PropertyService";

-- DropTable
DROP TABLE "public"."Services";
