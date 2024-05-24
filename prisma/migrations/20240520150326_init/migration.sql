/*
  Warnings:

  - A unique constraint covering the columns `[messageId]` on the table `LSN` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[messageId]` on the table `NSE` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[messageId]` on the table `NSQ` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[messageId]` on the table `NSR` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[messageId]` on the table `OSN` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[messageId]` on the table `TSN` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LSN_messageId_key" ON "LSN"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "NSE_messageId_key" ON "NSE"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "NSQ_messageId_key" ON "NSQ"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "NSR_messageId_key" ON "NSR"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "OSN_messageId_key" ON "OSN"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "TSN_messageId_key" ON "TSN"("messageId");
