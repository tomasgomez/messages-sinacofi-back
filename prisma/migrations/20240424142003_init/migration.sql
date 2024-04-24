/*
  Warnings:

  - You are about to drop the column `cukId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `cuk` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[LSN]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[NSR]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_cukId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "cukId",
ADD COLUMN     "LSN" SERIAL,
ADD COLUMN     "NSR" SERIAL,
ADD COLUMN     "cukCode" TEXT;

-- AlterTable
ALTER TABLE "cuk" DROP COLUMN "createdDate",
ADD COLUMN     "creationDate" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Message_LSN_key" ON "Message"("LSN");

-- CreateIndex
CREATE UNIQUE INDEX "Message_NSR_key" ON "Message"("NSR");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_cukCode_fkey" FOREIGN KEY ("cukCode") REFERENCES "cuk"("cukCode") ON DELETE SET NULL ON UPDATE CASCADE;
