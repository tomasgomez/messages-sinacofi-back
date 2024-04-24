/*
  Warnings:

  - A unique constraint covering the columns `[cukCode]` on the table `CUK` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CUK" ADD COLUMN     "cukCode" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CUK_cukCode_key" ON "CUK"("cukCode");
