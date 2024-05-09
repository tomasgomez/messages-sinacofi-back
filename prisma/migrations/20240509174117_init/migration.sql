/*
  Warnings:

  - The primary key for the `Parameters` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Parameters" DROP CONSTRAINT "Parameters_pkey",
ADD CONSTRAINT "Parameters_pkey" PRIMARY KEY ("messageId", "id");
