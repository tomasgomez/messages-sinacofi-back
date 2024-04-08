/*
  Warnings:

  - Added the required column `actions` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documents` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "actions" TEXT NOT NULL,
ADD COLUMN     "documents" TEXT NOT NULL;
