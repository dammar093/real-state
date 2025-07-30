/*
  Warnings:

  - You are about to drop the column `isActive` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Users" DROP COLUMN "isActive",
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
