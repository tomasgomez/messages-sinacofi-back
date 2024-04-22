/*
  Warnings:

  - The `NSE` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `OSN` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `TSN` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[TSN]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[OSN]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[NSE]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "NSE",
ADD COLUMN     "NSE" SERIAL,
DROP COLUMN "OSN",
ADD COLUMN     "OSN" SERIAL,
DROP COLUMN "TSN",
ADD COLUMN     "TSN" SERIAL;

-- CreateIndex
CREATE UNIQUE INDEX "Message_TSN_key" ON "Message"("TSN");

-- CreateIndex
CREATE UNIQUE INDEX "Message_OSN_key" ON "Message"("OSN");

-- CreateIndex
CREATE UNIQUE INDEX "Message_NSE_key" ON "Message"("NSE");
