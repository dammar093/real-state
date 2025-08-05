/*
  Warnings:

  - Added the required column `durationType` to the `Properties` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."DuratinType" AS ENUM ('NIGHT', 'DAY', 'MONTH', 'YEAR', 'LIFE_TIME');

-- AlterTable
ALTER TABLE "public"."Properties" ADD COLUMN     "durationType" "public"."DuratinType" NOT NULL;
