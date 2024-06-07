-- DropForeignKey
ALTER TABLE "Documents" DROP CONSTRAINT "Documents_messageId_fkey";

-- DropForeignKey
ALTER TABLE "LSN" DROP CONSTRAINT "LSN_messageId_fkey";

-- DropForeignKey
ALTER TABLE "NSE" DROP CONSTRAINT "NSE_messageId_fkey";

-- DropForeignKey
ALTER TABLE "NSQ" DROP CONSTRAINT "NSQ_messageId_fkey";

-- DropForeignKey
ALTER TABLE "NSR" DROP CONSTRAINT "NSR_messageId_fkey";

-- DropForeignKey
ALTER TABLE "OSN" DROP CONSTRAINT "OSN_messageId_fkey";

-- DropForeignKey
ALTER TABLE "TSN" DROP CONSTRAINT "TSN_messageId_fkey";

-- AddForeignKey
ALTER TABLE "TSN" ADD CONSTRAINT "TSN_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LSN" ADD CONSTRAINT "LSN_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OSN" ADD CONSTRAINT "OSN_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NSE" ADD CONSTRAINT "NSE_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NSR" ADD CONSTRAINT "NSR_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NSQ" ADD CONSTRAINT "NSQ_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
