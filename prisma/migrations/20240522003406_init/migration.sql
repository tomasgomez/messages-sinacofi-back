/*
  Warnings:

  - You are about to drop the column `status` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `propertiesId` on the `Parameters` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Status` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Parameters` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[messageId,paramName,priority]` on the table `Properties` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `messageId` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paramName` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageId` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_status_fkey";

-- DropForeignKey
ALTER TABLE "Parameters" DROP CONSTRAINT "Parameters_propertiesId_fkey";

-- DropIndex
DROP INDEX "Status_name_key";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Parameters" DROP COLUMN "propertiesId";

-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "messageId" TEXT NOT NULL,
ADD COLUMN     "paramName" TEXT NOT NULL,
ADD COLUMN     "priority" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Status" DROP COLUMN "name",
ADD COLUMN     "messageId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Parameters_id_key" ON "Parameters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Properties_messageId_paramName_priority_key" ON "Properties"("messageId", "paramName", "priority");

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_messageId_paramName_priority_fkey" FOREIGN KEY ("messageId", "paramName", "priority") REFERENCES "Parameters"("messageId", "name", "priority") ON DELETE RESTRICT ON UPDATE CASCADE;
