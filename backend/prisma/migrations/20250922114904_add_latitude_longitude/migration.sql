/*
  Warnings:

  - You are about to drop the column `isHotel` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `map` on the `Properties` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Properties` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Properties" DROP COLUMN "isHotel",
DROP COLUMN "map",
DROP COLUMN "type",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- DropEnum
DROP TYPE "public"."Types";
