/*
  Warnings:

  - You are about to drop the column `statusId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_statusId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "statusId",
ADD COLUMN     "status" TEXT;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_status_fkey" FOREIGN KEY ("status") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
