-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER';
