/*
  Warnings:

  - You are about to drop the column `status` on the `WishList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Properties" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "public"."PropertyService" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "public"."Reviews" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."Services" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."WishList" DROP COLUMN "status";
