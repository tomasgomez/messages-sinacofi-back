/*
  Warnings:

  - You are about to drop the `cuk` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_cukCode_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "LSN" DROP NOT NULL,
ALTER COLUMN "NSR" DROP NOT NULL;

-- DropTable
DROP TABLE "cuk";

-- CreateTable
CREATE TABLE "CUK" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "cukCode" TEXT,
    "description" TEXT,
    "status" TEXT,
    "creationDate" TEXT,
    "foreclosureDate" TEXT,
    "channel" TEXT,
    "clientDni" TEXT,
    "clientName" TEXT,
    "institutionDestination" TEXT,

    CONSTRAINT "CUK_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CUK_cukCode_key" ON "CUK"("cukCode");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_cukCode_fkey" FOREIGN KEY ("cukCode") REFERENCES "CUK"("cukCode") ON DELETE SET NULL ON UPDATE CASCADE;
