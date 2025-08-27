/*
  Warnings:

  - You are about to drop the column `services` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `UsersDetail` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `UsersDetail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serviceId]` on the table `Images` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Images" ADD COLUMN     "serviceId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Properties" DROP COLUMN "services";

-- AlterTable
ALTER TABLE "public"."UsersDetail" DROP COLUMN "facebook",
DROP COLUMN "instagram";

-- CreateTable
CREATE TABLE "public"."Services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PropertyService" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyService_propertyId_serviceId_key" ON "public"."PropertyService"("propertyId", "serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Images_serviceId_key" ON "public"."Images"("serviceId");

-- AddForeignKey
ALTER TABLE "public"."Images" ADD CONSTRAINT "Images_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Services" ADD CONSTRAINT "Services_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertyService" ADD CONSTRAINT "PropertyService_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertyService" ADD CONSTRAINT "PropertyService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
