/*
  Warnings:

  - You are about to drop the column `services` on the `Properties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Properties" DROP COLUMN "services";

-- CreateTable
CREATE TABLE "public"."Services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PropertyService" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "PropertyService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyService_propertyId_serviceId_key" ON "public"."PropertyService"("propertyId", "serviceId");

-- AddForeignKey
ALTER TABLE "public"."Services" ADD CONSTRAINT "Services_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertyService" ADD CONSTRAINT "PropertyService_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertyService" ADD CONSTRAINT "PropertyService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
