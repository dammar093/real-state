/*
  Warnings:

  - The values [SELL] on the enum `Types` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Types_new" AS ENUM ('SALE', 'RENT');
ALTER TABLE "public"."Properties" ALTER COLUMN "type" TYPE "public"."Types_new" USING ("type"::text::"public"."Types_new");
ALTER TYPE "public"."Types" RENAME TO "Types_old";
ALTER TYPE "public"."Types_new" RENAME TO "Types";
DROP TYPE "public"."Types_old";
COMMIT;
