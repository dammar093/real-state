-- DropForeignKey
ALTER TABLE "public"."Images" DROP CONSTRAINT "Images_serviceId_fkey";

-- AlterTable
ALTER TABLE "public"."Images" ALTER COLUMN "serviceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Images" ADD CONSTRAINT "Images_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
