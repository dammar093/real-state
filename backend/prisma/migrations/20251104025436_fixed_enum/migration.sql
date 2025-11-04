/*
  Warnings:

  - The values [NIGHT,YEAR,LIFE_TIME] on the enum `DuratinType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."DuratinType_new" AS ENUM ('DAY', 'MONTH');
ALTER TABLE "public"."Properties" ALTER COLUMN "durationType" TYPE "public"."DuratinType_new" USING ("durationType"::text::"public"."DuratinType_new");
ALTER TYPE "public"."DuratinType" RENAME TO "DuratinType_old";
ALTER TYPE "public"."DuratinType_new" RENAME TO "DuratinType";
DROP TYPE "public"."DuratinType_old";
COMMIT;
