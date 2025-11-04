/*
  Warnings:

  - You are about to drop the column `checkIn` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `checkout` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `isDelete` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "checkIn",
DROP COLUMN "checkout",
DROP COLUMN "isDelete",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paymentId" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL DEFAULT 'Esewa';

-- DropTable
DROP TABLE "public"."Payment";
