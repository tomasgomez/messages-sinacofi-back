/*
  Warnings:

  - The primary key for the `Family` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Family` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `MessageFamily` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `CUK` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FamilyToMessage` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `messageId` on the `MessageFamily` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `familyId` on the `MessageFamily` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_cukId_fkey";

-- DropForeignKey
ALTER TABLE "_FamilyToMessage" DROP CONSTRAINT "_FamilyToMessage_A_fkey";

-- DropForeignKey
ALTER TABLE "_FamilyToMessage" DROP CONSTRAINT "_FamilyToMessage_B_fkey";

-- DropIndex
DROP INDEX "cukId_index";

-- AlterTable
ALTER TABLE "Family" DROP CONSTRAINT "Family_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Family_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MessageFamily" DROP CONSTRAINT "MessageFamily_pkey",
DROP COLUMN "messageId",
ADD COLUMN     "messageId" INTEGER NOT NULL,
DROP COLUMN "familyId",
ADD COLUMN     "familyId" INTEGER NOT NULL,
ADD CONSTRAINT "MessageFamily_pkey" PRIMARY KEY ("messageId", "familyId");

-- DropTable
DROP TABLE "CUK";

-- DropTable
DROP TABLE "_FamilyToMessage";

-- CreateTable
CREATE TABLE "cuk" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "cukCode" TEXT,
    "description" TEXT,
    "status" TEXT,
    "createdDate" TEXT,
    "foreclosureDate" TEXT,
    "channel" TEXT,
    "clientDni" TEXT,
    "clientName" TEXT,
    "institutionDestination" TEXT,

    CONSTRAINT "cuk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cuk_cukCode_key" ON "cuk"("cukCode");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_cukId_fkey" FOREIGN KEY ("cukId") REFERENCES "cuk"("id") ON DELETE SET NULL ON UPDATE CASCADE;
