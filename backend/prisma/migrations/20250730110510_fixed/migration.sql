/*
  Warnings:

  - You are about to drop the column `isActive` on the `UsersDetail` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `UsersDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "public"."UsersDetail" DROP COLUMN "isActive",
DROP COLUMN "role";
