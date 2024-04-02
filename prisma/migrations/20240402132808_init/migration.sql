/*
  Warnings:

  - You are about to drop the column `contenido` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `schemaId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `users` on the `Message` table. All the data in the column will be lost.
  - Added the required column `NSE` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OSN` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TSN` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creationDate` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creationTime` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageCode` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parameters` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receivedDate` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receivedTime` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "contenido",
DROP COLUMN "schemaId",
DROP COLUMN "users",
ADD COLUMN     "NSE" TEXT NOT NULL,
ADD COLUMN     "OSN" TEXT NOT NULL,
ADD COLUMN     "TSN" TEXT NOT NULL,
ADD COLUMN     "creationDate" TEXT NOT NULL,
ADD COLUMN     "creationTime" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "messageCode" TEXT NOT NULL,
ADD COLUMN     "parameters" JSONB NOT NULL,
ADD COLUMN     "priority" TEXT NOT NULL,
ADD COLUMN     "receivedDate" TEXT NOT NULL,
ADD COLUMN     "receivedTime" TEXT NOT NULL,
ADD COLUMN     "receiver" TEXT NOT NULL,
ADD COLUMN     "sender" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
