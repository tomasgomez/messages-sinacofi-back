/*
  Warnings:

  - The primary key for the `Status` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Status_id_key";

-- AlterTable
ALTER TABLE "Status" DROP CONSTRAINT "Status_pkey",
ADD CONSTRAINT "Status_pkey" PRIMARY KEY ("messageId", "id");
