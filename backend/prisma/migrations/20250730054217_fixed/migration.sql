/*
  Warnings:

  - You are about to drop the column `pId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `pId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `pId` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `uId` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `bId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `bId` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `wId` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `pId` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `pId` on the `WishList` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userDetailId]` on the table `Images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertyId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_pId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Images" DROP CONSTRAINT "Images_pId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Images" DROP CONSTRAINT "Images_uId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_bId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Properties" DROP CONSTRAINT "Properties_bId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Properties" DROP CONSTRAINT "Properties_wId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reviews" DROP CONSTRAINT "Reviews_pId_fkey";

-- DropIndex
DROP INDEX "public"."Category_pId_key";

-- DropIndex
DROP INDEX "public"."Images_uId_key";

-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "pId",
ADD COLUMN     "propertyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "pId";

-- AlterTable
ALTER TABLE "public"."Images" DROP COLUMN "pId",
DROP COLUMN "uId",
DROP COLUMN "userId",
ADD COLUMN     "propertyId" INTEGER,
ADD COLUMN     "userDetailId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "bId",
ADD COLUMN     "bookingId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Properties" DROP COLUMN "bId",
DROP COLUMN "wId",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Reviews" DROP COLUMN "pId",
ADD COLUMN     "propertyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Users" DROP COLUMN "isActive",
DROP COLUMN "role",
ADD COLUMN     "otpExpires" TIMESTAMP(3),
ALTER COLUMN "otp" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."UsersDetail" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "public"."WishList" DROP COLUMN "pId",
ADD COLUMN     "propertyId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Images_userDetailId_key" ON "public"."Images"("userDetailId");

-- AddForeignKey
ALTER TABLE "public"."Properties" ADD CONSTRAINT "Properties_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Images" ADD CONSTRAINT "Images_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Images" ADD CONSTRAINT "Images_userDetailId_fkey" FOREIGN KEY ("userDetailId") REFERENCES "public"."UsersDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WishList" ADD CONSTRAINT "WishList_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reviews" ADD CONSTRAINT "Reviews_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
