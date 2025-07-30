/*
  Warnings:

  - Made the column `otp` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Users" ALTER COLUMN "otp" SET NOT NULL;
