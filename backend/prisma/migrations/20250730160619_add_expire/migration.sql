/*
  Warnings:

  - Made the column `otpExpires` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Users" ALTER COLUMN "otpExpires" SET NOT NULL,
ALTER COLUMN "otpExpires" SET DEFAULT CURRENT_TIMESTAMP;
