/*
  Warnings:

  - You are about to drop the column `parameters` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "parameters";

-- CreateTable
CREATE TABLE "Parameters" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "messageCode" TEXT,
    "label" TEXT,
    "type" TEXT,
    "placeholder" TEXT,
    "description" TEXT,
    "defaultValue" TEXT,
    "priority" INTEGER NOT NULL,
    "value" TEXT,
    "properties" JSONB NOT NULL,
    "validations" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "Parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Parameters_messageId_name_idx" ON "Parameters"("messageId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Parameters_messageId_name_key" ON "Parameters"("messageId", "name");

-- AddForeignKey
ALTER TABLE "Parameters" ADD CONSTRAINT "Parameters_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
